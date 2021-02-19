/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('film_actor', {
    actor_id: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'actor',
        key: 'actor_id'
      }
    },
    film_id: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'film',
        key: 'film_id'
      }
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'film_actor'
  });
};
