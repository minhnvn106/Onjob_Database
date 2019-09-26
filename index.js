const express = require('express');
var fs = require('fs');
var multer = require('multer');
var app = express();
var bodyParser = require('body-parser');

const cors = require('cors');

app.use(cors({
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}));

// const auth = require('./middleware/auth');
// app.use(auth);

// const auth = require('./middleware/auth');
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', '*');
//     res.header('Access-Control-Allow-Methods', '*');

//     if(req.url == '/users/login')
//         next();
//     else 
//         auth(req, res, next);
//     // next();
// })

const {ErrorResult, Result} = require('./utils/base_response');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// const {CustomerType, Customer} = require('./models/db');

const adminCtrl = require('./controllers/admins');
app.use('/admins', adminCtrl);

const contractCtrl = require('./controllers/contracts');
app.use('/contracts', contractCtrl);

const contractDeCtrl = require('./controllers/contract_details');
app.use('/contractdetails', contractDeCtrl);

const degreeCtrl = require('./controllers/degrees');
app.use('/degrees', degreeCtrl);

const degreeDeCtrl = require('./controllers/degree_details');
app.use('/degreedetails', degreeDeCtrl);

const departmentCtrl = require('./controllers/departments');
app.use('/departments', departmentCtrl);

const employeeTypeCtrl = require('./controllers/employee_types');
app.use('/employee_types', employeeTypeCtrl);

const employeeCtrl = require('./controllers/employees');
app.use('/employees', employeeCtrl);

const shiftCtrl = require('./controllers/shifts');
app.use('/shifts', shiftCtrl);

const positionCtrl = require('./controllers/positions');
app.use('/positions', positionCtrl);

const nationCtrl = require('./controllers/nations');
app.use('/nations', nationCtrl);

const workdetailCtrl = require('./controllers/work_details');
app.use('/workdetails', workdetailCtrl);


app.use((req, res) =>{
    res.status(404).json(ErrorResult(404, 'API Not Found'));
});

var server = app.listen(8081, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Server is running at http://%s:%s', host, port);
});