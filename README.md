# Design Web

Professional Design System Platform for Building, Testing and Managing Modern UI Systems.

## Live Demo

Explore the interactive sandbox and test different design systems live:

[Launch Live Demo](https://shiina-design.vercel.app)

## Features

- **Theme Playground**: Adjust, preview, and test light/dark preset systems, custom scale multipliers, and font sizes reactively.
- **Palette Studio**: Build customized palettes with automated WCAG AA color validation and real-time lightness adjustments.
- **Component Library**: Gallery of modular UI elements, including buttons, badges, selectors, alerts, and accordions.
- **Motion Studio**: Fine-tune custom animation presets, duration curves, and spring physics.
- **Accessibility Center**: Scan components for ARIA standards, touch target boundaries, and visual readability.
- **Layout Builder**: Assemble composite layouts sequentially from responsive layout blocks.
- **Template Marketplace**: Explore and download landing page templates and layout compositions.
- **Asset Studio**: Manage and convert SVG icons registries and base64 assets.
- **Charts & Analytics**: Render area, line, and bar graphs adapted to CSS variables.
- **Forms Studio**: Construct custom form flows with input fields and validations.
- **Export Center**: Compile palette configurations and design system layouts to Tailwind, CSS variables, or JS objects.
- **Documentation Hub**: Hub for design system standards, component APIs, and guidelines.

## Screenshots

- **Home**: `/docs/screenshots/home.png`
- **Palette Studio**: `/docs/screenshots/palette-studio.png`
- **Component Library**: `/docs/screenshots/component-library.png`

## Tech Stack

- **Framework**: Next.js
- **UI Library**: React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Motion**: Framer Motion
- **Theme**: next-themes
- **Icons**: Lucide React

## Getting Started

### Prerequisites

Clone the repository and install dependencies locally:

```bash
git clone https://github.com/your-username/design-web.git
cd design-web
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

## Project Structure

```
design-web/
├── app/                  # Application routing and page views
├── components/           # Atomic shared UI components
├── features/             # Isolated feature modules
├── providers/            # Central Theme Provider engine
├── registry/             # Palette and theme registers
├── tokens/               # Design token scales
└── themes/               # Theme compilation and contrast checkers
```

## Roadmap

- [x] Theme Engine Core
- [x] Palette Studio Integration
- [ ] Motion System Customization
- [ ] Automated Accessibility Telemetry
- [ ] Multi-Format Export Center
- [ ] Additional Palette Packs
- [ ] Additional Showcases

## Documentation

Detailed documentation is available in the `/docs` directory.

## Contributing

Contributions are welcome. Please read the contributing guidelines before submitting issues or pull requests.

## License

Licensed under the MIT License.
