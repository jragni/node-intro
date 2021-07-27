"use-strict"
const argv = process.argv;
const fsP = require('fs/promises');

/** readFile
* Description: Function that reads file of filename passed through      
*              process environment and prints it in terminal.         
*/

async function readFile(file) {
  
  try {

    let contents = await fsP.readFile(file, 'utf8');
    console.log(contents);
  } catch(error) {
    console.error(error);
    process.exit(1);
  }
} 

readFile(argv[2]);
