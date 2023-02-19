const multer = require('multer');
const moment = require( 'moment');

const storageConfig = multer.diskStorage({
    destination(req, file, cb){
     cb(null, 'assets')
    },
    filename(req, file, cb){
        const  date = moment().format('DDMMYYYY-HHmmss SSS')
         cb(null, `${date}-${file.originalname}`)
    }
})

const fileFilterConfig = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
        cb(null, true)
    }else {
        cb(null, false)
    }
}

const limitsFile = {
    fileSize: 1024 * 1024 * 5
}

module.exports = multer({
    storage:storageConfig,
    fileFilter:fileFilterConfig,
    limits:limitsFile,
    dest: "assets/"
})