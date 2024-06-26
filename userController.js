const bcrypt = require('bcrypt');
const {nanoid} = require('nanoid');

const SessionModel = require('../models/sessionModel');
const UserModel = require('../models/userModel');

exports.getIndex = (req,res)=>{
    console.log(req.session);
    res.render('index');
};

exports.createUser = (req,res)=>{
const {name,age,phoneNumber,DOB,password}=req.body;
if(!name||!age||!phoneNumber||!DOB || !password){
    res.render('index ' ,{err: 'please fill the form properly'});
    return;
}

    
bcrypt.hash(password,12,(err,hash)=>{
    const user = new UserModel({
        name,
        age:parseInt(age),
        phoneNumber,
        DOB:new Date(DOB),
        password:hash
    })
    user.save();
});

req.session.userID = nanoid();
req.session.name=name;
req.session.save();
console.log(req.session);
    res.render('index');
};

exports.getProfile=(req, res) => {
    console.log(req.session);
    res.render('profile', {name: req.session.name});
};

exports.checkUser =  async(req, res) => {
    let user = await UserModel.getUserByName(req.body.name);

    if (!user) {
        res.render('profile', {err: 'User not found'});
        return;
    }

    console.log('before');
    let passwordsMatch = bcrypt.compareSync(req.body.password, user.password);
    console.log('before');

    if (passwordsMatch) {
        res.render('profile', {user});
    } else {
        res.render('profile', {err: 'Incorrect password'});
    }
};

exports.checkUserSession = async(req,res,next)=>{  let sessions = await SessionModel.find({});

let sessionFound = false;

for (let session of sessions) {
    session = session.toObject();
    console.log(JSON.parse(session.session));
    //check if userID of session in DB matches req.session.userID
    if (JSON.parse(session.session).userID == req.session.userID) {
       next();
       return;
    } 
}
     res.redirect('/');
     
}
exports.protectedRoute= (req, res) => {
  

    
        res.render('protected');
  
};