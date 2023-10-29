import { connectDB } from "@/config/dbConfig";
import { validateJWT } from "@/helpers/validateJWT";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request:NextRequest) {
    try {
        // const userToken = request.cookies.get('__session-sharejobs');
        const userId = await validateJWT(request);
        const user = await User.findById(userId).select('-password');

        if(!user) {
            throw new Error('User not found');
        }

        return NextResponse.json({ message: "Use data fetched successfully", data: user}, { status: 200});
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500});
    }
}