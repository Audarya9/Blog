const express = require('express');
const articleRoute = require('./routes/article');

const app = express();

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
    res.render('index',{article : article});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log('server running'));