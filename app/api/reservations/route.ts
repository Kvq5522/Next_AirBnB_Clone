import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const body = await request.json();

  const { listingId, startDate, endDate, totalPrice } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) return NextResponse.error();
  });

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  if (!listingAndReservation) return NextResponse.error();

  return NextResponse.json(listingAndReservation);
}
