// Ca lam
module.exports = (sequelize, type) => {
    return sequelize.define('Shift', {
        id: {
            field: 'Shift_ID',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        Week_Date: {
            type: type.STRING,
            allowNull: true
        },
        Shift_Start: {
            type: type.STRING,
            allowNull: true
        },

        Shift_End: {
            type: type.STRING,
            allowNull: true
        },
        
    }, { timestamps: false })
}