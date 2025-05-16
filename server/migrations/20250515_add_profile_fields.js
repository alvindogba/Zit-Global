export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('profiles', 'phone', {
    type: Sequelize.STRING,
    allowNull: true,
  });

  await queryInterface.addColumn('profiles', 'company', {
    type: Sequelize.STRING,
    allowNull: true,
  });

  await queryInterface.addColumn('profiles', 'position', {
    type: Sequelize.STRING,
    allowNull: true,
  });

  await queryInterface.addColumn('profiles', 'bio', {
    type: Sequelize.TEXT,
    allowNull: true,
  });
}

export async function down(queryInterface) {
  await queryInterface.removeColumn('profiles', 'phone');
  await queryInterface.removeColumn('profiles', 'company');
  await queryInterface.removeColumn('profiles', 'position');
  await queryInterface.removeColumn('profiles', 'bio');
}
