'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let hash = bcrypt.hashSync('superadmin', 10);
    return queryInterface.bulkInsert('Users', [{
      name: 'Admin',
      first_name: 'Super',
      email: 'superadmin@groupomania.fr',
      password: hash,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
