// Chi tiet Hop Dong
module.exports = (sequelize, type) => {
    return sequelize.define('ContractDetail', {
        id: {
            field: 'CD_ID',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        CT_ID: {
            type: type.INTEGER,
            allowNull: false
        },
        
        Emp_ID: {
            type: type.INTEGER,
            allowNull: false
        },

        CT_Start: {
            type: type.STRING,
            allowNull: true
        },

        CT_End: {
            type: type.STRING,
            allowNull: true
        },
        
        CT_Signer: {
            type: type.STRING,
            allowNull: true
        },
        
    }, { timestamps: false })
}