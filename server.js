const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRoute = require('./routes/article');

const app = express();

mongoose.connect('mongodb://localhost/blog',{ useNewUrlParser: true , useUnifiedTopology: true });

app.set('view engine','ejs');

app.use(express.urlencoded({ extended: false}));




app.get('/', async (req,res)=>{

    const article = await Article.find();
    res.render('articles/index',{article : article});
});

app.use('/articles',articleRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log('server running'));