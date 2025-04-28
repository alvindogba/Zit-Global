'use strict';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export default {
  up: async (queryInterface) => {
    const passwordHash = await bcrypt.hash('info@zit_admin', 12);
    const userId = uuidv4();

    await queryInterface.bulkInsert('Users', [
      {
        id:            userId,
        email:         'dominic@walamen.com',
        password_hash: passwordHash,
        role:          'admin',
        full_name:      'Site Administrator',
        phone_number:  '0771989967',
        created_at:    new Date(),
        updated_at:    new Date(),
      },
    ], {});

    await queryInterface.bulkInsert('Admin', [
      {
        id:         uuidv4(),
        user_id:    userId,
        fullName:   'Site Administrator',
        email:      'dominic@walamen.com',
        phone:      '0771989967',
        createdAt:  new Date(),
        updatedAt:  new Date(),
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Admin', { email: 'dominic@walamen.com' }, {});
    await queryInterface.bulkDelete('Users', { email: 'dominic@walamen.com' }, {});
  }
};
