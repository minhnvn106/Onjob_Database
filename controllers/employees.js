const express = require('express');
const sequelize = require('sequelize');
const Op = sequelize.Op; 
const {Employee, Department, Nation, EmployeeType} = require('../models/db');
const {ErrorResult, Result, PagingResult} = require('../utils/base_response');
const router = express.Router();
router.use( (req, res, next)=>{
    //phan quyen o day
    next();
});
router.get('/', (req, res) =>{
    // Customer.findAll().then(types => {
    //     res.json(Result(types));
    // });
    let page = 0;
    if (req.query.p) page = parseInt(req.query.p);

    let pageSize = 20;
    if (req.query.s) pageSize = parseInt(req.query.s);

    let queryString = '';
    if(req.query.q) queryString = '%' + decodeURIComponent(req.query.q) +'%';

    let sortColumn = 'FullName';
    let sortDirection = 'ASC';
    if (req.query.so) {
        const sortStr = decodeURIComponent(req.query.so).split(' ');
        sortColumn = sortStr[0];
        if ( sortStr.length == 2) sortDirection = sortStr[1];
    }

    const offset = page * pageSize;
    // const limit = parseInt(offset) + parseInt(pageSize);
    const limit = pageSize;

    if (queryString.length <= 2 ) {
        Employee.count().then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            Employee.findAll({
                order: [[sortColumn, sortDirection]],
                offset: offset,
                limit: limit,
                include: [
                    { model: Department, as: 'degree'},
                    { model: Nation, as: 'nation'},
                    { model: EmployeeType, as: 'employeeType'},
                ]
            }).then(employees => {
                return res.json(PagingResult(employees, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages,
                }));
            });
        });
    } else { // search
        // conditions
        const whereClause = {
            [Op.or]: [
                {FullName: { [Op.like]: queryString}},
                {Gender: { [Op.like]: queryString}},
                {BirhtDay: { [Op.like]: queryString}},
                {Salary: { [Op.like]: queryString}},
            ]
        }

        Employee.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            Employee.findAll({
                where: whereClause,
                offset: offset,
                limit: limit,
                include: [
                    { model: Department, as: 'degree'},
                    { model: Nation, as: 'nation'},
                    { model: EmployeeType, as: 'employeeType'},
                ]
            }).then(employees => {
                return res.json(PagingResult(employees, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages,
                }));
            });
        });
    }
});

router.get('/:id(\\d+)', (req, res) =>{
    Employee.findByPk(req.params.id).then(type => {
        if(type != null){
            res.json(Result(type));
        } else{
            res.status(404).json(ErrorResult(404, 'Not Found'));
        }
    });
});

router.post('/', (req, res) =>{
    Employee.create(req.body).then(type =>{
        res.json(Result(type));
    }).catch(err => {
        res.status(400).json(ErrorResult(400, err.errors));
    });
});

router.put('/:id(\\d+)', (req, res) =>{
    Employee.findByPk(req.params.id).then(type =>{
        if(type !=null){
            type.update({
                ET_ID: req.body.ET_ID,
                Nat_ID: req.body.Nat_ID,
                Dep_ID: req.body.Dep_ID,
                FullName: req.body.FullName,
                Gender: req.body.Gender,
                BirhtDay: req.body.BirhtDay,
                Img: req.body.Img,
                Address: req.body.Address,
                Salary: req.body.Salary,
                Citizen_ID: req.body.Citizen_ID
            }).then(type => {
                res.json(Result(type));
            }).catch(err =>{
                res.status(400).json(ErrorResult(400, err.errors));
            });
        } else {
            res.status(404).json(ErrorResult(404, 'Not Found'));
        }
    });
});

router.delete('/:id', (req, res) =>{
    Employee.destroy({
        where: {
            id: req.params.id
        }
    }).then(type => {
        res.json(Result(type));
    }).catch(err => {
        res.status(500).json(ErrorResult(500, err.errors));
    });
});
module.exports = router;