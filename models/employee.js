// Ho so nhan vien
module.exports = (sequelize, type) => {
    return sequelize.define('Employee', {
        id: {
            field: 'Emp_ID',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        ET_ID: {
            type: type.INTEGER,
            allowNull: false
        },
        Nat_ID: {
            type: type.INTEGER,
            allowNull: false
        },

        Dep_ID: {
            type: type.INTEGER,
            allowNull: false
        },
        // Pos_ID: {
        //     type: type.INTEGER,
        //     allowNull: false
        // },

        // Pay_ID: {
        //     type: type.INTEGER,
        //     allowNull: false
        // },
        
        // Cont_ID: {
        //     type: type.INTEGER,
        //     allowNull: false
        // },

        FullName: {
            type: type.STRING,
            allowNull: true
        },

        Gender: {
            type: type.FLOAT,
            allowNull: true
        },
        
        // Admin_ID: {
        //     type: type.INTEGER,
        //     allowNull: true
        // },
        BirthDay: {
            type: type.STRING,
            allowNull: true
        },
        Img: {
            type: type.STRING,
            allowNull: true
        },
        Address: {
            type: type.STRING,
            allowNull: true
        },
       
        Salary: {
            type: type.STRING,
            allowNull: true
        },

        Citizen_ID: {
            type: type.INTEGER,
            allowNull: false
        },
    }, { timestamps: false })
}