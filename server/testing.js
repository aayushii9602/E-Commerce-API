const createProductURL = 'http://localhost:8000/api/v1/createProduct'
const retrieveProductURL = 'http://localhost:8000/api/v1/retrieveProduct'
const searchProductURL = 'http://localhost:8000/api/v1/searchProduct'
const updateProductUrl = 'http://localhost:8000/api/v1/updateProduct/:id'
const deleteURL = 'http://localhost:8000/api/v1/deleteProduct/yourProductId'
const productId = '65a98b31c3c90f58cb9a39d9' //

// Make a GET request
fetch(createProductURL)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error))

//CREATE
// Make a POST request with JSON data
const postData = {
  name: 'Laptop backpack',
  companyName: 'gear-up',
  description:
    'Durable and stylish laptop backpack with multiple compartments with amazing colors',
  price: 49.99,
  variants: [
    {
      varName: '15-inch',
      sku: 'GU456-15',
      additional_cost: 5.0,
      stock_count: 40,
    },
    {
      varName: '17-inch',
      sku: 'GU456-17',
      additional_cost: 8.5,
      stock_count: 30,
    },
  ],
}

fetch(createProductURL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(postData),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error))

//RETRIEVE
// Make a GET request to retrieve Product
fetch(retrieveProductURL)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error))

//SEARCH
// Define your search parameters
const searchParams = new URLSearchParams({
  name: 'TechZone', //your search criteria
})

// Combine the URL with the search parameters
const fullSearchUrl = `${searchProductURL}?${searchParams.toString()}`

// Make a GET request to search a product
fetch(fullSearchUrl)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error))

//UPDATE
const updateData = {
  name: 'Updated Product Name',
  companyName: 'Updated Company Name',
  description: 'Updated Product Description',
  price: 29.99,
  variants: [
    {
      varName: 'Updated Variant 1',
      sku: 'UV123',
      additional_cost: 3.5,
      stock_count: 25,
    },
    // Add more variants as needed
  ],
}

// Make a PUT request to upadte a product
fetch(`${updateProductUrl}/${productId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(updateData),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error))

//DELETE

// Make a DELETE request for delteting a product
fetch(deleteURL, {
  method: 'DELETE',
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error))
