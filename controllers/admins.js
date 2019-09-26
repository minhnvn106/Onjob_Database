const express = require('express');

const sequelize = require('sequelize');
// const Op = sequelize.Op; 

const jwt = require('jsonwebtoken');
const helper = require('../utils/HELPER');
const { Admin, Employee } = require('../models/db');
const {ErrorResult, Result} = require('./../utils/base_response');
const router = express.Router();
router.use((req, res, next) => {
    next();
});

router.post('/', (req, res) => {
    req.body.password = helper.hash(req.body.password);
    Admin.create(req.body).then(type => {
        res.json(Result(type));
    }).catch(err => {
        return res.status(400).json(ErrorResult(404, err.errors));
    });
})

router.post('/login', (req, res) => {
    Admin.findOne({
        where: {
            username: req.body.username,
            password: helper.hash(req.body.password)
        }
    }).then(aAdmin => {
        if(aAdmin != null) {
            const token = jwt.sign({userId: aAdmin.id, username: aAdmin.username}, helper.appKey, {expiresIn: '3h'});
            res.json(Result({
                id: aAdmin.id,
                username: aAdmin.username,
                commission: aAdmin.commission,
                token: token,
            }));
        } else {
            res.status(401).json(ErrorResult(401, 'Invalid username or password'));
        }
    });
});

router.put('/:id(\\d+)', (req, res) =>{
    Customer.findByPk(req.params.id).then(type =>{
        if(type !=null){
            type.update({
                username: aAdmin.username,
                password: aAdmin.password,
                commission: aAdmin.commission,
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

module.exports = router;