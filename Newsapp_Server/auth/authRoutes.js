const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Reader = mongoose.model('Reader');
const Draft = mongoose.model('Draft');
const AuthUser = mongoose.model('AuthUser');
const Articles = mongoose.model('Articles');
const Reporter = mongoose.model('Reporter');
const authMiddleware = require('../middleware/authMiddleware');
const reporterMiddleware = require('../middleware/reporterMiddleware');


require('dotenv').config();

// Routing using async/await

router.post('/add-new-reader', async (req, res) => {
    try {
        console.log('Data sent from client - ', req.body);
        const { firstName, lastName, password, email,userID } = req.body;

        // Check if the email already exists
        const existsReader = await Reader.findOne({ email });
        if (existsReader) {
            return res.status(422).send({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const reader = new Reader({
            firstName,
            lastName,
            password: hashedPassword,
            email,
            userID
        });
        await reader.save();

        const authUser = new AuthUser({
            userID: reader.userID, 
            roleType: "reader",
            reader: reader._id
        });
        await authUser.save();
        res.send({ message: 'Reader registered successfully' });
    } catch (error) {
        console.log('Database error', error);
        return res.status(422).send({ error: error.message });
    }
});

// Add new reporter
router.post('/add-new-reporter', async (req, res) => {
    try {
        console.log('Data sent by client side-', req.body);
        const { firstName, lastName, password, email, city, country, contactNumber, userID } = req.body;

        // Check if the email already exists
        const existsReporter = await Reporter.findOne({ email });

        if (existsReporter) {
            return res.status(422).send({ error: "Email already exists" });
        }

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new reporter object
        const reporter = new Reporter({
            firstName,
            lastName,
            password: hashedPassword,
            email,
            city,
            country,
            contactNumber,
            userID
        });

        await reporter.save();

        const authUser = new AuthUser({
            userID: reporter.userID, 
            roleType: "reporter",
            reporter: reporter._id
        });
        await authUser.save();
        res.send({ message: 'Reporter registered successfully' });

    } catch (error) {
        console.log("Database error", error);
        return res.status(422).send({ error: error.message });
    }
});

// Login router
router.post('/user-login', async (req, res) => {
    try {
        const { userID, password } = req.body;
        const authUser = await AuthUser.findOne({ userID });
        if (!authUser) {
            return res.status(401).json({ error: 'User not found' });
        }
        
        let user;
        if(authUser.roleType==="reader")
            {
                user=await Reader.findById(authUser.reader);
            }else if(authUser.roleType==="reporter")
                {
                    user = await Reporter.findById(authUser.reporter);

                }
          //if no user found
        if(!user)
            {
                return res.status(401).json({ error: 'User not found' });
            }

        //if found user
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch)
            {
                return res.status(401).json({ error: 'Invalid password' });
            }
        const token =jwt.sign({userID:authUser._id,roleType:authUser.roleType},process.env.jwt_SECRET,{expiresIn:'10m'});
        const roleType = authUser.roleType;

        //return data
        res.json({token,roleType});
        console.log(`Logging as ${authUser.roleType}`); 

        
    } catch (error) {
        console.log('Database error', error);
        return res.status(500).send({ error: error.message });
    }
});

/// create new article
// router.post('/create-new-article',authMiddleware,reporterMiddleware , async (req,res)=>{
//        const {articleType,newsHeading,newsDescription,newsDescriptionLong,city,country,coverImage} = req.body;
//     try {
//         const newArticles = new Articles({
//             author:req.reporter._id,
//             articleType,
//             newsHeading,
//             newsDescription,
//             newsDescriptionLong,
//             city,
//             country,
//             coverImage

//         });

//         const savedArticles = await newArticles.save();
//         //update reporter article list
//         req.reporter.articles.push(savedArticles_id)
//         await req.reporter.save();
//         res.status(201).json(savedArticles);


        
        
//     } catch (error) {
//         console.error('Error creating article',error);
//         res.status(500).json({error:'Interna server error'});
//     }
  
// });


//creat new article v2

router.post('/create-new-article',authMiddleware,reporterMiddleware , async (req,res)=>{
    const {articleType,newsHeading,newsDescription,newsDescriptionLong,city,country,coverImage,publicationType} = req.body;

    //validate publication type
    if(![0,1,2].includes(publicationType)){
        return res.status(400).json({error:'Invalid publication type'});

    }


 try {
     const newArticles = new Articles({
         author: req.reporter._id,
         articleType,
         newsHeading,
         newsDescription,
         newsDescriptionLong,
         city,
         country,
         coverImage,
         publicationType

     });

     const savedArticles = await newArticles.save();
     //update reporter article list
     req.reporter.articles.push(savedArticles._id)
     await req.reporter.save();

     if(publicationType===2){

        const newDraft = new Draft({
            author: req.reporter._id,
            articleType,
            newsHeading,
            newsDescription,
            newsDescriptionLong,
            city,
            country,
            coverImage,
            publicationType
        });

        const saveDraft = await newDraft.save();
        req.reporter.drafts.push(saveDraft._id)

        await req.reporter.save();
        return res.status(201).json({message:'Draft saved successfully'});
        
     }
     
     res.status(201).json({message:'Article saved successfully'});

    ///  res.status(201).json(savedArticles);


     
     
 } catch (error) {
     console.error('Error creating article',error);
     res.status(500).json({error:'Interna server error'});
 }

});


////delete article

router.delete('/delete-article/:id',authMiddleware,reporterMiddleware, async (req,res)=>{
    const articleId = req.params.id;


    try {
        const article = await Articles.findById(articleId);
        //if article id not found
        if(!articleId){
            return  res.status(404).json({error:'Article not found'});
        }
        
        //check if the requesting reporter it the author, avoid other reportrs delet others articles
            if(article.author.toString() !== req.reporter._id.toString()){
                return  res.status(403).json({error:'Not authorized to delete this artical'});
            }

            //delete the article
            await Articles.findByIdAndDelete(articleId);

            //delete draft
            await Draft.findByIdAndDelete(articleId);

            ///Remove the article/draft id from Reporter author
            await Reporter.findByIdAndUpdate(req.reporter._id,{
                $pull:{article :articleId,drafts: articleId}
            });
            res.status(201).json({message:'Article deleted successfully'});   



    } catch (error) {
        console.error('Error deleting article',error);
        res.status(500).json({error:'Interna server error'});
    }

});

///Route to update DArticles and drafts

router.put('/update-article/:id', authMiddleware,reporterMiddleware , async(req,res)=>{
    const articleId = req.params.id;
    const {articleType,newsHeading,newsDescription,newsDescriptionLong,city,country,coverImage,publicationType} = req.body;

    //validate publication type
    if(![0,1,2].includes(publicationType)){
        return res.status(400).json({error:'Invalid publication type'});

    }

    
    try {
       const article = await Articles.findById(articleId) || await Draft.findById(articleId);

       if(!article){
        return res.status(403).json({error:'Article not found'})
       }
       //check requeating reporter is the author
       if(article.author.toString() !== req.reporter._id.toString()){
        return  res.status(403).json({error:'Not authorized to update this artical'});
    }

    ///update article field
    article.articleType = articleType || article.articleType;
    article.newsHeading = newsHeading || article.newsHeading;
    article.newsDescription = newsDescription || article.newsDescription;
    article.newsDescriptionLong = newsDescriptionLong || article.newsDescriptionLong;
    article.city = city || article.city;
    article.country = country || article.country;
    article.coverImage = coverImage || article.coverImage;
    article.publicationType = publicationType;

    //save the article 
    const updateArticle = await article.save();

    //update draft
    if(publicationType===2){
        let draft = await Draft.findOne({author:req.reporter._id,_id:articleId});
    
    if(!draft){
        draft = new Draft({
            _id:articleId,
            author:req.reporter._id,
            articleType,
            newsHeading,
            newsDescription,
            newsDescriptionLong,
            city,
            country,
            coverImage,
            publicationType
        });
    }
    else{
         ///update draft field
    draft.articleType = articleType || draft.articleType;
    draft.newsHeading = newsHeading || draft.newsHeading;
    draft.newsDescription = newsDescription || draft.newsDescription;
    draft.newsDescriptionLong = newsDescriptionLong || draft.newsDescriptionLong;
    draft.city = city || draft.city;
    draft.country = country || draft.country;
    draft.coverImage = coverImage || draft.coverImage;
    publicationType = publicationType;
        
    }
    await draft.save();
}
else{
    await Draft.findByIdAndDelete({author:req.reporter._id,_id:articleId});
}

res.status(200).json(updateArticle);



 
    } catch (error) {
        console.error('Error updating the article',error);
        res.status(500).json({error:'Internal server error'});


    }

});

module.exports = router;
