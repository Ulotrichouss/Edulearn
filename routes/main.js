const express = require('express')
const UserController = require('../controllers/UserController')
const ClassController = require('../controllers/ClassController')
const router = express.Router()
const checkToken = require('../middleware/checkToken.js')

const multer = require('multer')
const path = require('path')

const storageImg = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+ path.extname(file.originalname))
    }
})

const storageFile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/files')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+ path.extname(file.originalname))
    }
})

const uploadImg = multer({ storage: storageImg })
const uploadFile = multer({ storage: storageFile })

router.post('/login',UserController.login)
router.post('/register',UserController.register)
router.post('/logout',UserController.logout)
router.get('/profile',checkToken,UserController.profile)
router.put('/profile/update',checkToken,UserController.putProfile)
router.put('/user/update/:userId',checkToken,UserController.putUser)
router.delete('/user/delete/:userId',checkToken,UserController.deleteUser)

router.get('/tool',ClassController.getTool)
router.post('/tool/add',uploadImg.single("image"),ClassController.addTool)
router.put('/tool/update/:toolId',uploadImg.single("image"),ClassController.putTool)
router.delete('/tool/delete/:toolId',ClassController.deleteTool)

router.get('/cate',ClassController.getCate)
router.post('/cate/add',uploadImg.single("image"),ClassController.addCate)
router.put('/cate/update/:cateId',uploadImg.single("image"),ClassController.putCate)
router.delete('/cate/delete/:cateId',ClassController.deleteCate)

router.get('/rate/:classId',ClassController.getRate)
router.post('/rate/add/:classId',checkToken,ClassController.getRate)
router.put('/rate/update/:rateId',checkToken,ClassController.putRate)
router.delete('/rate/delete/:rateId',ClassController.deleteRate)

router.get('/class',ClassController.getAllClass)
router.post('/class/add',checkToken,ClassController.addClass)
router.get('/class/:classId',ClassController.detailClass)
//router.put('/class/update/:classId',ClassController.putClass)
//router.delete()     

router.get('/lesson/:classId',ClassController.getLesson)
router.post('/lesson/add/:classId',uploadFile.single("file"),ClassController.addLesson)
router.put('/lesson/update/:lessonId',ClassController.putLesson)
router.delete('/lesson/delete/:lessonId',ClassController.deleteLesson)

module.exports = router;