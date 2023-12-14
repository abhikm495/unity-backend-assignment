Instructions to run the project:

npm i {install all pacakges}
please make sure to create a .env file and add the following variables:

MONGO_URL=mongodb+srv://username:<password>@cluster0.l4dludr.mongodb.net/ecommerceunity  {provide you mongoDB cluster URL here}

PORT=8080

JWT_SECRET=This is the secret password

Instruction to test all the routes,you can use https://www.postman.com/ to test all the routes locally

Below are all the APIs:

Auth APIs:
1) Register-Post Method (http://localhost:8080/api/auth/register)

  make sure to provide "name","email","password", and "role" ,if a user wants to register as a seller,
  he has to provide role as Number 1,if user wants to register as buyer he must provide role as Number 0 or nothing,default role will be 0.

  Example-register as buyer -{
    "name":"buyer1",
    "email":"buyer1@gmail.com",
    "password":"buyer1"
}

register as seller -{
    "name":"seller1",
    "email":"seller1@gmail.com",
    "password":"seller1",
    "role":1,
}

2) Login-Post Method (http://localhost:8080/api/auth/login)

  provide correct "email" and "password" to login.

Example-{
    "email":"buyer1@gmail.com",
    "password":"buyer1"
}

APIs for buyers:

1) List of sellers-Get Method (http://localhost:8080/api/buyer/list-of-sellers)

  make a Authorization key in the header and provide valid token of a BUYER,You can get token when you login.only buyers can access the list of sellers.

3) Catalog of seller-Get Method (http://localhost:8080/api/buyer/seller-catalog/:sellerId)

  You can get the seller id of seller by the list of sellers api above.

5) Create Order-Post Method (http://localhost:8080/api/buyer/create-order/:sellerId)

  provide correct sellerId to create order to that specific seller and write the products which are present in the catalog of that seller or order will not be accepted

Example-{
    "products":[
        {"name":"bat"}
    ]
}

APIs for sellers

1)Create Catalog-Post Method (http://localhost:8080/api/seller/create-catalog)

  You should be signed in as a seller by providing authenticatoin token in the header to create a catalog

  Example-{
    "products":[
        {"name":"bottle"},
        {"name":"shirt"}
    ]
}

2)Add products to Catalog-Post Method (http://localhost:8080/api/seller/add-product)

  Add more products to seller's Catalog

   Example-{
    "products":[
        {"name":"laptop"},
        {"name":"table"}
    ]
}

3)Retreive the Orders-Get Method (http://localhost:8080/api/seller/orders)

  Get all the orders received to the logged in seller 
  




