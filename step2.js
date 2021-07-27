 "use-strict"
const argv = process.argv;
const fsP = require('fs/promises');
const axios = require('axios');

const arg = argv[2]; //  instead of arg have a more descriptive name

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

/** webCat
 * Description: Function that retrieves html from url 
 */
async function webCat(url) {
    
  try {
    let response = await axios.get(url);
    console.log(response.data);
  } catch(error){
     
    console.error(`Error fetching ${url}:` + error.response.statusText);
    console.error('Error: Request failed with status code:' + error.response.status);
    process.exit(1);
  } 
}



if(arg.includes('http')) {
  webCat(arg);
} else {
  readFile(arg);
}

