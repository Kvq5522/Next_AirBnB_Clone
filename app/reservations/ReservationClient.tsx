"use client";

import { Listing, Reservation, User } from "@prisma/client";
import toast from "react-hot-toast";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import Heading from "@/components/Heading";
import Container from "@/components/Container";
import ListingCard from "@/components/Listings/ListingCard";

type ReservationWithListing = Omit<Reservation, "listing"> & {
  listing: Listing;
};

interface ReservationClientProps {
  currentUser?: User | null;
  reservations?: ReservationWithListing[] | null;
}

const ReservationClient: React.FC<ReservationClientProps> = ({
  reservations = [],
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      fetch(`/api/reservations/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          toast.success("Reservation cancelled successfully");
          router.refresh();
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error || "Something went wrong");
          setDeletingId("");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <div className="min-h-screen">
      <Container>
        <Heading title="Reservations" subTitle="Bookings on your properties" />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {
            reservations?.map((reservation) => (
              <ListingCard 
                key={reservation.id}
                data={reservation.listing}
                reservation={reservation}
                actionId={reservation.id}
                onAction={onCancel}
                disabled={deletingId === reservation.id}
                actionLabel="Cancel guest stay"
                currentUser={currentUser}
              />
            ))
          }
        </div>
      </Container>
    </div>
  );
};

export default ReservationClient;
