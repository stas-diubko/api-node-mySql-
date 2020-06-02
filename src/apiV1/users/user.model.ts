const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const db = require('../../config/db');

const Role = db.define('role', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
    field: 'id',
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  userId: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: "role"
});

const User = db.define('user', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  surname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: "user"
});

User.hasOne(Role, {as: 'Roles', foreignKey: 'userId'})
Role.belongsTo(User, {foreignKey: 'id'});

User.prototype.toJSON =  function () {
  var values = Object.assign({}, this.get());

  delete values.password;
  return values;
}

export default { User, Role }