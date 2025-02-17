import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const users: { userName: string; password: string }[] = [];
const SECRET_KEY = "aleks secret key";

export async function POST(request: Request) {
  const { userName, password, type } = await request.json();

  if (type === "login") {
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
    }
  } else if (type === "register") {
    const userExists = users.some((user) => user.userName === userName);
    if (userExists) {
      return NextResponse.json({ message: "Username taken" }, { status: 400 });
    }

    users.push({ userName, password });

    return NextResponse.json({ message: `User registered successfully!` });
  } else {
    return NextResponse.json({ message: "Invalid Type" }, { status: 400 });
  }
}
