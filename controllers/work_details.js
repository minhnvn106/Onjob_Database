const express = require('express');
const sequelize = require('sequelize');
const Op = sequelize.Op; 
const {WorkDetail, Position, Shift, Employee} = require('../models/db');
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

    let sortColumn = 'WorkTime';
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
        WorkDetail.count().then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            WorkDetail.findAll({
                order: [[sortColumn, sortDirection]],
                offset: offset,
                limit: limit,
                include: [
                    { model: Position, as: 'degree'},
                    { model: Shift, as: 'shift'},
                    { model: Employee, as: 'employee'},
                ]
            }).then(workDetails => {
                return res.json(PagingResult(workDetails, {
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
                {Date: { [Op.like]: queryString}},
                {WorkTime: { [Op.like]: queryString}},
                {Bonus: { [Op.like]: queryString}},
                {Minus: { [Op.like]: queryString}},
            ]
        }

        WorkDetail.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            WorkDetail.findAll({
                where: whereClause,
                offset: offset,
                limit: limit,
                include: [
                    { model: Position, as: 'degree'},
                    { model: Shift, as: 'shift'},
                    { model: Employee, as: 'employee'},
                ]
            }).then(workDetails => {
                return res.json(PagingResult(workDetails, {
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
    WorkDetail.findByPk(req.params.id).then(type => {
        if(type != null){
            res.json(Result(type));
        } else{
            res.status(404).json(ErrorResult(404, 'Not Found'));
        }
    });
});

router.post('/', (req, res) =>{
    WorkDetail.create(req.body).then(type =>{
        res.json(Result(type));
    }).catch(err => {
        res.status(400).json(ErrorResult(400, err.errors));
    });
});

router.put('/:id(\\d+)', (req, res) =>{
    WorkDetail.findByPk(req.params.id).then(type =>{
        if(type !=null){
            type.update({
                Pos_ID: req.body.Pos_ID,
                Shift_ID: req.body.Shift_ID,
                Emp_ID: req.body.Emp_ID,
                Date: req.body.Date,
                WorkTime: req.body.WorkTime,
                Bonus: req.body.Bonus,
                Minus: req.body.Minus
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
    WorkDetail.destroy({
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