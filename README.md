# ImagineArt Contests

GenArena weekly creative challenges for the ImagineArt Creator Program.

## Setup

### 1. MongoDB

Create a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (or use local MongoDB) and add your connection string to `.env`:

```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/imagineart-contests?retryWrites=true&w=majority"
```

### 2. Install & Seed

```bash
npm install
npx prisma db push
npm run db:seed
```

This creates:
- **Admin**: `admin@imagineart.com` / `admin123` (change in production)
- Sample approved creators (optional test emails)
- 2 challenges (Sprint Battle, Prompt Battles)

### 3. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Auth Flows

### General Users (Creator Program)

1. User enters the email they used in the Creator Program Google Form
2. System checks if the email is in the **Approved Creators** list (admin adds these)
3. **If new**: User sets a password → account created
4. **If existing**: User enters password → logged in

Add approved emails in **Admin → Creator Program** (from your Google Form responses).

### Admin

- Login at `/admin/login` with admin email + password
- Admin credentials stored in MongoDB; create via seed or manually
- Manage challenges, view submissions, and add approved creator emails
