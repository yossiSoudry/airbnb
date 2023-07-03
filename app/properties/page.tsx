import getCurrentUser from "../actions/getCurrentUser";
import getListingsByUserId from "../actions/getListingsByUserId";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState subtitle="Please Login" title="Unauthorized" />
      </ClientOnly>
    );
  }

  const listings = await getListingsByUserId({userId: currentUser.id});

  if (listings.length === 0) {
    return (
        <ClientOnly>
          <EmptyState subtitle="No properties found" title="Looks like you have no properties." />
        </ClientOnly>
      );
  }

  return (
    <ClientOnly>
      <PropertiesClient 
      listings={listings}
      currentUser={currentUser}

      />
    </ClientOnly>
  );
};

export default PropertiesPage;