export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('profiles', 'reset_token', {
    type: Sequelize.TEXT,
    allowNull: true,
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('profiles', 'reset_token');
}
