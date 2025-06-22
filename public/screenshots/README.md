# PWA Screenshots Generator

This directory contains HTML templates and a script to generate screenshots for the PWA manifest.

## Requirements

- Node.js
- Puppeteer (`npm install puppeteer`)

## Usage

To generate screenshots, run:

```bash
npm run generate-screenshots
```

Or directly with Node:

```bash
node screenshot.js
```

## Files

- `screenshot.js` - The main script that uses Puppeteer to generate screenshots
- `desktop-home.html` - Template for desktop home screenshot
- `desktop-projects.html` - Template for desktop projects screenshot
- `mobile-home.html` - Template for mobile home screenshot

## Output

The script will generate the following PNG files:

- `desktop-home.png` - Desktop home page screenshot (1920x1080)
- `desktop-projects.png` - Desktop projects page screenshot (1920x1080)
- `mobile-home.png` - Mobile home page screenshot (390x844)

These screenshots are referenced in the `manifest.webmanifest` file for PWA installation.

## Troubleshooting

If you encounter issues:

1. Make sure Puppeteer is installed: `npm install puppeteer`
2. Check if HTML templates exist in the same directory as the script
3. Ensure you have proper file permissions

For headless Chrome issues on different platforms, you may need to adjust the Puppeteer launch options in the script.
