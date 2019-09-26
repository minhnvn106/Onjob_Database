// Quan tri
module.exports = (sequelize, type) => {
    return sequelize.define('Admin', {
        id: {
            field: 'Admin_ID',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        Emp_ID: {
            type: type.INTEGER,
            allowNull: false
        },
        username: {
            type: type.STRING(50),
            allowNull: true
        },
        password: {
            type: type.STRING(50),
            allowNull: true
        },
        commission: {
            type: type.STRING(50),
            allowNull: true
        },


    }, { timestamps: false })
}