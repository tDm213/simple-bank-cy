
# 💰 Simple Bank App CY

A full-stack TypeScript-based banking application with user authentication, database interaction using Prisma and SQLite, and end-to-end testing using Cypress.

---

## 🚀 Getting Started

### 1. 📦 Install dependencies

```bash 
npm install
```
### 2. 🗃️ Set up the database
```bash 
npx prisma generate --schema=server/prisma/schema.prisma
npx prisma migrate dev --name init --schema=server/prisma/schema.prisma
```
### 3.  🧑‍💻 Start the app in development mode
```bash 
npm run dev
```
This uses ts-node-dev to run the backend server.
### 4.  🧪 Run Cypress tests with allure reporting
```bash 
npm run test:allure
```
----
### 🔧 Scripts
```bash 
npm run dev           # Start the dev server
npm run build         # Compile TypeScript
npm run test          # Run Cypress tests
npm run test:allure   # Run tests with Allure reports
npm run allure:open   # Open Allure test report
```
### 🧪 Testing Tools
✅ Cypress – E2E testing
📊 Allure Reports – Pretty test reporting

### 🛠️ Tech Stack
Backend: Node.js, Express, Prisma, SQLite, JWT

Frontend: Vanilla TypeScript

Testing: Cypress, Allure

### 🗃️ Database
Prisma ORM with SQLite
Schema is located in server/prisma/schema.prisma

✍️ Author
Made by @tDm213