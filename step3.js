"use-strict"
const argv = process.argv;
const fsP = require('fs/promises');
const axios = require('axios');

const path = argv[2]; //  instead of arg have a more descriptive name

/** readFile
 * Description: Function that reads file of filename passed through 
 *              process environment and prints it in terminal.
*/
async function readFile(file) {
 
   try {
 
      let contents = await fsP.readFile(file, 'utf8');
      return contents.data;
  } catch(error) {
      console.error(error);
      process.exit(1);
  }
}

/** webCat
 * Description: Function that retrieves html from url 
 */
async function webCat(url) {
    
  try {
    let response = await axios.get(url);
    return response.data;
  } catch(error){
     
    console.error(`Error fetching ${url}:` + error.response.statusText);
    console.error('Error: Request failed with status code:' + error.response.status);
    process.exit(1);
  } 
}


async function writeFile(newFileName, data, encoding='utf8') {
  try {
    await fsP.writeFile(newFileName, data, encoding);
  } catch(error) {

    console.error(error);
    process.exit(1);
  }
}


// TODO: make sure this works by TODAY....
// MAIN ------------------------
async function main() {
  if (path === undefined) {
    console.log('Not enough arguments');
  }else if(process.argv.includes('--out')){
       path = process.argv[2];
       const newFileName = process.argv[3];
       const content = path.includes('http') ? 
                       webCat(path) :
                       readFile(path);
  
       writeFile(newFileName, content); 
           
   } else if(path.includes('http')) {
    console.log( await webCat(path));
  } else {
    console.log( await readFile(path));
  }
}


main();
