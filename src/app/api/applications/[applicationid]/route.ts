import { connectDB } from "@/config/dbConfig";
import { validateJWT } from "@/helpers/validateJWT";
import Application from "@/models/applicationModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function PUT(request: NextRequest, { params }: any) {
    try {
      // validate JWT
      await validateJWT(request);
  
      const reqBody = await request.json();

      const application: any = await Application.findByIdAndUpdate(params.applicationid, reqBody, {
        new: true,
        runValidators: true,
      });
  
      // check if application exists
      if (!application) {
        return NextResponse.json(
          { message: "Application does not exist" },
          { status: 404 }
        );
      }
  
      return NextResponse.json({
        message: "Application updated successfully",
        data: application,
      });
    } catch (error: any) {
      console.log(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }