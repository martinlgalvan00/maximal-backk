import express from 'express'
import * as RecordsController from '../controllers/records.api.controllers.js'
import {isLogin, isAdmin} from '../middleware/auth.middleware.js'
//dd
const router = express.Router()

router.route('/api/records')
    .get(RecordsController.findRecords)


router.route('/api/records/:sort/:clase/:idCategory/:idSex')
    .get(RecordsController.findRecords52)



router.route('/api/records/:idRecord')
    .get(RecordsController.findByRecordId)

export default router