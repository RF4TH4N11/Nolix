'use strict';
const {
  Model
} = require('sequelize');
const changeFormatDate = require('../helpers/helper')
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.User, { foreignKey: 'UserId' });
      Movie.belongsTo(models.Category, { foreignKey: 'CategoryId' });
      Movie.belongsToMany(models.User, {
        through: models.Favorite,
        foreignKey: 'MovieId',
        otherKey: 'UserId'
      });

    }
    static async getAverageRating() {
      const result = await this.findAll({
        attributes: [[fn('AVG', col('rating')), 'averageRating']],
        raw: true,
      });
      return parseFloat(result[0].averageRating);
    }
    get formatedRelease(){
    return changeFormatDate(this.released)
  }
  instanceFormatedRelease(){
    return changeFormatDate(this.released)
  }
}
 Movie.init({
    title: DataTypes.STRING,
    year: DataTypes.STRING,
    released: DataTypes.STRING,
    runtime: DataTypes.STRING,
    director: DataTypes.STRING,
    actor: DataTypes.STRING,
    plot: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    videoId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};