'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    chipCount: DataTypes.INTEGER,
    pic: DataTypes.STRING,
    totalWon: DataTypes.NINTEGER,
    nickName: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Profile.associate = function(models) {
    // associations can be defined here
  };
  return Profile;
};