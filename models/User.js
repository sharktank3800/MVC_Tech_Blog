const {Model, DataTypes} = require("sequelize");
const db = require("../config/connection")
const {hash, compare} = require("bcrypt");


class User extends Model{ }


User.init({
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: "Username is already in use."
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: 6,
                msg: "Password must be at least 6 Characters long."
            }
        }
    }
}, {
    modelName: "user",
    // connection object
    sequelize: db
})



module.exports = User;