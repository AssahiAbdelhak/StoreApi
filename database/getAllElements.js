import { getAllProductsFromDatabase } from "./databaseFunctions.js";

export const getAllProducts = async (req,res) => {
    res.type('application/json; charset=utf-8');
    
    const {featured,company,name,numericFilters,fields,sort,limit,page} = req.query;

    let queryString = `SELECT ${fields?fields:'*'} FROM storedata`
    let filters = []

    if(featured||company||name||numericFilters){
        queryString += " WHERE ";
    }

    if(featured!==undefined){
        filters.push(`featured=${featured}`);
    }

    if(company){
        filters.push(`company='${company}'`)
    }

    if(name){
        filters.push(`name='${name}'`)
    }

    if(numericFilters){
        let filt = numericFilters.split(',')
        filters.push(...filt)
    }

    queryString += `${filters.join(' AND ')} `

    if(sort){
        queryString += `ORDER BY ${sort}`;
    }
    let theLimit = limit || 10;
    let skip = page ? (page-1)*(theLimit) : 0*theLimit ;
    queryString += ` offset ${skip} limit ${theLimit};`

    console.log(queryString,req.query)
    let allProds = await getAllProductsFromDatabase(queryString);

    await res.send(allProds)
}