const express = require('express')
const UserController = require('../controllers/UserController')
const ClassController = require('../controllers/ClassController')
const router = express.Router()
const checkToken = require('../middleware/checkToken.js')

const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/files')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+ path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

//route User
router.post('/login',UserController.login)
router.post('/register',UserController.register)
router.post('/logout',checkToken,UserController.logout)
router.get('/profile',checkToken,UserController.profile)
router.put('/profile/update',checkToken,UserController.putProfile)
router.put('/user/update/:userId',checkToken,UserController.putUser)
router.delete('/user/delete/:userId',checkToken,UserController.deleteUser)

//route Tool
router.get('/tool',ClassController.getTool)
router.post('/tool/add',upload.single("image"),ClassController.addTool)
router.put('/tool/update/:toolId',upload.single("image"),ClassController.putTool)
router.delete('/tool/delete/:toolId',ClassController.deleteTool)

//route Cate
router.get('/cate',ClassController.getCate)
router.post('/cate/add',upload.single("image"),ClassController.addCate)
router.put('/cate/update/:cateId',upload.single("image"),ClassController.putCate)
router.delete('/cate/delete/:cateId',ClassController.deleteCate)

//route Rate
router.get('/rate/:classId',ClassController.getRate)
router.post('/rate/add/:classId',checkToken,ClassController.getRate)
router.put('/rate/update/:rateId',checkToken,ClassController.putRate)
router.delete('/rate/delete/:rateId',ClassController.deleteRate)

//route Class
router.get('/class',ClassController.getAllClass)
router.post('/class/add',checkToken,upload.fields([{
    name: 'image', maxCount: 1
  }, {
    name: 'video', maxCount: 1
  }]),ClassController.addClass)
router.get('/class/:classId',ClassController.detailClass)
router.put('/class/update/:classId',upload.fields([{
    name: 'image', maxCount: 1
  }, {
    name: 'video', maxCount: 1
  }]),ClassController.putClass)
router.delete('/class/delete/:classId',ClassController.deleteClass)     

//route Lesson
router.get('/lesson/:classId',ClassController.getLesson)
router.post('/lesson/add/:classId',upload.single("file"),ClassController.addLesson)
router.put('/lesson/update/:lessonId',ClassController.putLesson)
router.delete('/lesson/delete/:lessonId',ClassController.deleteLesson)

module.exports = router;