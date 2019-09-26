// Loai Hop Dong
module.exports = (sequelize, type) => {
    return sequelize.define('Contract', {
        id: {
            field: 'CT_ID',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        CT_name: {
            type: type.STRING,
            allowNull: true
        },
        CT_describe: {
            type: type.STRING,
            allowNull: true
        },
        
    }, { timestamps: false })
}
