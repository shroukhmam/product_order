# 🛒 E-commerce Product & Order System

A full-stack Laravel + React app to manage products, orders, cart, and authentication.

---
### 🧾 Product Endpoints
- `GET /api/products` → List products (supports filters like name, price, category)
- `GET /api/products/{id}` → product details 

### 🔐 Auth Endpoints
- `POST /api/login` → Login with email & password
- `POST /api/logout` → Logout user

### 🛒 Order Endpoints
- `POST /api/orders` → Submit an order with list of products
- `GET /api/orders/{id}` → order details 


#### Setup Instruction
### 🔧 Backend (Laravel)
1. Clone the repo
2. Run `composer install`
3. Setup `.env` cp
4. Run migrations: `php artisan migrate --seed`
5. Start server: `php artisan serve`

### 💻 Frontend (React + Vite)
1. Run `npm install`
2. Start dev server: `npm run dev`


### 🔐 Authentication Flow (using Laravel Sanctum)
- User logs in via `POST /api/login` with email/password
- Server returns a token
- React saves token in localStorage

### Email : test1@example.com
### password :123

### Time Tracking
Estimated time: I estimated 2 days to complete the task.
Actual time taken: It took exactly 2 days to finish.
Additional notes: I prioritized writing clean, maintainable, and well-documented code over rushing to finish early. I also made sure to handle edge cases properly, which helped deliver a more reliable solution.






