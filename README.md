# Pembimbing Andalus

**English** | [Bahasa Indonesia](README.id.md)

A simple, responsive, and easy-to-use web application for displaying a list of room supervisors ("Pembimbing Kamar").

## Features

- **Responsive Table**: Well-structured data table accessible across all devices.
- **Card Mode (Grid View)**: A modern visual layout optimized for mobile users.
- **Grouping & Accordion**: Group supervisors by room category and toggle visibility.
- **Dashboard Summary**: Instantly view total supervisors and rooms.
- **Copy to Clipboard**: Easily copy supervisor names or roles with a single click.
- **Search & Filter**: Find supervisors quickly by name or role.

## Architecture

This project is built as a **Single-Page Application (SPA)** using a clean, "pure web" approach without external frameworks or build steps.

- **`index.html`**: The entry point, containing the semantic structure and initial data table.
- **`src/index.css`**: Modern CSS for layout, styling, and responsiveness, using custom properties for theme management.
- **`src/index.js`**: Vanilla JavaScript for dynamic rendering, grouping, searching, and clipboard utilities.

## Technologies Used

- **HTML5**: Semantic markup for the data structure.
- **CSS3**: Modern styling with custom properties and responsiveness.
- **JavaScript (Vanilla)**: Clean, standard-compliant logic for interactive features.

## Usage

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/litfill/pembimbing-andalus.git
   ```
2. Open `index.html` in any modern web browser.

### Interactive Features

- **Search**: Use the search bar to filter supervisors by name or room.
- **Toggle View**: Switch between "Table Mode" and "Card Mode" using the button at the top right.
- **Group Data**: Use the dropdown to group supervisors by room category (e.g., Bahasa, Tahfidz).
- **Copy Text**: Click the "📄 Salin" button next to any text to copy it to your clipboard.

## Deployment

The project is configured for **GitHub Pages**. Any changes pushed to the `main` branch are automatically deployed via GitHub Actions.

- **URL**: [https://litfill.github.io/pembimbing-andalus/](https://litfill.github.io/pembimbing-andalus/)

## License

MIT
