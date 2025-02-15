
import { NextResponse } from "next/server";

let users: { userName: string; password: string }[] = [];

export async function POST(request: Request) {
    const { userName, password , type} = await request.json();

    if (type === "login") {
        const userExists = users.some(user => user.userName === userName && user.password === password);
        if (userExists) {
            return NextResponse.json({ message: `YOU LOGGED IN HOLY SHT IT WORKED!` });
        } else {
            return NextResponse.json({ message: "Wrong credentials" }, { status: 401 });
        } //IM A GENIUS SAVANT . IT WILL EVENTUALLY WORK
    }//note some for arrays after
    else if (type === "register") {
        const userExists = users.some(user => user.userName === userName);
        if (userExists) {
            return NextResponse.json({ message: "Username taken" }, { status: 400 });
        }

        users.push({ userName, password });
        return NextResponse.json({ message: `User.....registered successfully!` });
    }
    else {
        return NextResponse.json({ message: "Invalid request type" }, { status: 400 });
    }
}
