import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, res: NextResponse){
    // const cookies = req.cookies.get('userName')
    // if(cookies === undefined) {
    //     console.log("Not found");
    // }

    //  const response = NextResponse.next()

    // //response.cookies.set("userName", 'Sample')
    // console.log(cookies)
    // return response
}

export const config = {
    matcher: "/"
}