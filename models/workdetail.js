// Chi tiet cong viec
module.exports = (sequelize, type) => {
    return sequelize.define('WorkDetail', {
        id: {
            field: 'WD_ID',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        Pos_ID: {
            type: type.INTEGER,
            allowNull: false
        },

        Shift_ID: {
            type: type.INTEGER,
            allowNull: false
        },

        Emp_ID: {
            type: type.INTEGER,
            allowNull: false
        },

        Date:{
            type: type.DATE,
            allowNull: true
        },       

        WorkTime:{
            type: type.STRING,
            allowNull: true
        },       

        Bonus: {
            type: type.STRING,
            allowNull: true
        },

        Minus: {
            type: type.STRING,
            allowNull: true
        },

    }, { timestamps: false })
}