'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cars.init({
    name: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    rent: DataTypes.INTEGER,
    description: DataTypes.STRING,
    img: DataTypes.STRING,
    actionByUserId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    paranoid : true,
    sequelize,
    modelName: 'Cars',
  });
  return Cars;
};