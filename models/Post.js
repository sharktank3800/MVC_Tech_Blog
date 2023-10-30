const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");
const dayjs = require("dayjs");


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
  modelName: "user_post",
  freezeTableName: true,
  sequelize: db
});

module.exports = Post;