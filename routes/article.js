const router = require('express').Router();
const Article = require('./../models/article');



router.get('/new',(req,res)=>{
    res.render('articles/new',{article : new Article()});
});

router.get('/:id', async(req,res)=>{
    const article = await Article.findById(req.params.id);
    console.log(article);
    if (article == null) {
        res.redirect('/');        
    } else {
        res.render('articles/show',{article:article});
    }
    // if (article == null) res.redirect('/')
    // res.render('articles/show',{article:article});
});

router.post('/',async (req,res)=>{

    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown : req.body.markdown
    });

    try {
        article = await article.save();
       
        res.redirect(`/articles/${article.id}`);
    } catch (err) {
        console.log(err);
        res.render('articles/new',{article:article});        
    }

});








module.exports = router;