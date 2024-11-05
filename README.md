# 🍲 Food E-Commerce Platform

Welcome to the Food E-Commerce Platform! This is a powerful and responsive web application designed to streamline food ordering and delivery with a smooth user experience and a dynamic admin interface.

![Food E-Commerce Platform](/frontend/src/assets/Screenshot%202024-11-05%20151550.png)

## 📚 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Usage Guide](#usage-guide)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

---

## About

The Food E-Commerce Platform is a full-featured e-commerce application built to connect food vendors with customers effortlessly. Customers can browse through a wide selection of food items, add products to their cart, make secure payments, and track their orders. An admin dashboard allows administrators to manage products, orders, and users effectively.

## Features

- **User Authentication**: Sign up, log in, and manage user sessions with secure JWT authentication.
![Authentication](/frontend/src/assets/Screenshot%202024-11-05%20151609.png)
- **Product Browsing**: View product details, filter by category, and search for specific food items.
![Product Browsing](/frontend/src/assets/Screenshot%202024-11-05%20151647.png)
- **Cart & Checkout**: Seamlessly add items to the cart, adjust quantities, and checkout with a simple workflow.
![Cart & Checkout](/frontend/src/assets/Screenshot%202024-11-05%20151631.png)
- **Order Management**: Customers can view their order history, while admins have full control over all orders.
![Order Management](/frontend/src/assets/Screenshot%202024-11-05%20154349.png)

- **Admin Dashboard**: An interactive admin panel for managing products, categories, and user accounts.
![Admin Dashboard](/frontend/src/assets/Screenshot%202024-11-05%20153101.png)
- **Responsive UI**: Optimized for various devices, including desktop, tablet, and mobile.
![Responsive UI](/frontend/src/assets/Screenshot%202024-11-05%20153245.png)

## Tech Stack

| Layer          | Technology                         |
|----------------|------------------------------------|
| **Backend**    | Node.js, Express.js, MongoDB       |
| **Frontend**   | React.js, Vite, Axios              |
| **Admin**      | React.js, Vite                     |
| **Database**   | MongoDB                            |
| **Environment**| dotenv for configuration           |

---

## Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or above recommended)
- [MongoDB](https://www.mongodb.com/) - local or cloud instance
- [Git](https://git-scm.com/)

### Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/food-ecommerce.git
cd food-ecommerce
```

### Install Dependencies 
Each component has its own dependencies. Start by installing these:
#### Backend Installation 
```bash  
cd backend npm install
``` 
#### Frontend Installation 
```bash  
cd ../frontend npm install
```
#### Admin Installation 
```bash  
cd ../admin npm install
```
### Environment Variables 
Create an `.env` file in the `backend` directory and configure your environment variables for MongoDB, authentication, and other secrets:
```bash  
MONGO_URI=your_mongodb_connection_string 
JWT_SECRET=your_jwt_secret
 ```
## Usage Guide 
### Running the Application
To run each component, open a new terminal for each and use the following commands: 
#### Start Backend Server 
```bash 
cd backend 
npm run dev
``` 
#### Start Frontend Server 
```bash 
cd frontend
npm run dev
``` 
#### Start Admin Dashboard
```bash 
cd admin
npm run dev
``` 
### Access the Application 
* **Frontend**: `http://localhost:3000` - User-facing food ordering platform 
* **Admin Dashboard**: `http://localhost:3001` - For product and order management 
* **Backend API**: `http://localhost:5000` - REST API for frontend and admin interfaces 
## Project Structure 
Here's a quick overview of the project structure for easy navigation and contribution:
 ```bash
Food-Ecommerce/ 
├── admin/ # Admin dashboard for managing products and orders 
│ ├── src/ # Source code (React components, pages, assets) 
│ ├── public/ # Static assets for the admin dashboard 
│ ├── package.json # Admin dashboard dependencies 
│ └── vite.config.js # Vite configuration for React admin 
├── backend/ # Backend API server 
│ ├── config/ # Configuration files for database, JWT, etc. 
│ ├── controllers/ # Request handling logic 
│ ├── middleware/ # Middleware for authentication and error handling 
│ ├── models/ # Mongoose models defining MongoDB schemas 
│ ├── routes/ # API route definitions 
│ └── index.js # Main server file for Express app 
├── frontend/ # User-facing frontend application 
│ ├── src/ # Source code (React components, pages, assets) 
│ ├── public/ # Static assets for the frontend 
│ ├── package.json # Frontend dependencies 
│ └── vite.config.js # Vite configuration for React frontend 
└── README.md 
 ```
 # Project documentation


## API Endpoints
The backend API uses REST principles and provides the following routes: 
### Authentication 
* `POST /api/auth/login` - Log in user 
* `POST /api/auth/register` - Register a new user 
### Products 
* `GET /api/products` - Retrieve all products
* `GET /api/products/:id` - Get details of a specific product 
* `POST /api/products` - Create a new product (Admin only) 
* `PUT /api/products/:id` - Update a product's details (Admin only) 
* `DELETE /api/products/:id` - Remove a product from inventory (Admin only)”

### Orders 
* `POST /api/orders` - Place a new order 
* `GET /api/orders` - Retrieve all orders (Admin only)
* `GET /api/orders/:id` - Retrieve specific order details (Admin only) 
### Cart 
* `POST /api/cart/add` - Add item to cart 
* `DELETE /api/cart/remove/:id` - Remove item from cart
 * `GET /api/cart` - View current use's cart

## Contributing 
We welcome contributions from the community to help improve this platform! Please follow these steps to contribute: 
1. **Fork the repository** to your GitHub account. 
2. **Clone your fork** to your local machine. 
3. **Create a new branch** for your feature or bug fix. 
4. **Commit your changes** with clear, descriptive messages. 
5. **Push to your fork** and submit a Pull Request to the main branch.