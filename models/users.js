'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasMany(models.bans, {
        foreignKey: 'userId'
      })
    }
  };
  users.init({
    discordId: DataTypes.UUID,
    name: DataTypes.STRING,
    permissions: DataTypes.INTEGER,
    email: DataTypes.STRING,
    emailVerifiedAt: DataTypes.DATE,
    password: DataTypes.STRING,
    birthday: DataTypes.DATE,
    age: DataTypes.INTEGER,
    bio: DataTypes.STRING,
    level: DataTypes.INTEGER,
    xp: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};