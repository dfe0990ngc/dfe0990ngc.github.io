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
const { exec } = require('child_process');

function generateFileHash(cssFile) {
    const fileContent = fs.readFileSync(cssFile);
    const hash = crypto.createHash('sha256').update(fileContent).digest('hex');
    return hash;
}

const cssFile = process.argv[2];
const cssTargetPath = process.argv[3];
const fileToAddHash = process.argv[4];
let cssTagetFileName = '';

const baseCssFileName = cssFile.substring(cssFile.lastIndexOf('/')+1,cssFile.length);
if(cssTargetPath.substring(cssTargetPath.length-1,cssTargetPath.length) == '/')
	cssTagetFileName = cssTargetPath + baseCssFileName;
else 
	cssTagetFileName = cssTargetPath +'/'+ baseCssFileName;

if (!cssFile) {
    console.error('Please provide a file path as an argument.');
    process.exit(1);
}

const fileHash = generateFileHash(cssFile);
console.log(`Hash': ${fileHash}`);

// Delete first
exec(`rm -f ${cssTagetFileName}`,(error,stdout,stderr) => {
	if (error) {
		console.error(`Error: ${error.message}`);
		return;
	}

	if (stderr) {
		console.error(`stderr: ${stderr}`);
		return;
	}

	console.log('Removing successful!');

	// Actual code to copy file
	exec(`cp ${cssFile} ${cssTargetPath}`,(error,stdout,stderr) => {
		if (error) {
			console.error(`Error: ${error.message}`);
			return;
		}
	
		if (stderr) {
			console.error(`stderr: ${stderr}`);
			return;
		}
	
		console.log('Copying files successful!');

		let strCommand = `s/${baseCssFileName}\\(\\?v=[a-zA-Z0-9]\\+\\)\\?/${baseCssFileName}?v=${fileHash}/g`;
		
		const sedCommand = `sed -i '${strCommand}' ${fileToAddHash}`;
		
		// Modify target file
		exec(sedCommand, (error, stdout, stderr) => {
		  if (error) {
			console.error(`Error: ${error.message}`);
			return;
		  }
		
		  if (stderr) {
			console.error(`stderr: ${stderr}`);
			return;
		  }
		
		  console.log('File hash has been appended successfully.');
		//   console.log(`${sedCommand}`);
		});
	});
});
