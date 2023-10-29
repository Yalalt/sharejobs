import { NextResponse } from "next/server";


export async function POST() {
    try {
        const response = NextResponse.json({ message: "Logout success" }, { status: 200 });

        // Remove the cookie
        // __session-sharejobs is the name of the cookie
        response.cookies.set("__session-sharejobs", "", { maxAge: 0 });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}