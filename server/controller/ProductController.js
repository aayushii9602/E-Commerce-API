// Importing the necessary middleware and models

import bigPromise from '../middlewares/bigPromise.js'
import User from '../models/user.js'
import Product from '../models/product.js'

// Create Product
export const createProduct = bigPromise(async (req, res, next) => {
  try {
    // Destructuring required fields from the request body
    const { name, companyName, description, price, variants } = req.body

    // Validation: Check if required fields for both product are provided
    if (!name || !companyName || !description || !price) {
      res.status(400).json({
        success: true,
        error: 'bad request',
        message: 'Enter all the required fields',
      })
    }

    // Check if a product with the same name and company name already exists in the database
    const existingProduct = await Product.findOne({ name, companyName })
      .lean()
      .catch((error) => {
        console.log(`erroe which chekcing for existing Product: ${error}`)
      })

    // If an existing product is found, return an error response
    if (existingProduct) {
      return res.status(500).json({
        success: true,
        message:
          'the product with provied name and company-name already exists, kindly edit',
      })
    }

    // If variants are not provided, create a product without variants
    if (!variants) {
      const newProduct = await Product.create({
        name: req.body.name,
        companyName: req.body.companyName,
        description: req.body.description,
        price: req.body.price,
      })
    }
    // If variants are provided, create a product with variants
    else {
    }
    const newProduct = await Product.create({
      name: req.body.name,
      companyName: req.body.companyName,
      description: req.body.description,
      price: req.body.price,
      variants: req.body.variants,
    })

    return res.status(200).json({
      success: true,
      message: 'Product added into the database sucesssfully',
      newProduct,
    })
  } catch (error) {
    console.log(`Error while creating a product: ${error}`)

    // Handling unexpected errors
    return res.status(500).json({
      success: false,
      error: 'server error',
      message: 'Error while creating a product',
    })
  }
})

//delete the details of the product based on
