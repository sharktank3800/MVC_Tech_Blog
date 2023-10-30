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

