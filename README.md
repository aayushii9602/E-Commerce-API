## brief about the project:
This project involves the development of a robust REST API for an e-commerce system, implemented using Node.js, Express, and MongoDB. The API provides essential functionalities for managing products and their variants, along with a powerful search mechanism.

## basic requirements
1. code-editor(vsCode)
2. postman
3. mongoDb compass

## important dependencies to install
1. npm init
2. indtall all the dependecies from package.json file(
3. bcryptjs body-parser cookie-parser crypto dotenv express jsonwebtoken mongoose morgan nodemon password-validator validator

## How to Run the Project
1. Pull the Repository:
git clone <repository_url>// pull the master branch
2. Navigate to the Server Folder:
cd server
3. Run the Project:
nodemon index
The project will start running, and you can access the API endpoints accordingly.

## how to interact with the API
### instruction:
-  Ensure that the server is up and running. Start the server by executing the appropriate command (`nodemon index`).
-  Ensure that the MongoDB database is accessible and properly configured.
- Verify the connection settings in the server code, particularly the MongoDB connection URL.
- Be aware of the HTTP methods required for specific operations (e.g., POST for creating, GET for retrieving, DELETE for deleting).
I've share dthe postman invitation, you can use that or
## Create Product

### Request Type

- **POST**

### URL

- http://localhost:8000/api/v1/createProduct

### Request Body

- Format: JSON
- Example:
  ```json
  {
    "name": "Laptop backpack",
    "companyName": "gear-up",
    "description": "Durable and stylish laptop backpack with multiple compartments with amazing colors",
    "price": 49.99,
    "variants": [
      {
        "varName": "15-inch",
        "sku": "GU456-15",
        "additional_cost": 5.00,
        "stock_count": 40
      },
      {
        "varName": "17-inch",
        "sku": "GU456-17",
        "additional_cost": 8.50,
        "stock_count": 30
      }
    ]
  }
## Update Product

### Request Type

- **PUT**

### URL

- http://localhost:8000/api/v1/updateProduct/:id

### Request Body

- Format: JSON
- Example:
  ```json
  {
    "name": "Updated Laptop backpack",
    "companyName": "new-gear-up",
    "description": "Updated and improved laptop backpack with additional features",
    "price": 59.99,
    "variants": [
      {
        "varName": "15-inch",
        "sku": "GU456-15",
        "additional_cost": 5.00,
        "stock_count": 40
      },
      {
        "varName": "17-inch",
        "sku": "GU456-17",
        "additional_cost": 8.50,
        "stock_count": 30
      }
    ]
  }
## Delete Product

### Request Type

- **DELETE**

### URL

- http://localhost:8000/api/v1/deleteProduct/:id

### Example

- Delete an existing product identified by the product ID.
## Retrieve Products

### Request Type

- **GET**

### URL

- http://localhost:8000/api/v1/retrieveProduct
## Search Products

### Request Type

- **GET**

### URL

- http://localhost:8000/api/v1/searchProduct?name=TechZone

### Example

- Search for products by name, specifically products containing the term "TechZone".

## Architecture and Design Decisions
- Microservices Architecture:
The application is designed with a microservices architecture to ensure scalability and independent deployment of services.
- Database:
MongoDB is chosen as the database for its flexibility and scalability, suitable for storing product and variant data.
- Backend:
Node.js and Express are used for the backend, providing a fast and scalable server environment.
- Schema:
The MongoDB schema defines the structure of a product, including its name, company name, description, price, and variants.

## Integration testing
- Run the server using `nodemon index.js`
- in a new terminal, run `node testing.js` to run the testing file.
