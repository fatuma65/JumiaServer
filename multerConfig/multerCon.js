const express = require('express')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'multerConfig/uploads/')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1e8)
        // const extension = file.originalname.split('.').pop()
        const extension = path.extname(file.originalname).toLowerCase()
        cb(null, `product- ${uniqueSuffix} ${ extension}`)
    }
})

const upload = multer({storage})
module.exports = upload