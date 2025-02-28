import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";


export async function POST(request: Request) {
    const { userName, password} = await request.json();

    const userExists = await prisma.users.findUnique({
        where: { username: userName },
    });// prisma docs prizma client api around 10% down
        if (userExists) {
            return NextResponse.json({ message: "Username taken" }, { status: 400 });
        }
    const hashedPassword: string = await bcrypt.hash(password, 10);
    await prisma.users.create({
    data: {
        username: userName, password_hash: hashedPassword
    }
}) // simple way to send to db

        return NextResponse.json({ message: `User registered successfully!` });
    }
//find way to check if the user coming is unique
//send data to db