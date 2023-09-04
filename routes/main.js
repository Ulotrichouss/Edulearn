const express = require('express')
const UserController = require('../controllers/UserController')
const MainController = require('../controllers/MainController')
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
router.get('/tool',MainController.getTool)
router.post('/tool/add',upload.single("image"),MainController.addTool)
router.put('/tool/update/:toolId',upload.single("image"),MainController.putTool)
router.delete('/tool/delete/:toolId',MainController.deleteTool)

//route Cate
router.get('/cate',MainController.getCate)
router.post('/cate/add',upload.single("image"),MainController.addCate)
router.put('/cate/update/:cateId',upload.single("image"),MainController.putCate)
router.delete('/cate/delete/:cateId',MainController.deleteCate)

//route Rate
router.get('/rate/:classId',MainController.getRate)
router.post('/rate/add/:classId',checkToken,MainController.addRate)
router.put('/rate/update/:rateId',checkToken,MainController.putRate)
router.delete('/rate/delete/:rateId',MainController.deleteRate)

//route Class
router.get('/class',MainController.getAllClass)
router.post('/class/add',checkToken,upload.fields([{
    name: 'image', maxCount: 1
  }, {
    name: 'video', maxCount: 1
  }]),MainController.addClass)
router.get('/class/:classId',MainController.detailClass)
router.put('/class/update/:classId',upload.fields([{
    name: 'image', maxCount: 1
  }, {
    name: 'video', maxCount: 1
  }]),MainController.putClass)
router.delete('/class/delete/:classId',MainController.deleteClass)  

router.post('/class/register/:classId',checkToken, MainController.registerClass)

//route Group
router.get('/group',MainController.getGroup)
router.post('/group/add',upload.single("image"),MainController.addGroup)
//route Lesson
router.get('/lesson/:classId',MainController.getLesson)
router.post('/lesson/add/:classId',upload.single("file"),MainController.addLesson)
router.put('/lesson/update/:lessonId',MainController.putLesson)
router.delete('/lesson/delete/:lessonId',MainController.deleteLesson)

module.exports = router;