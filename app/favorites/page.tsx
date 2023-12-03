import EmptyState from "@/components/EmptyState";
import ClientOnly from "@/components/ClientOnly";
import getFavoriteListings from "@/actions/getFavoriteListings";
import getCurrentUser from "@/actions/getCurrentUser";
import FavoriteClient from "./FavoriteClient";

const FavoritePage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0)
    return (
      <div className="min-h-screen">
        <ClientOnly>
          <EmptyState title="No favorites" subTitle="You have no favorites" />
        </ClientOnly>
      </div>
    );

  return <div className="min-h-screen">
    <ClientOnly>
      <FavoriteClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  </div>
};

export default FavoritePage;
