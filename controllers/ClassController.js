var Cate = require('../models/Categories.js');
var Tool = require('../models/Tools.js');
var Class = require('../models/Class.js');
var Rate = require('../models/Rates.js')
module.exports = {

    // [GET] /new
    getRate: (req, res) => {
        var classid = req.params.classId

        Rate.find((cid)=>cid.id.toString() == classid)
        .then((data)=> {
            res.render(data);
        })

    },

    addRate: (req, res) => {
        var data = new Rate({
            clasId: req.params.classId,
            userId: req.decode.id,
            star: req.body.number,
        })

        data.save()
        .then(data=>{
            res.json({
                success: true,
                user: data,
            })
        })
    },

    getClass: (req, res) => {

    },

    detailClass: (req, res) => {
        var classid =  req.params.classId

        Class.findByPk(classid)
        .then((data) => {
            
        })
    },

    class: (req, res) => {

    },

    class: (req, res) => {

    },

    getCate: (req, res) => {
        Cate.findAll()
            .then((data) => {
                res.render(data);
            })

    },

    addCate: (req, res) => {
        var data = new Cate({
            name: req.body.name,
        })
        if(req.file) {
            data.img = req.file.path
        }
        data.save()
            .then((result) => {
                res.status(201).json(result)
            })
            .catch((err)=>{
                res.status(500).json(err)
            })
    },

    addTool: (req, res) => {
        var name = req.body.name
        var img = req.file.filename
        Tool.create({name: name,image: img})
            .then((result) => {
                res.json(result)
            })
            .catch((err)=>{
                res.status(500).json(err)
            })
    }, 

    getTool: (req, res) => {
        var Idclass = req.params.classId

        Cate.find({})
            .then((data) => {
                res.render(data);
            })

    },
}
