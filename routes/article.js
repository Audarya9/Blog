const router = require('express').Router();
const Article = require('./../models/article');



router.get('/new',(req,res)=>{
    res.render('articles/new',{article : new Article()});
});

router.get('/edit/:id', async(req,res)=>{
    const article = await Article.findById(req.params.id);
    res.render('articles/edit',{article : new Article()});
});

router.get('/:slug', async(req,res)=>{
    const article = await Article.findOne({slug: req.params.slug});
    console.log(article);
    if (article == null) {
        res.redirect('/');        
    } else {
        res.render('articles/show',{article:article});
    }
    // if (article == null) res.redirect('/')
    // res.render('articles/show',{article:article});
});

router.post('/',async (req,res,next)=>{

    req.article = new Article();
    next()

},  saveArticleAndRedirect('new'));

router.put('/',async (req,res,next)=>{

    req.article = await Article.findById(req.params.id);
    next()

},  saveArticleAndRedirect('edit'));

router.delete('/:id', async (req,res)=>{

    await Article.findById(req.params.id);
    res.redirect('/');
});

function saveArticleAndRedirect(path){
    return async (req,res)=>{
        let article = req.article
            article.title = req.body.title
            article.description = req.body.description
            article.markdown = req.body.markdown
        
    
        try {
            article = await article.save();
           
            res.redirect(`/articles/${article.id}`);
        } catch (err) {
            console.log(err);
            res.render(`articles/${path}`,{article:article});        
        }
    }
}








module.exports = router;