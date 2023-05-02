const sequelize = require('../config/connection');
const { User, Post} = require('../models')

const blogpostSeedData = require('./blogposts.json')
const userSeedData = require('./users.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true})
    const users = await User.bulkCreate(userSeedData, {
        individualHooks: true,
        returning: true,
    })
    for (const {id} of users) {
        for (const post of blogpostSeedData){
        const newPost = await Post.create({
            ...post,
            post_id: id
        })}
    }
    process.exit(0)
}
seedDatabase()