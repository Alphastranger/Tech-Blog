const User = require('./user')
const Post = require('./blogposts')

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
Post.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { User, Post};