import prisma from "@/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  bathroomCount?: number;
  roomCount?: number;
  category?: string;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      userId,
      guestCount,
      bathroomCount,
      roomCount,
      category,
      startDate,
      endDate,
      locationValue,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }

    if (category) {
      query.category = category;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: new Date(startDate) },
                startDate: { lte: new Date(startDate) },
              },
              {
                startDate: { lte: new Date(endDate) },
                endDate: { gte: new Date(endDate) },
              },
            ],
          },
        },
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
      include: { reservations: true },
    });

    return listings;
  } catch (error: any) {
    throw null;
  }
}
