import { NextRequest, NextResponse } from "@/node_modules/next/server";
import mysql2, {ConnectionOptions} from 'mysql2/promise'

export async function POST(req: NextRequest, res: NextResponse){
    if( req.method === 'POST'){
        try {
            const dataReceived = await req.json();
            console.log(dataReceived)

            const connection: ConnectionOptions = {
                user: "root",
                host: "localhost",
                database: "synchdb"
            }

            const query = `INSERT INTO clients_users (name, username, id, organization) VALUES ('${dataReceived.name}', '${dataReceived.username}', '${dataReceived.id}', '${dataReceived.organization}'    )`

            const conn = mysql2.createConnection(connection)
            const [rows, fields] = await (await conn).query(query)
            console.log(rows);
        } catch (error) {
            console.log(error)
        }
        
    }
    else{
        console.log("Wrong method")
    }
}