<h2 align="center">Teslo Site</h2>
<h3 align="center">An a side project, replica of the Tesla E-commerce</h3>
<h3 align="center">This project was created for a Next.JS course, see <a href="https://github.com/DevTalles-corp"> DevTalles </a> to create similar projects</h3>

---

## Table of Contents
1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Quick Start](#quick-start)

---

## Introduction
This project is a replica of the Tesla e-commerce site, designed to provide a similar online shopping experience to the official Tesla website. Our goal is to offer a user-friendly and attractive platform for users to explore and purchase products in a secure and efficient manner.

---

## <a name="tech-stack">Tech Stack</a>
- Typescript
- Next.js
- Next Auth
- React Hook Form
- Zustand
- TailwindCSS
- Prisma
- Postgress


----

## <a name="features">Features</a>
👉**Registration** Create an account on the website.

👉**Login** Log in to an existing account.

👉**Product View** View product details, including description, price, images, etc.

👉**Add to Cart** Add a product to the shopping cart.

👉 **View Cart** View the contents of the shopping cart.

👉 **Remove from**Cart: Remove a product from the shopping cart.

👉 **Update Quantity** Update the quantity of a product in the shopping cart.



## <a name="quick-start">Quick Start</a>

Cone this repository 

``` bash 
git clone https://github.com/andresGarcia90/teslo-shop
cd teslo-shop
```

Create a copy from .env.template or just copy these text into **.env**

``` bash 
DB_USER=dbusername
DB_PASSWORD=dbpassword
DB_NAME=teslo

# openssl rand -base64 32
AUTH_SECRET=your-secret-key

DATABASE_URL="postgresql://dbusername:dbpassword@localhost:5432/teslo?schema=public"
```

Install dependencies
```bash
npm install
```

Setting up the database with docker compose


```bash
docker compose up -d
```

Create the structure of the data base with Prisma Migrations
```bash
npx prisma migrate dev
```

Replicate the data base with Prisma Migrations
```bash
npm run seed
```

Enjoy 😎
```bash 
npm run dev
```