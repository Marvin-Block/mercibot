'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mutes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  mutes.init({
    user: DataTypes.STRING,
    reason: DataTypes.STRING,
    actionBy: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    channel: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'mutes',
  });
  return mutes;
};