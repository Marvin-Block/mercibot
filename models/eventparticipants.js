'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class eventParticipants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  eventParticipants.init({
    user: DataTypes.STRING,
    event: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'eventParticipants',
  });
  return eventParticipants;
};