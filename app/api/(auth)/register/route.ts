import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  // const formData = await request.formData();
  // const email = formData.get("email");
  // const password = formData.get("password");
  const { email, password } = await request.json();

  if (typeof password !== "string" || typeof email !== "string") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const user = await auth.createUser({
      key: {
        providerId: "email", // auth method
        providerUserId: email.toLowerCase(), // unique id when using "email" auth method
        password, // hashed by Lucia
      },
      attributes: {
        email: email.toLowerCase(),
      },
    });
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest(request.method, context);
    authRequest.setSession(session);
    return new Response(null, {
      status: 302,
      headers: { Location: "/" },
    });
  } catch (e) {
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
};
