'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, { foreignKey: 'UserId' });
      User.belongsToMany(models.Movie, {
        through: models.Favorite,
        foreignKey: 'UserId',
        otherKey: 'MovieId'
      });
    }
  }
  User.init({
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      async beforeCreate(user) {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
      },
      async beforeUpdate(user) {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10)
          user.password = await bcrypt.hash(user.password, salt)
        }
      }
    }
  }
  );
  return User;
};