# The Crimson Forge - Star Wars Themed Ecommerce Website ⚡

![the_crimson_forge_home_page.png](https://github.com/ekmin/the-crimson-forge/blob/master/public/the-crimson-forge-home.png)

## Overview 🚀

The Crimson Forge is a fictional ecommerce store specializing in Sith-themed galactic merchandise such as lightsaber crystals, artifacts, armor, and accessories.
This project blends modern web technologies with immersive UI design inspired by the Sith aesthetic. Representing power, precision, and the dark side’s distinct visual identity.

The site offers a fully functional shopping experience with authentication, cart management, checkout flow, and dynamic product rendering powered by a headless CMS.

## Brand Identity 🎨

### The Name: “The Crimson Forge”
The name reflects a fictional Sith foundry where elite weapons, artifacts, armor, and kyber-infused items are engineered.
“Crimson” symbolizes the Sith’s iconic red lightsabers, and “Forge” represents craftsmanship.

### Logo
<img src="https://github.com/ekmin/the-crimson-forge/blob/master/public/crimson-forge-logo.png" alt="crimson-forge-logo" width="200" />
This is designed to mimic the Sith eye. Symbolizing focus, intensity, and connection to the dark side.
This identity helps the store feel like a true extension of the Star Wars universe.

### Design Language

* Dark UI with black & deep-red palette
* Emphasis on glows, outlines, grids, and sharp edges
* Layout patterns inspired by Sith temples & Imperial interfaces
* Consistent themed experience across all pages

## 🚀 Features

1. Fully Functional E-Commerce Flow
    * Browse products
    * Filter by categories
    * View product details
    * Add to cart
    * Checkout(dummy) & confirm orders
    * View past orders

2. User Authentication
    * Authentication powered by Clerk
    * Protected pages like “Checkout” and “My Orders”

3. Dynamic Content via Sanity CMS
    All data is fully dynamic:
        * Products
        * Categories
        * Featured items
        * Product details and images
        * Orders
    CMS updates reflect on the frontend via GROQ queries.

4. Shopping Cart System
    * Global cart state using Zustand
    * Persistent cart via Local Storage
    * Item count, remove, and total price calculation

5. Checkout System
    Two checkout methods:
        * Cash on Delivery
        * Card (Dummy Info)

    Order is then stored in Sanity

6. Orders Dashboard
    * Authenticated users can view:
        * All their past orders
        * Order status
    * Cancel Orders

## Pages Explained ✨

1. Home Page
    * Hero banner
    * Category carousel
    * Featured products
    * All categories dynamically fetched from Sanity
    * Clicking a category filters products by query params

2. Products Page
    * Displays all products
    * Dynamic filtering using ?category= query
    * Category selector built with Shadcn select
    * Fully dynamic products using GROQ

3. Cart Page
    * Uses global Zustand store
    * Increase/decrease quantity
    * Total price display
    * Checkout button

4. Checkout Page (Protected)
    * Client-side form
    * Customer details are retrived from Sanity
    * Address & dummy payment input
    * Order creation via server action
    * After submission → redirect to success page

5. Success Page
    * Confirms order completion
    * Interactive animation
    * Revalidate the orders path

6. My Orders Page (Protected)
    * Lists all orders associated with logged-in user
    * Realtime updates using revalidatePath()
    * Cancel Order option (updates Sanity via server action)

## Tech Stack 🛠️
| Requirement  | Technology |
| -------------|-------------|
| Framework    | Next.js 16 (App Router) |
| Styling      | Tailwind CSS |
| Components   | Shadcn UI    |
| Animations      | Framer Motion |
| CMS   | Sanity.io (Content Lake + GROQ) |
| Authentication      | Clerk |
| State Management   | Zustand (Persisted) |
| Deployment  | Vercel |

## Sanity CMS Schemas 📦

* product
* category
* order
* orderItem
* blockContent

All fields are modeled to represent real product data, categories, and order details.

> Product images are taken from [Wookieepedia | Fandom](https://starwars.fandom.com/wiki/Main_Page)

## Backend (Sanity Studio) ⚙️

Here are a few views of the content management system (CMS) that powers this site.

![sanityStudio](https://github.com/ekmin/the-crimson-forge/blob/master/public/sanity-snapshots/studio-home.gif)

### Product Schema

This snapshot shows the structured fields used to define a new product.

![productSchema](https://github.com/ekmin/the-crimson-forge/blob/master/public/sanity-snapshots/productSchema.gif)

To update the fileds, all you have to do is the change the filed and click "publish".

![productSchema](https://github.com/ekmin/the-crimson-forge/blob/master/public/sanity-snapshots/productUpdate.gif)

### Category Schema

This snapshot shows the structured fields used to define a category.

![productSchema](https://github.com/ekmin/the-crimson-forge/blob/master/public/sanity-snapshots/categorySchema.gif)

### Order Schema

This snapshot shows the structured fields of a customer's order.

![productSchema](https://github.com/ekmin/the-crimson-forge/blob/master/public/sanity-snapshots/orderSchema.gif)