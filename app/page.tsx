import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";

import getListings, { IListingsParams } from "@/actions/getListings";
import ListingCard from "@/components/Listings/ListingCard";
import getCurrentUser from "@/actions/getCurrentUser";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (Array.isArray(listings) && listings.length === 0)
    return (
      <div className="min-h-screen">
        <ClientOnly>
          <EmptyState showReset />
        </ClientOnly>
      </div>
    );

  return (
    <div className="min-h-screen">
      <ClientOnly>
        <Container>
          <div className="pt-24 grid min-h-screen grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                currentUser={currentUser}
                data={listing}
              />
            ))}
          </div>
        </Container>
      </ClientOnly>
    </div>
  );
};

export default Home;
