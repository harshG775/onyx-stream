# Onyx Stream

A modern, sleek streaming platform for browsing and discovering movies and TV shows. Built with cutting-edge technologies for a smooth, responsive user experience.

## Features

- **Browse** movies and TV shows with a beautiful, intuitive interface
- **Search** functionality to find your favorite content
- **Dark mode** support with seamless theme switching
- **Detailed views** with cast information, ratings, and reviews
- **Season tracking** for TV shows
- **Comments section** for community engagement
- **Responsive design** that works on all devices

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Routing**: TanStack Router for client-side navigation
- **Data Fetching**: TanStack Query (React Query) with caching
- **Styling**: Tailwind CSS with dark mode support
- **UI Components**: Radix UI with custom components
- **API**: TMDB (The Movie Database) integration
- **Build Tool**: Vite for fast development and production builds

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
# Create a .env file with your TMDB API key
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/
```

### Development

```bash
# Start development server
pnpm dev

# Open http://localhost:3000 in your browser
```

### Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Screenshots

![Screenshot 1](./public/images/Screenshot%202026-04-02%20130420.png)

![Screenshot 2](./public/images/Screenshot%202026-04-02%20130434.png)

![Screenshot 3](./public/images/Screenshot%202026-04-02%20130444.png)

##  Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run tests
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm check` - Run Prettier and ESLint with fixes

## Project Structure

```
src/
├── components/     # Reusable UI components
├── routes/         # Route definitions and pages
├── lib/            # Utilities and services
├── hooks/          # Custom React hooks
├── types/          # TypeScript type definitions
└── stores/         # State management
```

## Core Pages

- **Home** - Browse popular and trending content
- **Search** - Search movies and TV shows
- **Details** - View full details of movies/TV shows with cast and reviews
- **Settings** - Customize your viewing experience

## Browser Support

Works on all modern browsers that support ES2020+

---

