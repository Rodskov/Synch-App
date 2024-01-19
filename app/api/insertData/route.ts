import { NextRequest, NextResponse } from "@/node_modules/next/server";
import mysql2, {ConnectionOptions} from 'mysql2/promise'
import DBConnect from "../dbConnect/dbConnect";

export async function POST(req: NextRequest){
    if( req.method === 'POST'){
        try {
            const dataReceived = await req.json();
            console.log(dataReceived)
            const query = `INSERT INTO clients_users (name, username, id, organization) VALUES ('${dataReceived.name}', '${dataReceived.username}', '${dataReceived.id}', '${dataReceived.organization}'    )`

            const conn = mysql2.createConnection(DBConnect())
            const [rows, fields] = await (await conn).query(query)
            console.log(rows);

            return NextResponse.json({ success: 'Server working' }, { status: 200 })
        } catch (error) {
            console.log(error)
        }
        
    }
    else{
        console.log("Wrong method")
    }
}