export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('error_logs', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    error: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    donationData: {
      type: Sequelize.JSONB,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  });
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('error_logs');
};
