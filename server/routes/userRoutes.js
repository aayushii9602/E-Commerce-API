import express from 'express'
const router = express.Router()

import { createUser, Login } from '../controller/UserController.js'
import {
  createProduct,
  deleteProduct,
  retrieveProduct,
  searchProduct,
  updateProduct,
} from '../controller/ProductController.js'

// Defining the port using an environment variable
const PORT = process.env.PORT

router.route('/createUser').post(createUser)
router.route('/userLogin').post(Login)
router.route('/createProduct').post(createProduct)
router.route('/updateProduct/:id').put(updateProduct)
router.route('/deleteProduct/:id').delete(deleteProduct)
router.route('/retrieveProduct').get(retrieveProduct)
router.route('/searchProduct/').get(searchProduct)

export default router
