/***********************************************************************************************************************
 * params:
 * 			1: target file to copy (e.g ../public/css/ar_update.css)
 * 			2: target directory location (e.g ../modules/css/ar/)
 * 			3: the target file to add version hash (e.g ../../application/modules/ar/views/forms/ar_update/ar_update.php)
 * 
 * example command:
 * 			node hashGenerator.js ../public/css/ar_update.css ../modules/css/ar/ ../../application/modules/ar/views/forms/ar_update/ar_update.php
 **********************************************************************************************************************/

const fs = require('fs');
const crypto = require('crypto');

function generateFileHash(cssFile) {
    const fileContent = fs.readFileSync(cssFile);
    const hash = crypto.createHash('sha256').update(fileContent).digest('hex');
    return hash;
}

const cssFile = process.argv[2];

const fileHash = generateFileHash(cssFile);
console.log(`Hash': ${fileHash}`);
