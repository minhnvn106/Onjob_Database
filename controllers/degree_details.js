const express = require('express');
const sequelize = require('sequelize');
const Op = sequelize.Op; 
const {Degree, DegreeDetail,Employee} = require('../models/db');
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

    let sortColumn = 'Provider';
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
        DegreeDetail.count().then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            DegreeDetail.findAll({
                order: [[sortColumn, sortDirection]],
                offset: offset,
                limit: limit,
                include: [
                    { model: Degree, as: 'degree'},
                    { model: Employee, as: 'employee'},
                ]
            }).then(degreeDetails => {
                return res.json(PagingResult(degreeDetails, {
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
                {Provider: { [Op.like]: queryString}},
                {Describe: { [Op.like]: queryString}},
            ]
        }

        DegreeDetail.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows/pageSize);
            DegreeDetail.findAll({
                where: whereClause,
                offset: offset,
                limit: limit,
                include: [
                    { model: Degree, as: 'degree'},
                    { model: Employee, as: 'employee'},
                ]
            }).then(degreeDetails => {
                return res.json(PagingResult(degreeDetails, {
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
    DegreeDetail.findByPk(req.params.id).then(type => {
        if(type != null){
            res.json(Result(type));
        } else{
            res.status(404).json(ErrorResult(404, 'Not Found'));
        }
    });
});

router.post('/', (req, res) =>{
    DegreeDetail.create(req.body).then(type =>{
        res.json(Result(type));
    }).catch(err => {
        res.status(400).json(ErrorResult(400, err.errors));
    });
});

router.put('/:id(\\d+)', (req, res) =>{
    DegreeDetail.findByPk(req.params.id).then(type =>{
        if(type !=null){
            type.update({
                Emp_ID: req.body.Emp_ID,
                Deg_ID: req.body.Deg_ID,
                Date: req.body.Date,
                Provider: req.body.Provider,
                Describe: req.body.Describe
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
    DegreeDetail.destroy({
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