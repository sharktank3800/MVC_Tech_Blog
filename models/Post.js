const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");
const dayjs = require("dayjs");
const Comment = require("./Comment");

class Post extends Model { }

Post.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  content: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: 4,
        msg: "Post content must be at least 4 characters in length."
      }
    }
  },

  date: {
    type: DataTypes.VIRTUAL,
    get(){
      return dayjs(this.createdAt).format("MM/DD/YYYY")
    }
  }
}, {
  modelName: "post",
  freezeTableName: true,
  sequelize: db
});


Post.hasMany(Comment, {
  as: "comments",
  foreignKey: "post_id"
});

Comment.belongsTo(Post, {
  as: "post",
  foreignKey: "post_id"
});

module.exports = Post;