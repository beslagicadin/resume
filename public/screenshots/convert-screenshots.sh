#!/bin/bash

# Create the screenshots directory if it doesn't exist
mkdir -p public/screenshots

# Convert HTML files to PNG images using wkhtmltopkg
# If wkhtmltopdf is not available, we provide instructions

if command -v wkhtmltoimage >/dev/null 2>&1; then
  echo "Converting HTML templates to PNG screenshots..."
  
  # Desktop Home
  wkhtmltoimage --width 1280 --height 720 \
    public/screenshots/desktop-home.html \
    public/screenshots/desktop-home.png
  
  # Desktop Projects
  wkhtmltoimage --width 1280 --height 720 \
    public/screenshots/desktop-projects.html \
    public/screenshots/desktop-projects.png
  
  # Mobile Home
  wkhtmltoimage --width 750 --height 1334 \
    public/screenshots/mobile-home.html \
    public/screenshots/mobile-home.png
  
  echo "Screenshots created successfully!"

else
  echo "wkhtmltoimage not found. Please install it or use an alternative method to convert the HTML files to PNG."
  echo ""
  echo "Instructions:"
  echo "1. Install wkhtmltopdf (which includes wkhtmltoimage):"
  echo "   - macOS: brew install wkhtmltopdf"
  echo "   - Linux: sudo apt install wkhtmltopdf"
  echo ""
  echo "2. Run this script again, or manually convert the HTML files by opening them in a browser and taking screenshots."
  echo ""
  echo "3. Alternative: Use Chrome/Chromium headless mode:"
  echo "   - chrome --headless --screenshot=desktop-home.png --window-size=1280,720 desktop-home.html"
  echo "   - chrome --headless --screenshot=desktop-projects.png --window-size=1280,720 desktop-projects.html"
  echo "   - chrome --headless --screenshot=mobile-home.png --window-size=750,1334 mobile-home.html"
fi

# If Chrome is available, offer alternative conversion method
if command -v google-chrome >/dev/null 2>&1 || command -v chrome >/dev/null 2>&1 || command -v chromium >/dev/null 2>&1; then
  CHROME_CMD=""
  if command -v google-chrome >/dev/null 2>&1; then
    CHROME_CMD="google-chrome"
  elif command -v chrome >/dev/null 2>&1; then
    CHROME_CMD="chrome"
  elif command -v chromium >/dev/null 2>&1; then
    CHROME_CMD="chromium"
  fi
  
  if [ -n "$CHROME_CMD" ] && [ ! -f "public/screenshots/desktop-home.png" ]; then
    echo ""
    echo "Attempting to use Chrome/Chromium for conversion..."
    
    cd public/screenshots
    
    $CHROME_CMD --headless --screenshot=desktop-home.png --window-size=1280,720 file://$(pwd)/desktop-home.html
    $CHROME_CMD --headless --screenshot=desktop-projects.png --window-size=1280,720 file://$(pwd)/desktop-projects.html
    $CHROME_CMD --headless --screenshot=mobile-home.png --window-size=750,1334 file://$(pwd)/mobile-home.html
    
    cd ../../
    
    if [ -f "public/screenshots/desktop-home.png" ]; then
      echo "Screenshots created successfully using Chrome/Chromium!"
    else
      echo "Chrome conversion failed. Please try one of the manual methods described above."
    fi
  fi
fi

# Create fallback solid color images if no screenshots were generated
if [ ! -f "public/screenshots/desktop-home.png" ]; then
  echo ""
  echo "Creating fallback images..."
  
  # If ImageMagick is available, create solid color images
  if command -v convert >/dev/null 2>&1; then
    convert -size 1280x720 xc:#0078ff public/screenshots/desktop-home.png
    convert -size 1280x720 xc:#0078ff public/screenshots/desktop-projects.png
    convert -size 750x1334 xc:#0078ff public/screenshots/mobile-home.png
    echo "Fallback images created successfully using ImageMagick!"
  else
    echo "ImageMagick not found. Please install it or use one of the methods above to create screenshots."
    echo "   - macOS: brew install imagemagick"
    echo "   - Linux: sudo apt install imagemagick"
  fi
fi

echo ""
echo "Screenshot process completed. Check the public/screenshots directory for the results."
