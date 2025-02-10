# Fullstack-e-commerce

This is a full-stack group project

## 1. Project workflow

- **Browse Categories**
- **Browse Clothes**
- **Manage a cart (also as guest until the user has to pay)**
- **Register/Login**

---

## 2. Define Core Features & User Stories

**Formula:**

- Persona + need + purpose
- I [user], need to [do something] to [achieve something]
- As a [persona], I [want to], [so that].

- _As a guest user, I want to Browse categories and clothes_
- _As a guest user, I want to add one or multiple items to my cart_
- _As a guest user, I want to remove one or multiple items from my cart_
- _As a user I want to create an account so that I can buy items_
- _As a user I want to log in and out securely_

  (Optional)

- As an admin,

---

## 3. Wireframe Planning

Before diving into the actual coding, it's helpful to sketch out a wireframe of how our app will look. Wireframes help visualize the layout and flow of the application before implementing the UI.

### Main pages and UI elements

- Homepage (Categories landing page - ex. Men, Women, Kids or Winter/summer, or )
- Sign up page
- Login page
- Search page
- Product-item page
- Cart sidebar

---

## 4. Database Schemas

#### User Schema (User.js):

```js
{
- `username`: String, required, unique
- `email`: String, required, unique
- `password`: String, required
- `address`: String
- `phone`: String
- `createdAt`: Date, default: Date.now
}
```

---

## 5. Backend API Design

### User Routes (`/users`)

| Method | Endpoint    | Description                    | Auth Required? |
| ------ | ----------- | ------------------------------ | -------------- |
| POST   | `/register` | Create a new user              | No             |
| POST   | `/login`    | Authenticate user & return JWT | No             |
| GET    | `/logout`   | Log out user                   | Yes            |

---

## 6. Thinking The Frontend Structure (React)

---

## 7. Step-by-Step Implementation Plan
