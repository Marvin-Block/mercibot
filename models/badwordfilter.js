'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class badwordFilter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  badwordFilter.init({
    value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'badwordFilter',
  });
  return badwordFilter;
};