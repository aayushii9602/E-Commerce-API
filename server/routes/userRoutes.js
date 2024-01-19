import express from 'express'
const router = express.Router()

import { createUser, Login } from '../controller/UserController.js'
import {
  createProduct,
  deleteProduct,
  retrieveProduct,
  updateProduct,
} from '../controller/ProductController.js'

const PORT = process.env.PORT

router.route('/createUser').post(createUser)
router.route('/userLogin').post(Login)
router.route('/createProduct').post(createProduct)
router.route('/updateProduct/:id').put(updateProduct)
router.route('/deleteProduct/:id').delete(deleteProduct)
router.route('/retrieveProduct').get(retrieveProduct)

export default router
