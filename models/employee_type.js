// Loai Nhan vien (Vi Du: NV chinh thuc, ban thoi gian, thuc tap,...)
module.exports = (sequelize, type) => {
    return sequelize.define('EmployeeType', {
        id: {
            field: 'ET_ID',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        emType_name: {
            type: type.STRING,
            allowNull: false
        },
        emType_describe: {
            type: type.STRING,
            allowNull: false
        }
    }, { timestamps: false })
}