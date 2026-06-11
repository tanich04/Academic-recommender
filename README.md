# Academic Pathway Recommendation Engine

A modern web application that collects user academic/professional profiles, generates personalized pathway recommendations (Certification Program, DBA, PhD, Honorary Doctorate) using a hybrid AI + rule-based engine, stores submissions in Supabase, and provides an admin view of all entries.

---

## Features

- **User Form** – Collects name, email, qualification, experience, profession, and career goal.
- **Smart Recommendation Engine** – Primary: Groq AI (LLaMA 3) API; Fallback: deterministic rule-based logic.
- **Database Storage** – All submissions saved to Supabase with timestamp.
- **Admin View** – `/submissions` page displays all entries (no auth required).
- **Dark / Light Mode** – Manual toggle with system preference detection and smooth transitions.
- **Responsive Design** – Works on mobile, tablet, and desktop.
- **Modern UI** – Card-based layout, gradient accents, Poppins font, loading states, and error handling.

---

## Tech Stack

| Layer | Technology |
|---------|------------|
| Frontend | React (Vite), JavaScript, React Router DOM |
| Styling | CSS with custom properties (Dark/Light Mode) |
| Database | Supabase (PostgreSQL) |
| AI API | Groq Cloud (LLaMA 3 8B) |
| Deployment | Vercel |
| Version Control | Git & GitHub |

---

## Project Structure

```text
academic-pathway-recommender/
├── public/
├── src/
│   ├── components/
│   │   ├── Form.jsx
│   │   ├── Header.jsx
│   │   └── SubmissionsList.jsx
│   ├── pages/
│   │   ├── FormPage.jsx
│   │   └── SubmissionsPage.jsx
│   ├── services/
│   │   ├── db.js
│   │   └── recommendation.js
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.local
├── .gitignore
├── index.html
├── package.json
├── vercel.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Supabase account
- Groq API key

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/tanich04/Academic-recommender.git
cd Academic-recommender
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_GROQ_API_KEY=gsk_...
```

#### 4. Create Supabase Table

Run the following SQL in the Supabase SQL Editor:

```sql
CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  highest_qualification TEXT,
  years_experience INT,
  current_profession TEXT,
  career_goal TEXT,
  recommendation TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE submissions DISABLE ROW LEVEL SECURITY;
```

#### 5. Start the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## Recommendation Logic

### Primary Layer – Groq AI

- Uses LLaMA 3 (8B) through Groq Cloud.
- User profile data is converted into a structured prompt.
- AI returns one recommendation:
  - Certification Program
  - DBA
  - PhD
  - Honorary Doctorate

### Fallback Layer – Rule-Based Engine

If the API:

- Fails
- Times out
- Returns invalid output

the application automatically switches to a deterministic rule engine based on:

- Qualification
- Years of Experience
- Current Profession
- Career Goal

### Guaranteed Output

The system always returns exactly one of:

- Certification Program
- DBA
- PhD
- Honorary Doctorate

--

⭐ If you found this project useful, consider giving the repository a star.
