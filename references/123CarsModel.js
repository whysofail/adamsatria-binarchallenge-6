import { Sequelize } from "sequelize";
import db from "../config/database.js"


const { DataTypes } = Sequelize;
const Cars = db.define('cars',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    name:{
        type: DataTypes.STRING
    },
    capacity:{
        type: DataTypes.INTEGER
    },
    description:{
        type: DataTypes.STRING
    },
    img:{
        type: DataTypes.STRING
    },
    rent:{
        type: DataTypes.INTEGER
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull: true

    },
    updatedAt:{
        type: DataTypes.DATE,
        allowNull : true
    },
    actionByUserId:{
        type: DataTypes.INTEGER
    }
},{
    paranoid : true,
    freezeTableName:true
}); 


export default Cars;