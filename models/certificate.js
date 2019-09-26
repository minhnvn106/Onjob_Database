// Chung chi
module.exports = (sequelize, type) => {
    return sequelize.define('certificate', {
        id: {
            field: 'Cer_ID',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        // CerType_ID:{
        //     type: type.INTEGER,
        //     allowNull: false
        // },
        Cer_type: {
            type: type.STRING(30),
            allowNull: false
        },

        // AcquireDate: {
        //     type: type.DATE,
        //     allowNull: false
        // },

        // ExpiredDate: {
        //     type: type.DATE,
        //     allowNull: false
        // },

        // Duration: {
        //     type: type.STRING,
        //     allowNull: false
        // },

        Cer_describe: {
            type: type.STRING,
            allowNull: true
        }
    }, { timestamps: false })
}