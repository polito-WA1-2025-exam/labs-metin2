# Surplus Food Application: To-Do List

Below is a high-level plan for the next development steps, aligned with the SurplusFood.md and LabRequirements.md requirements, as well as the good practices established so far.

---

## 1. Database Refinements

- [x] **Add/Create Scripts** for each major resource (Bags, Users, Reservations, etc.):
  - `createTables.js` (in `server/db/`) for each new table schema.
  - `populateData.js` to insert essential test data.

**Why?**  
So we can store and retrieve real information (bags, reservations, user accounts).

---

## 2. DAO Layer

- [x] **Bag DAO** (`bagDao.js` in `server/dao/`)
  - `listBags()`, `getBag(id)`, etc.
- [ ] **User DAO** (`userDao.js` in `server/dao/`)
  - `getUserByUsername()`, `verifyCredentials()`, etc.
- [ ] **Reservation DAO** (`reservationDao.js`)
  - `createReservation()`, `deleteReservation()`, `listUserReservations()`, etc.

**Why?**  
Keep all database queries in a clear, modular structure.

---

## 3. Routes and Controllers

- [ ] **Bags Router** (`routes/bags.js`):
  - `GET /api/bags` → fetch all bags
  - `GET /api/bags/:id` → get specific bag
  - Possibly `POST /api/bags` for adding new ones, if needed
- [ ] **Reservations Router** (`routes/reservations.js`)
  - `POST /api/reservations` → confirm a shopping cart
  - `DELETE /api/reservations/:id` → remove a reservation
- [ ] **User/Authentication**:
  - Might combine into `routes/auth.js` or `routes/users.js`
  - `POST /api/login`
  - `POST /api/logout`
  - `GET /api/session` → to check current user

**Why?**  
So the client can call distinct endpoints, each dedicated to a resource or feature, ensuring a structured API.

---

## 4. Authentication with Passport

- [ ] **Setup Passport** in `server/index.js` (or a dedicated `auth.js`):
  - `passport.initialize()`, `passport.session()`
  - Configure `passport-local` strategy to handle login credentials
- [ ] **Session Management**:
  - Use `express-session` or equivalent
  - Potentially store session in SQLite or in-memory during development

**Why?**  
To manage user login, logout, daily bag reservations, etc., in line with SurplusFood.md.

---

## 5. Client-Side Reorganization

- [ ] **Create an `api/` folder** under `client/src/`:
  - Move `api.js` → `establishmentApi.js` inside `api/`
  - Add `bagApi.js`, `authApi.js`, etc.
- [ ] **Refactor** React components to import from the new `api/` files
- [ ] **Pages and Components**:
  - **Bags Page**: show a list of available bags, allow adding them to a cart
  - **Establishments Page**: display store info
  - **Cart/Reservations Page**: show user’s selected bags, handle removal, finalizing, etc.
  - **Login Page**: for user authentication

**Why?**  
To maintain a clean, scalable front-end as the number of API endpoints grows.

---

## 6. Application Logic

- [ ] **Reservation Flow**:
  - Validate bag availability (surprise vs. regular)
  - Ensure user can reserve only one bag per establishment per day
  - Handle partial unavailability on confirmation (auto-cancel, highlight the unavailable)
- [ ] **Bag Inventory**:
  - Decrement or mark as reserved when a user confirms
  - Make it available again if a reservation is deleted

**Why?**  
Central feature of SurplusFood.md is the “daily limit” and “bag states,” so we need logic to handle it.

---

## 7. Testing and Debugging

- [ ] **Unit Tests** for DAO functions (optional but recommended)
- [ ] **Integration Tests** for Express routes (using Postman, Insomnia, or automated frameworks like `jest` + `supertest`)
- [ ] **Frontend Testing**:
  - Basic checks with React Testing Library or manual browser testing
  - Confirm data flows from API calls into components correctly

**Why?**  
Ensure stability and correctness as features grow.

---

## 8. Documentation and README

- [ ] **Update `README.md`** in the project root:
  - Summarize how to run the server and client
  - Document all current routes and their parameters
  - Show any database tables, columns, and relationships
- [ ] **Add Screenshots** or usage examples if relevant

**Why?**  
Meets LabRequirements.md for project structure and clarity.

---

## 9. Further Enhancements (Optional / Future)

- [ ] **Daily Cron** to reset certain states or send notifications if needed
- [ ] **Payments** integration if the lab eventually expands to that
- [ ] **Redis** or advanced caching if needed for performance

---
