const express=require('express');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);

const app=express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);


app.use(bodyParser.json());
app.use(cookieParser());

const { User } = require('./models/user'); 
const { AD } = require('./models/ad');
const { auth} = require('./middleware/auth');
const { COMMENT } = require('./models/comments');

const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`SERVER RUNNNING`)
})
//get 
//auth
app.get('/api/auth',auth,(req,res)=>{
    res.json({
        isAuth:true,
        id:req.user._id,
        email:req.user.email,
        name:req.user.name,
        lastname:req.user.lastname
        
    })
});

//get announce by Id

app.get('/api/getAd',(req,res)=>{
    let id = req.query.id;

    AD.findById(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    })
})
//get annonce randomly
app.get('/api/ads',(req,res)=>{
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;
    AD.find().skip(skip).sort({_id:order}).limit(limit).exec((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc.sort(() => Math.random() - 0.5));
    })
})
// get ads by categorie
app.get('/api/AD-category',(req,res)=>{
    let category=(req.query.category);
    AD.find({category:category}).exec((err,docs)=>{
        if(err) return res.status(400).send(err);
        res.send(docs)
    })
})
//get ads by email
app.get('/api/AD-Email',(req,res)=>{
    let email=(req.query.email);
    AD.find({email:email}).exec((err,docs)=>{
        if(err) return res.status(400).send(err);
        res.send(docs)
    })
})
// get a user adds
app.get('/api/user_ads',(req,res)=>{
    let email=(req.query.email);
    AD.find({email:email}).exec((err,docs)=>{
        if(err) return res.status(400).send(err);
        res.send(docs)
    })
})
//post an ad
app.post('/api/ad',(req,res)=>{
    const ad = new AD(req.body) 
    ad.save((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post:true,
            adId: doc._id
        })
    })
})

//delete an ad
app.delete('/api/delete_ADS',(req,res)=>{
    let id = req.query.id;

    AD.findByIdAndRemove(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json(true)
    })
})
//update an ad
app.post('/api/ads_update',(req,res)=>{
    AD.findByIdAndUpdate(req.body._id,req.body,{new:true},(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            success:true,
            doc
        })
    })
})
//User request
//register
app.post('/api/register',(req,res)=>{
    const user = new User(req.body);

    user.save((err,doc)=>{
        if(err) return res.json(err);
        res.status(200).json({
            success:true,
            user:doc
        })
    })
})
//login
app.post('/api/login', (req, res) => {
    User.findOne({ 'email': req.body.email }, (err, user) => {
        if (!user) return res.json({ isAuth: false, message: 'Auth failed, email not found' })
        
        
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({
                isAuth: false,
                message: 'Wrong password'
            
            });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie('auth', user.token).json({
                    isAuth: true,
                    id: user._id,
                    email: user.email
                })
            })
        })
    })
})
//get user by id
app.get('/api/getUser',(req,res)=>{
    let id = req.query.id;

    User.findById(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    })
})

//get user by email
app.get('/api/User-Email',(req,res)=>{
    let email=(req.query.email);
    User.find({email:email}).exec((err,docs)=>{
        if(err) return res.status(400).send(err);
        res.send(docs)
    })
})
//logout
app.get('/api/logout', auth, (req, res) => {
    req.user.deleteToken(req.token, (err, user) => {
        if (err) return res.status(400).send(err);
        res.sendStatus(200)
    })
})

/////comments
//post
app.post('/api/AddComment',(req,res)=>{
    const comment = new COMMENT(req.body) 
    comment.save((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            success:true,
            comment: doc
        })
    })
})
//get by AdId

app.get('/api/AdComment',(req,res)=>{
    let adId=(req.query.adId);
    COMMENT.find({adId:adId}).exec((err,docs)=>{
        if(err) return res.status(400).send(err);
        res.send(docs)
    })
})

app.get('/api/users',(req,res)=>{
    User.find({},(err,users)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(users)
    })
})

app.post('/api/user_update',(req,res)=>{
    User.findByIdAndUpdate(req.body._id,req.body,{new:true},(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            success:true,
            doc
        })
    })
})