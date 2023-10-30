const Post = require("./Post");
const Comment = require("./Comment");
const User = require("./User");


User.hasMany(Post, {
    as: "posts", 
    foreignKey: "author_id"
});

Post.belongsTo(User, {
    as: "author", 
    foreignKey: "author_id"
});

User.hasMany(Comment, {
    as: "comments",
    foreignKey: "user_id"
});

Comment.belongsTo(User, {
    as: "user",
    foreignKey: "user_id"
})


module.exports = {
    Post,
    User,
    Comment,
}