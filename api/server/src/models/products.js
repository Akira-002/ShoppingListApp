module.exports = (sequelize, Sequelize) => {
    const products = sequelize.define('products', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        }
    }, {
        defaultScope: {
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            }
        },
        timestamps: false
    });
  return products;
};