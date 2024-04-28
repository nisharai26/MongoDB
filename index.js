const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const express = require('express');
const {nanoid} = require('nanoid');

const userRouter = require('./routes/userRouter');


 mongoose.connect('mongodb+srv://nisha:passwordabc123@cluster0.kstue.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const app = express();
app.use(express.static(path.join(__dirname ,'public')));
app.engine('hbs',hbs({
    extname:'hbs'
}));
app.set('view engine', 'hbs');

app.use(session({
    store:MongoStore.create({mongoUrl: 'mongodb+srv://nisha:passwordabc123@cluster0.kstue.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'}),
secret:'keyboardcat',
resave:false,
saveUninitialized:false,
cookie:{
    secure:false,
    maxAge:1000*60*60*2,
    sameSite:true
}
}));



app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// app.get('/',(req,res)=>{
//     console.log(req.session);
//     res.render('index');
// });
// app.post('/',(req,res)=>{
// const {name,age,phoneNumber,DOB,password}=req.body;
// if(!name||!age||!phoneNumber||!DOB || !password){
//     res.render('index ' ,{err: 'please fill the form properly'});
//     return;
// }
// const hash = bcrypt.hash(password,12);
//     console.log(hash);

//     const user = new UserModel({
//         name,
//         age: parseInt(age),
//         phoneNumber,
//         DOB: new Date(DOB),
//         password: hash
//     });

//     user.save();
    
// bcrypt.hash(password,12,(err,hash)=>{
//     const user = new UserModel({
//         name,
//         age:parseInt(age),
//         phoneNumber,
//         DOB:new Date(DOB),
//         password:hash
//     })
//     user.save();
// });

// req.session.userID = nanoid();
// req.session.name=name;
// req.session.save();
// console.log(req.session);
//     res.render('index');
// });

// app.get('/profile',(req,res)=>{
//     console.log(req.session);
//     res.render('profile');
// });
// app.post('/profile',async(req,res)=>{
//     let user = await UserModel.getUserByName(req.body.name);
//     if(!user){
//         res.render('profile',{err:'User not found'})
//         return;
//     }
//     let passwordMatch = bcrypt.compareSync(req.body.password,user.password);
//     if(passwordMatch){
//          res.render('profile',{user})
//     } else {
//         res.render('profile',{err:'Incorrect Password'});
//     }
// // res.render('profile');
// });
// app.get('/protected-route', async(req,res)=>{
//     let sessions = await SessionModel.find({});
//     let sessionFound = false;
//     for(let session of sessions){
//         session = session.toObject();
//         console.log(JSON.parse(session.session));
//     if(JSON.parse(session.session).userID == req.session.userID)
//     {
//  sessionFound = true;
//  break;

//     }
// }
// if(sessionFound){
//     res.render('protected');

// } else {
//     res.redirect('/');
// }

// })
app.use('/',userRouter);
app.listen(3000,()=>{
    console.log("http://localhost:3000");
});


// const user = new UserModel({
//     name: 'Nimmi',
//     age: 45,
//     phoneNumber: '11111111111',
//     DOB: new Date('January 17, 1995')
// });

// user.save();

/*
  clusters
    - databases
      - tables / models -> schemas
       - documents
*/

// const getUserByName =  async(name)=>{
//     let users = await UserModel.find({name})
// if(users.length>0){
//     console.log("user Exist")
// } 
// else {
//     console.log("USER NOT EXIST");
// }

// }


// getUserByName('Nisha');
/*
create routes
create models
add logic to the routes & test each one
create pages w/ forms
*/
