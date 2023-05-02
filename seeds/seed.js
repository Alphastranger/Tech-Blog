const sequelize = require('../config/connection');
const { User, Post} = require('../models')

const blogpostSeedData = require('./blogposts.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true})
    const posts = await Post.bulkCreate(blogpostSeedData)
    process.exit(0)
}
seedDatabase()