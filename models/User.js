const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");
const { hash, compare } = require("bcrypt");
const Post = require("./Post");
const Comment = require("./Comment");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username is already in use.",
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: 6,
          msg: "Password must be at least 6 Characters long.",
        },
      },
    },
  },
  {
    modelName: "user",
    // connection object
    sequelize: db,
    hooks: {
      async beforeCreate(user) {
        user.password = await hash(user.password, 10);
        return user;
      },
    },
  }
);

User.prototype.validatePass = async function(formPassword){
    const isValid = await compare(formPassword, this.password);
    return isValid;
}

User.hasMany(Post, {
  as: "posts",
  foreignKey: "author_id",
});

Post.belongsTo(User, {
  as: "author",
  foreignKey: "author_id",
});

User.hasMany(Comment, {
  as: "comments",
  foreignKey: "user_id",
});

Comment.belongsTo(User, {
  as: "user",
  foreignKey: "user_id",
});


module.exports = User;
