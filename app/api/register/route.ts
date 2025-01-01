import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

export async function POST(req:Request){
      try{
            const body = await req.json();
            const {email,password,name} = body;

            if(!email || !name || !password ){
                  return new NextResponse("Missing fields", { status: 400 });
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                  data: {
                        email,
                        name,
                        password: hashedPassword,
                  },
            });

            return NextResponse.json(user);
      }
      catch (error) {
            console.log("[REGISTER_ERROR]", error);
            return new NextResponse("Internal server error", { status: 500 });
      }
}
