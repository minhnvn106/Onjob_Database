// Bang Cap
module.exports = (sequelize, type) => {
    return sequelize.define('Degree', {
        id: {
            field: 'Deg_ID',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        // Emp_ID: {
        //     type: type.INTEGER,
        //     allowNull: false
        // },
        
        Deg_name: {
            type: type.STRING(50),
            allowNull: false
        },
        Deg_describe: {
            type: type.STRING,
            allowNull: true
        }
    }, { timestamps: false })
}