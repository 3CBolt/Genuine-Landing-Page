# Genuine Landing Page

A modern React landing page showcasing the Genuine Verify SDK integration with live demo functionality.

## Features

- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **Genuine Verify SDK Integration**: Live demo of the Genuine Verify widget
- **Responsive Design**: Optimized for all device sizes
- **Interactive Demo**: Real-time face verification with camera access
- **Clean Architecture**: Well-structured component-based codebase

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Build Tool**: Vite
- **SDK**: Genuine Verify SDK
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Genuine-Landing-Page.git
cd Genuine-Landing-Page
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── GenuineVerifyDemo.tsx
│   └── GenuineVerifySection.tsx
├── GenuineVerifyDemoPage.tsx
├── App.tsx
└── main.tsx
```

## Demo Features

- **Live Camera Integration**: Real-time face detection and verification
- **Eye Tracking**: Advanced eye movement detection
- **Head Tilt Detection**: Gesture recognition for head movements
- **Reset Functionality**: Clear demo state and restart verification
- **Responsive Widget**: Adapts to different screen sizes

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Key Components

- **GenuineVerifyDemo**: Main demo component with SDK integration
- **GenuineVerifySection**: Landing page section showcasing the demo
- **GenuineVerifyDemoPage**: Dedicated demo page for isolated testing

## SDK Integration Notes

The project integrates the Genuine Verify SDK with the following considerations:

- Canvas sizing for overlay alignment on HiDPI displays
- Token management and reset functionality
- Camera access and permissions handling
- Real-time gesture detection and feedback

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Genuine Verify SDK](https://github.com/genuine-ai/genuine-verify-js) for the verification technology
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework 