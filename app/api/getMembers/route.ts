import { NextRequest, NextResponse } from "@/node_modules/next/server";
import mysql2 from 'mysql2/promise'
import DBConnect from "../dbConnect/dbConnect";

export async function POST(req: NextRequest){
    if( req.method === 'POST'){
        const conn = mysql2.createConnection(DBConnect())
        try {
            const dataReceived = await req.json();
            console.log(dataReceived)
            const query = `SELECT c.name, tg.team_name, tg.team_id
            FROM team_groups_name as tg
            JOIN team_members_list as tm ON tm.team_id = tg.team_id
            JOIN clients_users as c ON tm.user_id = c.username
            WHERE tg.team_name = '${dataReceived.team_id}'`;

            
            const [rows, fields] = await (await conn).query(query)
            console.log(rows);

            return NextResponse.json(rows)
        } catch (error) {
            console.log(error)
        } finally {
            (await conn).end()
        }
        
    }
    else{
        console.log("Wrong method")
    }
}