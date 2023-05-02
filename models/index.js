const User = require('./user')
const Post = require('./blogposts')

User.hasMany(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});
Post.belongsTo(User, {
    foreignKey: 'post_id'
})

module.exports = { User, Post};