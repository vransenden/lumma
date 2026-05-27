# Lumma - Premium Award-Winning Bento Grid Portfolio

Lumma is a high-performance, award-winning static HTML5 portfolio template built with modern web technologies. It features a sophisticated dark-mode, pure-black design, a custom modular bento-grid layout, and premium interactive elements.

This template has been meticulously optimized for global accessibility, high-fidelity responsive performance, and a dedicated native-app feel on mobile viewports.

---

## Technical Features

- **Dedicated Mobile Theme Layout**: Instead of simply scaling down the desktop grid, Lumma implements a dedicated mobile theme architecture on viewports 768px or smaller, integrating horizontal segmented setting controls, horizontal stats ribbons, and vertical bento stacks.
- **Smart Reveal Header on Scroll**: Integrates a custom scroll-direction-aware header navigation system that automatically slides out of view upwards when scrolling down to maximize vertical screen area, and fluidly slides back in when scrolling up.
- **Compact Splash Preloader**: A minimalist, high-end preloader loading screen featuring perfectly scaled logo typography and a linear progress bar designed to feel like a premium mobile app boot sequence.
- **Interactive Configurator**: A fully responsive project cost and scope calculator featuring segmented control toggles and dynamic checkbox configurations.
- **Custom Modular Bento Grid**: A beautiful geometric bento layout utilizing semantic HTML5 containers and flexible vanilla CSS grids.
- **Smooth Animations**: High-fidelity, smooth transitions and reveal effects driven by GSAP and ScrollTrigger.
- **Pure Black Minimalism**: A harmoniously balanced dark design palette utilizing off-whites, electric cyans, deep purples, and deep border dividing lines.

---

## Getting Started

These instructions will guide you through running and exploring the Lumma template codebase on your local machine for customization and development.

### Prerequisites

You only need a modern web browser to open and view the portfolio:
- Google Chrome, Mozilla Firefox, Apple Safari, or Microsoft Edge.
- A local server environment is recommended during development for hot-reloading (such as the VS Code Live Server extension or Python's built-in HTTP server).

### Installation

1. Clone the repository to your local workspace:
   ```bash
   git clone <repository-url>
   cd lumma
   ```

2. Open the directory structure and double-click `index.html` to view it in your browser immediately, or spin up a local development server.

3. To serve the project using Python's built-in server, run:
   ```bash
   python3 -m http.server 8080
   ```
   Then navigate to `http://localhost:8080` in your browser.

---

## Tech Stack and Libraries

Lumma is designed with high efficiency in mind, leveraging modern front-end packages:

- **HTML5**: Semantic document structure.
- **CSS3 (Vanilla)**: Features modern CSS properties, custom variables, flexible grid templates, and backdrop filters.
- **JavaScript (Vanilla ES6)**: For layout mechanics, interactive calculations, and state toggles.
- **GSAP (GreenSock Animation Platform)**: Handles custom performance timelines and smooth letter-mask animations.
- **ScrollTrigger**: Powers high-performance scroll-driven parallax and section triggers.

---

## Architecture and Layout Details

### 1. Preloader Screen
The preloader consists of a centered branding logo and progress indicator bar container. On mobile viewports, the logo scales down to 2.6rem with a tight -1.5px letter-spacing, and the bar width is optimized to 140px to remain perfectly centered without breaking viewport limits.

### 2. Smart Navigation Header
- **Desktop**: Features a high-performance floating sticky navigation container with blurred frosted-glass aesthetics.
- **Mobile**: Transforms into a fixed app bar with the "Let's Talk" CTA relocated inside the mobile menu drawer to maintain a clean viewport.
- **Scroll Toggles**: Listens to vertical scrolling and toggles the `.header-hidden` class to translate the header up by 100% when scrolling down. The hiding logic is bypassed whenever the mobile menu overlay is active to protect usability.

### 3. Custom Bento Widgets
- **Spotify Player Card**: Integrates a dynamic vinyl disc decoration that animates smoothly while active, combined with detailed typography.
- **Live Clock**: Combines system time parsing to display a live, ticking local digital clock within the command center bento cell.
- **Interactive Service Cards**: Implements clear grid lists that collapse dynamically into vertical single-column card layouts on mobile.

---

## Design System Configuration

### Colors
All design tokens are defined as CSS custom properties under the `:root` pseudo-selector in `assets/css/style.css`:
- Background Color: `#08080C` (Pure deep black dark-mode background)
- Accent Color: `#FFFFFF` (Primary crisp white)
- Border Color: `rgba(255, 255, 255, 0.08)` (Fine geometric dividers)

### Typography
Font styling relies on modern premium sans-serif typography with tight, robust line-heights and negative letter-spacing parameters to achieve a bold, modern editorial look:
- Logo Letter-Spacing: `-3px` (Desktop) / `-1.5px` (Mobile)
- Heading Letter-Spacing: `-2px`

---

## Directory Structure

```text
lumma/
├── assets/
│   ├── css/
│   │   └── style.css       # Core layout styles, variables, and responsive queries
│   ├── js/
│   │   └── script.js      # Navigation, dynamic clock, pricing logic, and preloader
│   └── img/
│       └── ...             # Interface graphic assets and design mockups
├── index.html              # Core semantic structure and bento configuration
└── README.md               # Extensive project technical documentation
```

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Designed with premium web standards for creative developers and digital creators.
