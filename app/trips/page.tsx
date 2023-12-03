import EmptyState from "@/components/EmptyState";
import ClientOnly from "@/components/ClientOnly";

import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";
import TripsClient from "./TripsClient";

interface IParams {
  listingId?: string;
}

const TripsPage = async () => {
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
  
  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if ((Array.isArray(reservations) && reservations.length === 0) || !reservations) {
    <ClientOnly>
      <EmptyState title="No reservations" subTitle="You have no reservations" />
    </ClientOnly>;
  }

  return (
    <div className="min-h-screen">
      <ClientOnly>
        <TripsClient currentUser={currentUser} reservations={reservations??[]} />
      </ClientOnly>
    </div>
  );
};

export default TripsPage;
