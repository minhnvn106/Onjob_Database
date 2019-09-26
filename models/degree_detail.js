// Bang Cap
module.exports = (sequelize, type) => {
    return sequelize.define('DegreeDetail', {
        id: {
            field: 'DeT_ID',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        Emp_ID: {
            type: type.INTEGER,
            allowNull: false
        },

        Deg_ID: {
            type: type.INTEGER,
            allowNull: false
        },

        Date: {
            type: type.STRING,
            allowNull: true
        },

        // Nơi cấp bằng (Tên trường,...)
        Provider: {
            type: type.STRING,
            allowNull: false
        },

        Describe: {
            type: type.STRING,
            allowNull: true
        }
    }, { timestamps: false })
}