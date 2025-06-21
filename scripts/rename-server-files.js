/**
 * Post-build script to rename Angular SSR server files to comply with Netlify function naming conventions
 * Netlify does not accept function names with dots, so we rename files like main.server.mjs to main-server.mjs
 */

const fs = require('fs');
const path = require('path');

// Path to the server output directory
const serverOutputDir = path.join(__dirname, '../dist/CV/server');

// Files to check and rename
const filesToRename = [
  'main.server.mjs',
  'polyfills.server.mjs',
  'chunk-*.mjs',
  // Add any other server files that might have dots in their names
];

console.log('Starting server file renaming process...');

// Check if directory exists
if (!fs.existsSync(serverOutputDir)) {
  console.error(`Error: Directory ${serverOutputDir} does not exist!`);
  process.exit(1);
}

// Get all files in the directory
const files = fs.readdirSync(serverOutputDir);

// Process each file
let renamedCount = 0;

files.forEach(filename => {
  // Check if the filename contains '.server.' pattern
  if (filename.includes('.server.')) {
    const newFilename = filename.replace('.server.', '-server.');
    const oldPath = path.join(serverOutputDir, filename);
    const newPath = path.join(serverOutputDir, newFilename);
    
    try {
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed: ${filename} → ${newFilename}`);
      renamedCount++;
      
      // If we renamed main.server.mjs, we need to update imports in other files
      if (filename === 'main.server.mjs') {
        updateImportsInDirectory(serverOutputDir, filename, newFilename);
      }
    } catch (error) {
      console.error(`Error renaming ${filename}: ${error.message}`);
    }
  }
});

console.log(`Completed renaming ${renamedCount} files.`);

/**
 * Updates import references in all .mjs files in the directory
 */
function updateImportsInDirectory(directory, oldFilename, newFilename) {
  const files = fs.readdirSync(directory);
  
  // Strip extension for import statements
  const oldImport = oldFilename.replace('.mjs', '');
  const newImport = newFilename.replace('.mjs', '');
  
  files.forEach(filename => {
    if (filename.endsWith('.mjs')) {
      const filePath = path.join(directory, filename);
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Check if file contains imports of the renamed file
      if (content.includes(`./${oldImport}`)) {
        content = content.replace(new RegExp(`\\.\/${oldImport}`, 'g'), `./${newImport}`);
        fs.writeFileSync(filePath, content);
        console.log(`Updated imports in: ${filename}`);
      }
    }
  });
}

const fs = require('fs');
const path = require('path');

const serverDir = path.join(process.cwd(), 'dist', 'CV', 'server');

// Function to rename files
function renameFiles() {
  if (!fs.existsSync(serverDir)) {
    console.error('Server directory not found');
    process.exit(1);
  }

  const files = fs.readdirSync(serverDir);
  
  files.forEach(file => {
    if (file === 'main.server.mjs') {
      fs.renameSync(
        path.join(serverDir, file),
        path.join(serverDir, 'main-server.mjs')
      );
      console.log(`Renamed ${file} to main-server.mjs`);
    } else if (file === 'polyfills.server.mjs') {
      fs.renameSync(
        path.join(serverDir, file),
        path.join(serverDir, 'polyfills-server.mjs')
      );
      console.log(`Renamed ${file} to polyfills-server.mjs`);
    }
  });

  console.log('Server files renamed successfully');
}

renameFiles();
