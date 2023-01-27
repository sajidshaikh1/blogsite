const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./modles/blog');

const app = express();
mongoose.set('strictQuery',true);
const dbURL = "database url";
mongoose.connect(dbURL).then((result)=>{app.listen(3000);}).catch((err)=>{console.log(err)});

app.use(express.urlencoded({extended : true}));
app.set('view engine', 'ejs');
// get request
app.get('/',(req,res)=>{
    Blog.find().sort({createdAt : -1})
    .then((result)=>{res.render('index',{title: 'Home', blogs : result});})
    .catch(err => console.log(err));
});
app.get('/about',(req,res)=>{
    res.render('about',{title: 'About'});
});
app.get('/create/blog',(req,res)=>{
    res.render('create',{title: 'Create Blog'});
});
app.get('/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then(result => res.render('details',{blog : result, title : 'full blog'})).catch(err => console.log(err));
})

//post req
app.post('/',(req,res)=>{
    const blog = new Blog(req.body);
    blog.save().then(result => res.redirect('/')).catch(err => console.log(err)); 
});
app.use((req,res)=>{
    res.status(404).render('404',{title : '404 Page not found'});
});
