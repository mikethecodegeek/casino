'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    noteText: DataTypes.STRING,
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Note.associate = function(models) {
    // associations can be defined here
    Note.belongsTo(models.User,{foreignKey:'userId'})
  };
  return Note;
};