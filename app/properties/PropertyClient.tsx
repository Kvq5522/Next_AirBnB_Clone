"use client";

import { Listing, Reservation, User } from "@prisma/client";
import Container from "@/components/Container";
import Heading from "@/components/Heading";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ListingCard from "@/components/Listings/ListingCard";

interface PropertyClientProps {
  listings: Listing[];
  currentUser?: User | null;
}

const PropertyClient: React.FC<PropertyClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      fetch(`/api/listings/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          toast.success("Listing deleted successfully");
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
      <Heading title="Properties" subTitle="Manage your properties" />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertyClient;
