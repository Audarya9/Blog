const express = require('express');
const mongoose = require('mongoose');
const articleRoute = require('./routes/article');

const app = express();

mongoose.connect('mongodb://localhost/blog',{ useNewUrlParser: true , useUnifiedTopology: true });

app.set('view engine','ejs');

app.use('/articles',articleRoute);

const article = [{
    title : 'test title',
    date : new Date(),
    description : 'test description'
},{
    title : 'test title 2',
    date : new Date(),
    description : 'test description'
}];

app.get('/',(req,res)=>{
    res.render('articles/index',{article : article});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log('server running'));