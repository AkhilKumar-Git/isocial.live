# Social AI Post Generator

A modern web application that helps users generate and schedule social media posts using AI.

## Features

- Connect multiple social media accounts (LinkedIn, Twitter, Instagram)
- AI-powered post generation
- Preview posts before publishing
- Schedule posts for later
- Cross-platform posting

## Tech Stack

- React 19
- TypeScript
- Vite
- Framer Motion (for animations)
- Google Gemini AI

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/isocial.live.git
   cd isocial.live
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```
   VITE_GOOGLE_API_KEY=your_google_api_key
   VITE_API_BASE_URL=your_api_url
   ```

4. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
