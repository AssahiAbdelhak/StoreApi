import { app } from "../server.js"
export const getAllProductsFromDatabase = async (queryString) => {
    const client = await app.pg.connect()
    try {
        const {rows} = await client.query(
            queryString
        )
        console.log(rows.lenght,typeof rows)
        return JSON.stringify({
            
            nbProducts : Array(rows).length,
            data : rows
        },null,2);
        
    }finally{
        client.release()
    }

}