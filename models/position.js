//Chuc vu
module.exports = (sequelize, type) => {
    return sequelize.define('Position', {
        id: {
            field: 'Pos_ID',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Pos_Name: {
            type: type.STRING,
            allowNull: false
        },
        Pos_Describe: {
            type: type.STRING,
            allowNull: true
        }
    }, { timestamps: false })
}