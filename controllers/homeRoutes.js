const router = require('express').Router()
const sequelize = require('../config/connection')
const {Post, User} = require ('../models')

router.get('/', async (req, res)=>{
    try {
        const homePage = await Post.findAll({
            // include: [{model: User}],
            // attributes: {
            //     include: [
            //         [
            //             sequelize.literal(
            //                 '(SELECT name From User WHERE Post_id = User.id'
            //             )
            //         ]
            //     ]
            // }
        })
        const posts = homePage.map((post)=>
        post.get({plain: true}))
        res.render('homepage', {posts, logged_in:req.session.logged_in})
        // res.status(200).json(homePage)
    } catch (err){
        res.status(500).json(err)
    }
})
router.get('/dashboard', async (req, res)=>{
   try {
    const dashBoard = await sequelize.query(`SELECT * FROM user INNER JOIN post WHERE post_id = user.id`)
    // Post.findByPk(req.params.id,{
    //     include:[{model: User,
    //     attributes: ['id']}],
        // where: {
        //     post_id: user.id
        // }
    
    // if(!req.session.logged_in) {
    //     res.redirect('/login')
    //     return
    // }
    const myPosts = dashBoard.map((post)=>
        post.get({plain:true}))
    res.render('dashboard', {myPosts})
} catch (err){
    res.status(500).json(err)
}
})
router.get('/login', (req, res)=>{
    if (req.session.logged_in) {
        res.redirect('/')
        return
    }
    res.render('login')
})
module.exports = router