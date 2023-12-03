import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";

import useLoginModal from "./useLoginModal";
import { User } from "@prisma/client";

interface IUseFavorite {
  listingId: string;
  currentUser?: User | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds;

    if (!list) {
      return false;
    }

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () =>
            fetch(`/api/favorites/${listingId}`, {
              method: "DELETE",
            }).catch(() => {
              throw new Error("Something went wrong");
            });
        } else {
          request = () =>
            fetch(`/api/favorites/${listingId}`, {
              method: "POST",
            }).catch(() => {
              throw new Error("Something went wrong");
            });
        }

        await request();

        router.refresh();
        toast.success("Success");
      } catch (error: any) {
        toast.error("Something went wrong");
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
