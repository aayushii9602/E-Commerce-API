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
I've share dthe postman invitation, you can use that or
1. RequestType: POST, URL: http://localhost:8000/api/v1/createProduct
   raw->json(enter all the details)
   example: {
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
2. 
