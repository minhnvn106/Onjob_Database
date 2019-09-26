const Sequelize = require('sequelize');

const AdminModel = require('./admin')
const EmployeeModel = require('./employee');
const EmployeeTypeModel = require('./employee_type');
// const NatdocModel = require ('./nat_doc');
const PositionModel = require('./position');
const DepartmentModel = require('./department');
const NationModel = require('./nation');
const ShiftModel = require ('./shift');
const DegreeModel = require ('./degree');
const DegreeDetailModel = require ('./degree_detail');
const ContractModel = require ('./contract');
const ContractDetailModel = require ('./contract_detail');
const WorkDetailModel = require ('./workdetail');

// const CertificateModel = require ('./certificate');

const sequelize = new Sequelize('ISC_Team4', 'sa', '1234', {
    dialect: 'mssql',
    host: 'localhost',
    
    pool: { max: 20, min: 0, acquire: 30000, idle: 10000 },
    logging: true
})

const Admin = AdminModel(sequelize, Sequelize);
const Employee = EmployeeModel(sequelize, Sequelize);
const EmployeeType = EmployeeTypeModel(sequelize, Sequelize);
// const Natdoc = NatdocModel(sequelize, Sequelize);
const Position = PositionModel(sequelize, Sequelize);
const Department = DepartmentModel(sequelize, Sequelize);
const Nation = NationModel(sequelize, Sequelize);
const Shift = ShiftModel(sequelize, Sequelize);
const Degree = DegreeModel(sequelize, Sequelize);
const DegreeDetail = DegreeDetailModel(sequelize, Sequelize);
const Contract = ContractModel(sequelize, Sequelize);
const ContractDetail = ContractDetailModel(sequelize, Sequelize);
const WorkDetail = WorkDetailModel(sequelize, Sequelize);

// const Certificate = CertificateModel(sequelize, Sequelize);

// Ràng buộc

Admin.belongsTo(Employee, { foreignKey: 'Emp_ID', as: 'employee' });
Employee.hasMany(Admin, { foreignKey: 'Emp_ID', as: 'admins' });

Employee.belongsTo(EmployeeType, { foreignKey: 'ET_ID', as: 'employeeType' });
EmployeeType.hasMany(Employee, { foreignKey: 'ET_ID', as: 'employees' });

WorkDetail.belongsTo(Position, { foreignKey: 'Pos_ID', as: 'position' });
Position.hasMany(WorkDetail, { foreignKey: 'Pos_ID', as: 'workDetails' });

WorkDetail.belongsTo(Shift, { foreignKey: 'Shift_ID', as: 'shift' });
Shift.hasMany(WorkDetail, { foreignKey: 'Shift_ID', as: 'workDetails' });

Employee.belongsTo(Department, { foreignKey: 'Dep_ID', as: 'department' });
Department.hasMany(Employee, { foreignKey: 'Dep_ID', as: 'employees'});

WorkDetail.belongsTo(Employee, { foreignKey: 'Emp_ID', as: 'department' });
Employee.hasMany(WorkDetail, { foreignKey: 'Emp_ID', as: 'employees'});

ContractDetail.belongsTo(Contract, { foreignKey: 'CT_ID', as: 'contract' });
Contract.hasMany(ContractDetail, { foreignKey: 'CT_ID', as: 'contractDetails'});

ContractDetail.belongsTo(Employee, { foreignKey: 'Emp_ID', as: 'employee' });
Employee.hasMany(ContractDetail, { foreignKey: 'Emp_ID', as: 'contractDetails'});

Employee.belongsTo(Nation, { foreignKey: 'Nat_ID', as: 'nation' });
Nation.hasMany(Employee, { foreignKey: 'Nat_ID', as: 'employees'});

DegreeDetail.belongsTo(Employee, { foreignKey: 'Emp_ID', as: 'employee' });
Employee.hasMany(DegreeDetail, { foreignKey: 'Emp_ID', as: 'degreeDetails'});

DegreeDetail.belongsTo(Degree, { foreignKey: 'Deg_ID', as: 'degree' });
Degree.hasMany(DegreeDetail, { foreignKey: 'Deg_ID', as: 'degreeDetails'});

// Customer.belongsTo(CustomerType, { foreignKey: 'CUT_ID', as: 'customerType' });
// CustomerType.hasMany(Customer, { foreignKey: 'CUT_ID', as: 'customers' });


//run once, then comment-out
// sequelize.sync({ force: true }).then(() => {
//     console.log('database & tables created!');
// });

module.exports = {
    Admin,
    Employee,
    EmployeeType,
    // Natdoc,
    Position,
    Department,
    Nation,
    Shift,
    Degree,
    DegreeDetail,
    Contract,
    ContractDetail,
    WorkDetail
    // Certificate
}