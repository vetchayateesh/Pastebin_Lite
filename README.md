# Pastebin Lite

A modern, clean, and colorful paste sharing web application built with Next.js.

## Features

- **Colorful UI Design**: Vibrant gradients and accent colors with professional design
- **Typography**: Uses Inter for body text and JetBrains Mono for code display
- **Responsive Design**: Fully responsive across all device sizes
- **Paste Creation**: Large textarea for content input with optional TTL and max views settings
- **Loading States**: Animated loading indicators during paste creation
- **Copy to Clipboard**: One-click URL copying with visual feedback
- **Toast Notifications**: Success and error notifications for better user experience
- **Metadata Display**: Shows remaining views and expiration time for pastes
- **404 Handling**: Clean error pages for expired or missing pastes
- **Top Navigation**: Colorful header with gradient branding
- **Minimal Footer**: Informational footer with subtle design

## Color Scheme

- **Primary**: Indigo to purple gradients for buttons and branding
- **Success**: Emerald to teal gradients for success states
- **Accent**: Amber and orange for metadata indicators
- **Neutral**: Slate grays for backgrounds and text
- **Background**: Subtle blue to purple gradients for depth

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4
- **Fonts**: Inter (sans-serif), JetBrains Mono (monospace)
- **Database**: PostgreSQL
- **Validation**: Zod
- **Icons**: Heroicons (SVG)

## UI Design Highlights

### Home Page
- Centered card layout with subtle shadow
- Large, resizable textarea with monospace font
- Optional TTL and max views inputs with helper text
- Primary CTA button with loading and success states
- Success state shows shareable URL with copy functionality
- Toast notifications for user feedback

### Paste Viewing Page
- Clean container with dark background for code
- Monospace font for optimal code readability
- Metadata display with icons (views remaining, expiration)
- Back navigation to home page

### Navigation & Layout
- Top navigation bar with app branding
- Minimal footer with informational text
- Dark mode toggle placeholder (ready for future implementation)

### Error Handling
- 404 page with clear messaging and call-to-action
- Inline error states for form validation
- Toast notifications for API errors

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your database and environment variables

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Design Philosophy

The UI follows modern SaaS design principles:
- **Minimalism**: Clean, distraction-free interface
- **Consistency**: Unified color palette and spacing
- **Accessibility**: WCAG compliant with proper contrast ratios
- **Performance**: Fast loading with optimized fonts and minimal JavaScript
- **User Experience**: Intuitive flows with clear feedback

## Future Enhancements

- Dark mode implementation
- Syntax highlighting for code pastes
- User accounts and paste management
- API rate limiting visualization
- Paste editing capabilities