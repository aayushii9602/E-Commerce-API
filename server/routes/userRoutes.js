import express from 'express'
const router = express.Router()

import { createUser, Login } from '../controller/UserController.js'
import { createProduct } from '../controller/ProductController.js'

const PORT = process.env.PORT

router.route('/createUser').post(createUser)
router.route('/userLogin').post(Login)
router.route('/createProduct').post(createProduct)

export default router
