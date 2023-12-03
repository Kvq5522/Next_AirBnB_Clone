import EmptyState from "@/components/EmptyState";
import ClientOnly from "@/components/ClientOnly";

import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";
import PropertyClient from "./PropertyClient";
import getListings from "@/actions/getListings";

export const dynamic = "force-dynamic";

interface IParams {
  listingId?: string;
}

const PropertyPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subTitle="Please login to see contents"
        />
      </ClientOnly>
    );
  }
  
  const listings = await getListings({
    userId: currentUser.id,
  });

  if ((Array.isArray(listings) && listings.length === 0) || !listings) {
    <ClientOnly>
      <EmptyState title="Properties" subTitle="You have no properties" />
    </ClientOnly>;
  }

  return (
    <div className="min-h-screen">
      <ClientOnly>
        <PropertyClient currentUser={currentUser} listings={listings} />
      </ClientOnly>
    </div>
  );
};

export default PropertyPage;
