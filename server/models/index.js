import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const database = `univera_${process.env.NODE_ENV}`;
const username = `root`;
const password = null;
const dbOptions = {
  dialectModulePath: 'mysql2',
  timezone: '+08:00'
};

const sequelize = new Sequelize(database, username, password, dbOptions);
const db = {Sequelize, sequelize};

/**
 * Automatically imports model definition to Sequelize instance and exports as
 * members in `db` object.
 *
 * You can have `db` as default module, as well as {Sequelize, sequelize} and
 * each individual model.
 *
 * @private
 */
fs.readdirSync(__dirname)
  .filter(blob => blob.indexOf('.') !== 0 && blob !== 'index.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

export default db;
