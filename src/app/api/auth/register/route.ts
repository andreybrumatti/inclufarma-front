import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { nome, email, senha } = await request.json();

    if (!nome || !email || !senha) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const response = await fetch('http://localhost:8081/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.message || 'Failed to register user' }, { status: response.status });
    }

    const user = await response.json();

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
