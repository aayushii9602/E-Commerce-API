// Importing the necessary middleware and models

import bigPromise from '../middlewares/bigPromise.js'
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

// Controller function for updating a product
export const updateProduct = bigPromise(async (req, res, next) => {
  try {
    //check if the product exist with the provided id
    const productToUpdate = await Product.findById(req.params.id)
    if (!productToUpdate) {
      return res.status(400).json({
        success: false,
        message: 'no such product found with the given id',
      })
    }
    // Destructuring request body to extract relevant information
    const { name, companyName, description, price, variants } = req.body

    // Checking if essential fields are provided in the request body
    if (!name || !companyName || !description || !price) {
      // Responding with a 400 Bad Request if required fields are missing
      res.status(400).json({
        success: false,
        error: 'bad request',
        message: 'Enter all the required fields',
      })
    }

    // Constructing a new product object based on the request body
    var newProduct
    if (variants) {
      newProduct = {
        name: req.body.name,
        companyName: companyName,
        description: description,
        price: price,
        variants: variants,
      }
    } else {
      newProduct = {
        name: req.body.name,
        companyName: companyName,
        description: description,
        price: price,
      }
    }

    // Logging the id received from the route parameters
    console.log(req.params.id)

    // Updating the product in the database using findByIdAndUpdate
    const product = await Product.findByIdAndUpdate(req.params.id, newProduct, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    })

    // Responding with a 200 OK status and the updated product information
    res.status(200).json({
      success: true,
      message: 'Updated successfully!',
      data: newProduct,
    })
  } catch (error) {
    // Logging any errors that occur during the update process
    console.log(`Error while updating a product: ${error}`)

    // Handling unexpected errors and responding with a 500 Internal Server Error
    return res.status(500).json({
      success: false,
      error: 'server error',
      message: 'Error while updating a product',
    })
  }
})

// Controller function for deleting a product based on product id
export const deleteProduct = bigPromise(async (req, res, next) => {
  try {
    // Finding the product to delete based on the provided id in the route parameters
    const productToDelete = await Product.findById(req.params.id)

    // Logging the product to be deleted (for debugging purposes)
    console.log(productToDelete)

    // Checking if the product exists
    if (!productToDelete) {
      // Responding with a 401 Unauthorized status if the product does not exist
      return res
        .status(401)
        .json({ success: false, message: 'No such product found with this id' })
    }

    // Deleting the product from the database using deleteOne
    await productToDelete.deleteOne()

    // Responding with a 200 OK status and a success message
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    })
  } catch (error) {
    // Logging any errors that occur during the delete process
    console.log(`Error while deleting a product: ${error}`)

    // Handling unexpected errors and responding with a 500 Internal Server Error
    return res.status(500).json({
      success: false,
      error: 'server error',
      message: 'Error while deleting a product',
    })
  }
})

// Controller function for retrieving all products
export const retrieveProduct = bigPromise(async (req, res, next) => {
  try {
    // Retrieving all products from the database
    const product = await Product.find()

    // Checking if any products were found
    if (!product) {
      // Responding with a 401 Unauthorized status if no products exist
      res.status(401).json({
        success: false,
        message: 'No products exist',
      })
    }

    // Responding with a 200 OK status and the retrieved products
    res.status(200).json({ success: true, product })
  } catch (error) {
    console.error(`Error while retrieving products: ${error}
    `)
    // Handling unexpected errors and responding with a 500 Internal Server Error
    return res.status(500).json({
      success: false,
      error: 'server error',
      message: 'Error while retrieving a product',
    })
  }
})

// Controller function for retrieving products with search functionality
export const searchProduct = bigPromise(async (req, res, next) => {
  try {
    // Extracting the search query from the request parameters
    const nameQuery = req.query.name
    console.log(nameQuery)

    // Defining a MongoDB query to search by product name, description, or variant name
    const searchConditions = {
      $or: [
        { name: { $regex: nameQuery, $options: 'i' } }, // Case-insensitive search for product name
        { companyName: { $regex: nameQuery, $options: 'i' } },
        { description: { $regex: nameQuery, $options: 'i' } }, // Case-insensitive search for description
        { 'variants.varName': { $regex: nameQuery, $options: 'i' } }, // Case-insensitive search for variant name
      ],
    }

    // Retrieving products based on the search query
    const products = await Product.find(searchConditions)

    // Checking if any products were found
    if (!products || products.length === 0) {
      // Responding with a 404 Not Found status if no matching products exist
      return res.status(404).json({
        success: false,
        message: 'No products found matching the search criteria',
      })
    }

    // Responding with a 200 OK status and the retrieved products
    res.status(200).json({ success: true, products })
  } catch (error) {
    console.error(`Error while searching products: ${error}`)
    res.status(500).json({
      success: false,
      error: 'server error',
      message: 'Error while searching products',
    })
  }
})
