import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { db } from "@/lib/db";

export const POST = async (request: NextRequest) => {
  const authRequest = auth.handleRequest(request.method, context);
  // check if user is authenticated
  const session = await authRequest.validate();
  const { full_name, brand_name, city, gst_number, pancard_id } =
    await request.json();

  if (!session) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  if (
    typeof full_name !== "string" ||
    typeof gst_number !== "string" ||
    typeof pancard_id !== "string"
  ) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    await db.kyc.create({
      data: {
        full_name,
        brand_name,
        city,
        gst_number,
        pancard_id,
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
