import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    if( req.method === 'GET'){
        try {
            const cookieValue: any = cookies().get("userloggedin")
            return NextResponse.json(cookieValue.value)
        } catch (error) {
            console.log(error)
        }
    }
    else{
        console.log("Wrong method")
    }
}