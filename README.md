E-commerce API
A Node.js-based e-commerce API built for an internship assignment, deployable on Vercel.
Features

User authentication with JWT
Role-based access (customer and admin)
Product listing with pagination and search
Cart management (add, update, remove items)
Order creation
Basic HTML frontend for interaction

Prerequisites

Node.js (>=14.0.0)
MongoDB Atlas account (or local MongoDB for local testing)
Vercel account for deployment
Git

Setup Instructions
Local Development

Clone the repository:git clone <repository-url>
cd ecommerce-api


Install dependencies:npm install


Create a .env file based on .env.example:cp .env.example .env

Update .env with your MongoDB URI and a secure JWT secret.
Run locally:npm run dev


Access at http://localhost:3000.

Vercel Deployment

Push the repository to GitHub.
Log in to Vercel and create a new project.
Import the GitHub repository.
Configure environment variables in Vercel:
MONGO_URI: Your MongoDB Atlas connection string
JWT_SECRET: A secure secret key


Deploy the project.
Access the deployed URL provided by Vercel.

API Endpoints

POST /api/auth/register: Register a new user
POST /api/auth/login: Login and receive JWT
GET /api/products?page=&limit=&search=&category=: List products with pagination and search
POST /api/products: Create product (admin)
DELETE /api/products/:id: Delete product (admin)
GET /api/cart: Get user cart
POST /api/cart/add: Add item to cart
PUT /api/cart/update: Update cart item quantity
DELETE /api/cart/remove/:productId: Remove item from cart
POST /api/orders: Create order
GET /api/orders: View all orders (admin)

Notes

Ensure MongoDB Atlas is configured with network access to allow Vercel's IP range.
The frontend is a simple HTML page for testing; it assumes the API is hosted at the same domain.
Use a strong JWT_SECRET for production.

