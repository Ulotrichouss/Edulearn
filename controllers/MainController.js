const Cate = require('../models/Categories.js')
const Tool = require('../models/Tools.js')
const Class = require('../models/Class.js')
const Lesson = require('../models/Lesson.js')
const Group = require('../models/Groups.js')

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
        let data = new Lesson({
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
    getRating: (req, res) => {
        let classId = req.params.classId

        Class.findById(classId)
        .then((data)=> {
            let count = data.rating.length
            res.json({
                data,
                count
            })
        })
    },

    // [POST] /rate/add/:classId
    changeRating: async (req, res) => {
        const user = req.decode
        const {star} = req?.body
        const {classId} = req?.params

        try {
            const data = await Class.findById(classId)
            let rate = data.rating
            const check = rate.find((r) => r.userId == user)
            if(check) {
                const updateRating = await Class.updateOne(
                    { "rating.userId":user},
                    { $set: {"rating.$.star": star}},
                    { new: true }
                )
            } else {
                const createRating = await Class.findByIdAndUpdate( classId,
                    {$push: {rating: {star: star, userId: user}}},
                    {safe: true, upsert: true}
                )
            }

            const getRating = await Class.findById(classId)
            let totalRating = getRating.rating.length
            let ratingSum = getRating.rating
                .map((item) => item.star)
                .reduce((prev, curr) => prev + curr, 0)
            let rating = Math.round(ratingSum / totalRating)
            let final = await Class.findByIdAndUpdate(classId,
                { totalRating: rating },
                { new: true }
            )
            res.json(final)
        } catch (error) {
            res.json(error)
        }

    },

    // deleteRate: async (req, res) => {
    //     let id = req.params.rateId

    //     const getData = await Class.find({'rating._id':id})
    // },

    getAllClass: (req, res) => {

        Class.find({})
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
            //video : req.files.video[0].filename,
            title : req.body.title,
            intro :  req.body.intro,
            about : req.body.about,
            image : req.files.image[0].filename,
            keypoint: arrayK,
            benefit : arrayB,
            tool : arrayT,
            price : req.body.price
        })

        data.save()
        .then((result) => {
            res.status(201).json(result)
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
    },

    putClass: (req, res) => {
        let id = req.params.classId
        
        const {keypoint,benefit,tool} = req?.body
        const {arrayK,arrayB,arrayT} = []
        
        let data = {
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

    getGroup: (req, res) => {
        Group.find({})
            .then((data) => {
                res.json(data);
            })
    },

    addGroup: (req, res) => {
        let data = new Group({
            name : req.body.name,
            image : req.file.filename,
            include: req.body.include.map(skill => {
                return {
                    classId: skill.classId,
                    level: skill.level
                }
            })
        })
        data.save()
        res.json(data)
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

    registerClass: async (req, res) => {
        const user = req.decode
        const {classId} = req?.params
        try {
            const data = await Class.findById(classId)
            const check = data.register.find((r) => r == user)
            if(check) {
                const deleteRegister = await Class.findByIdAndUpdate( classId,
                    {$pull: {register: {$in:[user]}}},
                    {new: true}
                )
            } else {
                const createRegister = await Class.findByIdAndUpdate( classId,
                    {$push: {register: user}},
                    {safe: true, upsert: true}
                )
            }

            let getRegister = await Class.findById(classId)
            res.json(getRegister)
        } catch (error) {
            res.json(error)
        }

    },

}
