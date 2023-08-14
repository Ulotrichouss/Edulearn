const express = require('express')
const UserController = require("../controllers/UserController")
const ClassController = require('../controllers/ClassController')
const router = express.Router()
const checkToken = require('../middleware/checkToken.js')

const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+ path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });

router.post('/login',UserController.login)
router.post('/register',UserController.register)
router.get('/profile',checkToken,UserController.profile)

router.get('/tool/:classId',ClassController.getTool)
router.post('/tool/add',upload.single("image"),ClassController.addTool)

router.get('/cate',ClassController.getCate)
router.post('/cate/add',upload.single("image"),ClassController.addCate)

router.get('/rate/:classId',ClassController.getRate)
router.post('/rate/add/:classId',ClassController.getRate)


module.exports = router;