import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    imgSrc,
    category,
    price,
    roomCount,
    bathroomCount,
    guestCount,
    location,
  } = body;
  
  console.log(body)

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) return NextResponse.error();  
  });

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      image: imgSrc,
      category,
      price: parseInt(price),
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      userId: currentUser.id,
    },
  })

  return NextResponse.json(listing);
}


