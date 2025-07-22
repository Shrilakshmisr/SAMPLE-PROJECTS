const { Sequelize } = require('sequelize');

// You can use your MySQL credentials
const sequelize = new Sequelize('expense_db', 'root', 'W7301@jqir#', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
