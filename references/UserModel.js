import { Sequelize } from "sequelize";
import db from "../config/database.js"

const { DataTypes } = Sequelize;
const Users = db.define('user',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email:{
        type: DataTypes.STRING
    },
    name:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    roles:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},{
    timestamps: false,
    freezeTableName:true
})

export default Users;