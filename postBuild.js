import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'dist');

// Function to recursively update import statements
function updateImports(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const updatedContent = content.replace(/from\s+["']([^"']+)["']/g, (match, p1) => {
        // Add .js if it doesn't have it already
        return match.includes('.js') ? match : `from "${p1}.js"`;
    });
    if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`Updated imports in: ${filePath}`);
    }
}

// Recursively read all files in a directory
function readDirRecursive(directory) {
    const files = fs.readdirSync(directory);
    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            readDirRecursive(filePath); // Recurse into subdirectory
        } else if (file.endsWith('.js')) {
            updateImports(filePath);
        }
    });
}

// Start processing from the main dist directory
readDirRecursive(dir);
