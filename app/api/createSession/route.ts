import { NextRequest, NextResponse } from "@/node_modules/next/server";
import { cookies } from 'next/headers'
import mysql2 from 'mysql2/promise'
import DBConnect from "../dbConnect/dbConnect";

export async function POST(req: NextRequest){
    if( req.method === 'POST'){
        try {
            const dataReceived = await req.json();
            console.log("Data received: ", dataReceived.username)
            const query = `SELECT c.name, c.username, c.id, s.pass FROM secret_creds as s
            JOIN clients_users as c ON s.user_id = c.id
            WHERE c.id = '${dataReceived.username}'`;

            const conn = mysql2.createConnection(DBConnect())
            const [rows, fields] = await (await conn).query(query)
            if(rows[0].pass === dataReceived.password){
                console.log("Correct password")
                console.log(rows);

                cookies().set({
                    name: 'userloggedin',
                    value: `${dataReceived.username}`,
                    httpOnly: true,
                    path: '/'
                })

                return NextResponse.json({Status: "Server responded with status 200"})
            }else{
                console.log("Wrong password")
                return NextResponse.json({Server: "Wrong Password"})
            }
        } catch (error) {
            console.log(error)
        }
    }
    else{
        console.log("Wrong method")
    }
}