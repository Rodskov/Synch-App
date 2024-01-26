import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import mysql2, {createConnection} from 'mysql2/promise'
import DBConnect from "../dbConnect/dbConnect";

export async function POST(req: NextRequest){
    if(req.method === 'POST'){
        const cookieValue:any = cookies().get('userloggedin')
        const dataReceived = await req.json()

        const conn = mysql2.createConnection(DBConnect())
        const checkUserQuery = `SELECT c.username FROM clients_users as c WHERE c.username = ${dataReceived.username}`

        const cookieQuery = `SELECT c.username FROM clients_users as c WHERE c.id = '${cookieValue.value}'`

        const [cookieResult] = await (await conn).query(cookieQuery)

        const requestQuery = `INSERT INTO requests (send_to, sent_from, request_type, status, owner) VALUES ('${dataReceived.username}', '${cookieResult[0].username}', 1, ${dataReceived.status}, '${dataReceived.username}')`

        const [requestVar] = await (await conn).query(requestQuery)
        console.log(requestVar)
        console.log("Method is correct")
        return NextResponse.json({receiver: dataReceived.username,
                                    sender: cookieResult[0].username})
    }
}