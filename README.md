# Country Information Portal

This project consists of a Next.js frontend and Nest.js backend that together provide information about countries, their borders, population data, and flags.

## Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run start:dev
```

The backend will be available at `http://localhost:3001`.

## Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`.

## Dependencies

### Backend
- Nest.js
- @nestjs/axios
- @nestjs/config

### Frontend
- Next.js
- React
- Recharts
- Tailwind CSS

## API Endpoints

### GET /countries
Returns a list of available countries.

### GET /countries/:code
Returns detailed information about a specific country, including:
- Border countries
- Population data
- Flag URL