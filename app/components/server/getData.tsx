import React from 'react'
import mysql2, {ConnectionOptions} from 'mysql2/promise'

const GetData = async () => {
    var users = [];
    try {
        const connection: ConnectionOptions = {
            user: "root",
            host: "localhost",
            database: "synchdb"
        }

        const query = "SELECT * FROM clients_users"

        const conn = mysql2.createConnection(connection)
        const [rows, fields] = await (await conn).query(query)
        users.push(rows);
        console.log(users);
    } catch (error) {
        console.log(error)
    }
  return (
    <>
        {users.map}
    </>
  )
}

export default GetData