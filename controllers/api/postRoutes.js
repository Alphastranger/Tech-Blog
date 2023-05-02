const router = require('express').Router();
const { Post, User } = require('../../models');
const { sequelize } = require('../../models/user');

router.get('/', async (req, res)=>{
    try {
        const homePage = await Post.findAll({
            include: [{model: User}],
            attributes: {
                include: [
                    [
                        sequelize.literal(
                            '(SELECT name From User WHERE Post_id = User.id'
                        )
                    ]
                ]
            }
        })
        const posts = homePage.map((post)=>
        post.get({plain: true}))
        res.render('homepage', {posts})
        res.status(200).json(homePage)
    } catch (err){
        res.status(500).json(err)
    }
})
router.post('/', async (req, res)=>{
    try {
        const newPost = await Post.create({
            ...req.body,
            title: req.body.title,
            post_text: req.body.post_text
        })
        res.status(200).json(newPost)
    } catch (err) {
        res.status(400).json(err)
    }
})
router.put('/:id', async (req,res)=>{
    try {
        const upPost = await Post.update({
            title: req.body.title,
            post_text: req.body.post_text
        },
        {where: {
           post_id: req.session.post_id 
        }
    })
    res.status(200).json(upPost)
    } catch (err) {
        res.status(400).json(err)
    }
})
router.delete('/:id', async (req,res)=>{
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        })
        if (!postData) {
            res.status(404).json({message: 'No post with this id'})
            return;
        }
        res.status(200).json(postData)
    }catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router;