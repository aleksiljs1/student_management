import jwt from "jsonwebtoken";
import {NextResponse} from "next/server";
import {SECRET_KEY, users} from "@/lib/user-store";

export async function POST(request: Request) {
    const { userName, password} = await request.json();


        const userExists = users.some(
            (user) => user.userName === userName && user.password === password,
        );
        if (userExists) {
            const token = jwt.sign({ userName }, SECRET_KEY, { expiresIn: "1h" });

            return NextResponse.json({ message: `You have logged in!`, token });
        } else {
            return NextResponse.json(
                { message: "Wrong credentials" },
                { status: 400 },
            );
        }}