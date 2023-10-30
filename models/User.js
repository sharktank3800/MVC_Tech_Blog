const {Model, DataTypes} = require("sequelize");
const db = require("../config/connection")

class User extends Model{ }


User.init({
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 6
        }
    }
}, {
    modelName: "user",
    // connection object
    sequelize: db
})


module.exports = User;