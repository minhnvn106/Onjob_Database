const express = require('express');
const {Nation} = require('../models/db');
const {ErrorResult, Result} = require('../utils/base_response');
const router = express.Router();
router.use( (req, res, next)=>{
    //phan quyen o day
    next();
});
router.get('/', (req, res) =>{
    Nation.findAll().then(types => {
        res.json(Result(types));
    });
});

router.get('/:id(\\d+)', (req, res) =>{
    Nation.findByPk(req.params.id).then(type => {
        if(type != null){
            res.json(Result(type));
        } else{
            res.status(404).json(ErrorResult(404, 'Not Found'));
        }
    });
});

router.post('/', (req, res) =>{
    Nation.create(req.body).then(type =>{
        res.json(Result(type));
    }).catch(err => {
        res.status(400).json(ErrorResult(400, err.errors));
    });
});

router.put('/:id(\\d+)', (req, res) =>{
    Nation.findByPk(req.params.id).then(type =>{
        if(type !=null){
            type.update({
                nation_name: req.body.nation_name,
                nation_describe: req.body.nation_describe
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
    Nation.destroy({
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