export default (sequelize, DataTypes) => sequelize.define("Post", {
  title: DataTypes.STRING,
  content: DataTypes.TEXT
});
