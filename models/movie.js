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
      Movie.belongsTo(models.User)
      Movie.belongsTo(models.Category)
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
  year: DataTypes.INTEGER,
  released: DataTypes.DATE,
  director: DataTypes.STRING,
  actors: DataTypes.STRING,
  plot: DataTypes.STRING,
  imageUrl: DataTypes.STRING,
  rating: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'Movie',
  hooks: {
    beforeDestroy: (movie, options) => {
      // Hook konfirmasi sebelum dihapus
      console.log(`Movie dengan judul ${movie.title} akan dihapus.`);
    }
  }
});
return Movie;
};