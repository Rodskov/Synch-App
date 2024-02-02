import { NextRequest, NextResponse } from "next/server"
import mysql2 from 'mysql2/promise'
import DBConnect from "../../dbConnect/dbConnect"

export const POST = async (req: NextRequest) => {
    if(req.method === 'POST'){
        const dataReceived = await req.json()
        const conn = mysql2.createConnection(DBConnect())

        if(dataReceived.accept == true){
            const teamUserIDQuery = `SELECT r.team_id, r.owner FROM requests as r WHERE r.req_id = '${dataReceived.req_id}'`
            const [teamUserIDResult] = <any> await (await conn).query(teamUserIDQuery)
            console.log(teamUserIDResult)
            const addUserToTeamQuery = `INSERT INTO team_members_list (user_id, team_id, access_level) VALUES ('${teamUserIDResult[0].owner}', '${teamUserIDResult[0].team_id}', 1)`
            const addUserToTeamVar = await (await conn).query(addUserToTeamQuery)
            const deleteReqQuery = `DELETE FROM requests WHERE requests.req_id = '${dataReceived.req_id}'`
            const deleteReqVar = await (await conn).query(deleteReqQuery)
            return NextResponse.json(`You are now added to ${teamUserIDResult[0].team_id}`)
        }
        if(dataReceived.accept == false){
            const teamUserIDQuery = `SELECT r.team_id, r.owner FROM requests as r WHERE r.req_id = '${dataReceived.req_id}'`
            const [teamUserIDResult] = <any> await (await conn).query(teamUserIDQuery)
            const deleteReqQuery = `DELETE FROM requests, requests_details WHERE requests.req_id = '${dataReceived.req_id}'`
            const deleteReqVar = await (await conn).query(deleteReqQuery)
            return NextResponse.json(`Invitation to ${teamUserIDResult[0].team_id} has been rejected`)
        }
    }
}