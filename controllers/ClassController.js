const Cate = require('../models/Categories.js')
const Tool = require('../models/Tools.js')
const Class = require('../models/Class.js')
const Rate = require('../models/Rates.js')
const Lesson = require('../models/Lesson.js')

module.exports = {

    // [GET] /lesson/:classId
    getLesson: (req, res) => {
        let id = req.params.classId

        Lesson.findAll({classId: id})
        .then((data)=>{
            res.json(data)
        })
    },

    // [POST] /lesson/add/:classId
    addLesson: (req, res) => {
        var data = new Lesson({
            classId: req.params.classId,
            name: req.body.name,
            file: req.file.filename,
        })

        data.save().then((rs)=>{
            res.json({
                success: true,
                data: rs,
            })
        })
    },

    putLesson: (req, res) => {
        let id = req.params.lessonId
        let data = { 
            name:req.body.name,
            userId:req.body.userId 
        }

        if(req.file) {
            data.image = req.file.filename
        }

        Lesson.findByIdAndUpdate(id,data)
            .then((data) => {
                res.status(201).json({
                    msg: 'Update success'
                })
            })
            .catch((err)=>{
                res.status(500).json(err)
            })
    },

    deleteLesson: (req, res) => {
        let id = req.params.lessonId

        Lesson.findByIdAndDelete(id)
            .then((data) => {
                res.status(201).json({
                    msg: 'Delete success'
                })
            })
            .catch((err)=>{
                res.status(500).json(err)
            })
    },

    // [GET] /rate/:classId
    getRate: (req, res) => {
        let classId = req.params.classId

        Rate.find({classId: classId})
        .then((data)=> {
            res.json(data)
        })

    },

    // [POST] /rate/add/:classId
    addRate: (req, res) => {
        var data = new Rate({
            classId: req.params.classId,
            userId: req.decode,
            star: req.body.number,
        })

        data.save()
        .then(data=>{
            res.json({
                success: true,
                data: data,
            })
        })
    },

    putRate: (req, res) => {
        let id = req.params.rateId
        var data = {
            star: req.body.number,
            userId: req.decode
        }

        Rate.findByIdAndUpdate(id,data)
            .then((data) => {
                res.status(201).json({
                    msg: 'Update success'
                })
            })
            .catch((err)=>{
                res.status(500).json(err)
            })
    },

    deleteRate: (req, res) => {
        let id = req.params.rateId

        Rate.findByIdAndDelete(id)
            .then((data) => {
                res.status(201).json({
                    msg: 'Delete success'
                })
            })
            .catch((err)=>{
                res.status(500).json(err)
            })
    },

    getAllClass: (req, res) => {

        Class.find({})
        .populate('tool')
            .then((data) => {
                res.json(data);
            })
    },

    // [POST] /class/add
    addClass: (req, res) => {
        //push item keypoint,benefit to array
        const {keypoint,benefit,tool} = req?.body
        const arrayK = [...keypoint]
        const arrayB = [...benefit]
        const arrayT = [...tool]
            
        const data = new Class({
            author : req.decode,
            video : req.files.video[0].filename,
            title : req.body.title,
            intro :  req.body.intro,
            about : req.body.about,
            image : req.files.image[0].filename,
            keypoint: arrayK,
            benefit : arrayB,
            tool : arrayT,
            price : req.body.price
        })

        // data.save()
        // .then((result) => {
        //     res.status(201).json(result)
        // })
        // .catch((err)=>{
        //     res.status(500).json(err)
        // })

        res.json(data)
    },

    putClass: (req, res) => {
        let id = req.params.classId
        
        const {keypoint,benefit,tool} = req?.body
        const {arrayK,arrayB,arrayT} = []
        
        var data = {
            title : req.body.title,
            intro :  req.body.intro,
            about : req.body.about,           
            price : req.body.price
        }

        if(req.file) {
            data.image = req.file.image[0].filename
            data.video = req.file.video[0].filename
        }

        if(keypoint,benefit,tool !== null) {
            arrayK = [...keypoint]
            arrayB = [...benefit]
            arrayT = [...tool]

            data.keypoint = arrayK
            data.benefit = arrayB
            data.tool = arrayT
        }

        Class.findByIdAndUpdate(id,data)
        //.populate('tool')
        .then((data) => {
            res.json(data);
        })
        
    },

    deleteClass: (req, res) => {
        let id = req.params.classId

        Class.findByIdAndDelete(id)
        .then((data) => {
            res.status(201).json({
                msg: 'Delete success'
            })
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
    },

    // [GET] /class/:classId
    detailClass: (req, res) => {
        let id = req.params.classId

        Class.find({_id: id})
        .populate('tool')
            .then((data) => {
                res.json(data);
            })
    },

    // [GET] /cate
    getCate: (req, res) => {
        Cate.find({})
            .then((data) => {
                res.status(201).json(data);
            })
    },

    // [POST] /cate/add
    addCate: (req, res) => {
        let name = req.body.name
        let img = req.file.filename

        Cate.create({name: name,image: img})
            .then((result) => {
                res.status(201).json(result)
            })
            .catch((err)=>{
                res.status(500).json(err)
            })
    },

    putCate: (req, res) => {
        let id = req.params.cateId
        let data = { name:req.body.name }

        if(req.file) {
            data.image = req.file.filename
        }

        Cate.findByIdAndUpdate(id,data)
            .then((data) => {
                res.status(201).json({
                    msg: 'Update success'
                })
            })
            .catch((err)=>{
                res.status(500).json(err)
            })
    },

    deleteCate: (req, res) => {
        let id = req.params.cateId

        Cate.findByIdAndDelete(id)
            .then((data) => {
                res.status(201).json({
                    msg: 'Delete success'
                })
            })
            .catch((err)=>{
                res.status(500).json(err)
            })
    },

    // [GET] /tool
    getTool: (req, res) => {
        Tool.find({})
            .then((data) => {
                res.json(data);
            })

    },

    // [POST] /tool/add
    addTool: (req, res) => {
        let name = req.body.name
        let img = req.file.filename

        Tool.create({name: name,image: img})
            .then((result) => {
                res.json(result)
            })
            .catch((err)=>{
                res.status(500).json(err)
            })
    }, 

    putTool: (req, res) => {
        let id = req.params.toolId
        let data = { name:req.body.name }

        if(req.file) {
            data.image = req.file.filename
        }

        Tool.findByIdAndUpdate(id,data)
            .then((data) => {
                res.status(201).json({
                    msg: 'Update success',
                })
            })
            .catch((err)=>{
                res.status(500).json(err)
            })
    },

    deleteTool: (req, res) => {
        let id = req.params.toolId

        Tool.findByIdAndDelete(id)
            .then((data) => {
                res.status(201).json({
                    msg: 'Delete success'
                })
            })
            .catch((err)=>{
                res.status(500).json(err)
            })
    },

}
