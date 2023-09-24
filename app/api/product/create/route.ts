import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { db } from "@/lib/db";

export const POST = async (request: NextRequest) => {
  const authRequest = auth.handleRequest(request.method, context);
  // check if user is authenticated
  const session = await authRequest.validate();
  const { name, price, category } = await request.json();

  if (!session) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  if (typeof name !== "string" || typeof price !== "string") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const kyc = await db.kyc.findFirst({
    where: { user_id: session.user.userId },
  });

  if (!kyc) {
    return NextResponse.json({ error: "Invalid" }, { status: 400 });
  }

  try {
    await db.product.create({
      data: {
        name,
        brand_name: kyc.brand_name,
        category,
        price,
        user_id: session.user.userId,
      },
    });

    return new Response(null, {
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
};
