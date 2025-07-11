import DataUriParser from "datauri/parser.js"

import path from "path";

const getDataUri = (file) => {
    const parser = new DataUriParser();

    console.log("chala kya");
    
    const extName = path.extname(file.originalname).toString();

    console.log("chala kya");

    
    return parser.format(extName, file.buffer);
}

export default getDataUri;