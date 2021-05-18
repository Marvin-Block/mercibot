'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customConfig extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  customConfig.init({
    key: DataTypes.STRING,
    value: DataTypes.STRING,
    info: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'customConfig',
  });
  return customConfig;
};