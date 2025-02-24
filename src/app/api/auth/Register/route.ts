import {NextResponse} from "next/server";
import {users} from "@/lib/user-store";



export async function POST(request: Request) {
    const { userName, password} = await request.json();
        const userExists = users.some((user) => user.userName === userName);
        if (userExists) {
            return NextResponse.json({ message: "Username taken" }, { status: 400 });
        }

        users.push({ userName, password });
        console.log(users);

        return NextResponse.json({ message: `User registered successfully!` });
    }
