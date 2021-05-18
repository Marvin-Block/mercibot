'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.bans.belongsTo(models.users, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      })
    }
  };
  bans.init({
    reason: DataTypes.STRING,
    actionBy: DataTypes.STRING,
    duration: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'bans',
  });
  return bans;
};