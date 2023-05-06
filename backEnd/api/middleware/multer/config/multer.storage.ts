import multer from 'multer'
import { extname } from 'path'

export const postStorage = multer.diskStorage({
    destination: (_, _file, cb) => {
        cb(null, process.cwd() + `/public/posts`)
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})