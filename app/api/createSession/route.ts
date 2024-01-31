import { NextRequest, NextResponse } from "@/node_modules/next/server";
import { cookies } from 'next/headers'
import mysql2 from 'mysql2/promise'
import DBConnect from "../dbConnect/dbConnect";

export async function POST(req: NextRequest){
    if( req.method === 'POST'){
        try {
            // Get necessary data from DB to validate user
            const dataReceived = await req.json();
            console.log("Data received: ", dataReceived.username)
            const query = `SELECT c.name, c.username, c.id, s.pass FROM secret_creds as s
            JOIN clients_users as c ON s.user_id = c.username
            WHERE c.username = '${dataReceived.username}'`;

            const conn = mysql2.createConnection(DBConnect())
            const [rows, fields] =<any> await (await conn).query(query)
            if(rows[0].pass === dataReceived.password){
                console.log("Correct password")
                console.log(rows);
                cookies().set({
                    name: 'userloggedin',
                    value: `${rows[0].id}`,
                    httpOnly: true,
                    path: '/'
                })

                return NextResponse.json({success: "Server responded with status 200"})
            }else{
                console.log("Wrong password")
                return NextResponse.json({error: "Wrong Password"})
            }
        } catch (error) {
            console.log(error)
        }
    }
    else{
        console.log("Wrong method")
    }
}