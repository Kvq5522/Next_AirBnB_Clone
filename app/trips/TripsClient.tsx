"use client";

import { Listing, Reservation, User } from "@prisma/client";
import Container from "@/components/Container";
import Heading from "@/components/Heading";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ListingCard from "@/components/Listings/ListingCard";

type ReservationWithListing = Omit<Reservation, "listing"> & {
  listing: Listing;
};

interface TripsClientProps {
  reservations: ReservationWithListing[];
  currentUser?: User | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
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
    <Container>
      <Heading title="Trips" subTitle="Manage your trips" />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel Reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
