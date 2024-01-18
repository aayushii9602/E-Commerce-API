// Importing the Mongoose library
import mongoose from 'mongoose'

// Defining the schema for the 'Product' model
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // Name of the company associated with the product
  companyName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // Variants of the product, represented as an array of objects
  variants: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        varName: {
          type: 'string',
        },
        sku: {
          // Stock Keeping Unit (SKU) for the variant
          type: 'string',
        },
        additional_cost: {
          // Additional cost for the variant compared to the base product cost
          type: 'number',
          minimum: 0,
        },
        stock_count: {
          type: 'integer',
          minimum: 0,
        },
      },
      required: ['varName', 'sku', 'additional_cost', 'stock_count'],
    },
    minItems: 1,
  },
})

const Product = mongoose.model('product', productSchema)
export default Product
