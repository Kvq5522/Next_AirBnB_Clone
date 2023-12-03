import EmptyState from "@/components/EmptyState";
import ClientOnly from "@/components/ClientOnly";

import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";
import ReservationClient from "./ReservationClient";

const ReservationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <div className="min-h-screen">
        <ClientOnly>
          <EmptyState
            title="Unauthorized"
            subTitle="Please login to see contents"
          />
        </ClientOnly>
      </div>
    );
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (
    !Array.isArray(reservations) ||
    reservations.length === 0 ||
    !reservations
  ) {
    return (
      <div className="min-h-screen">
        <ClientOnly>
          <EmptyState
            title="No reservations"
            subTitle="You have no reservations"
          />
        </ClientOnly>
        ;
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ClientOnly>
        <ReservationClient
          currentUser={currentUser}
          reservations={reservations}
        />
      </ClientOnly>
      ;
    </div>
  );
};

export default ReservationPage;
