import { app } from "../server.js"
export const getAllProductsFromDatabase = async (queryString) => {
    const client = await app.pg.connect()
    try {
        const {rows} = await client.query(
            queryString
        )
        return JSON.stringify(rows,null,2);
    }finally{
        client.release()
    }

}