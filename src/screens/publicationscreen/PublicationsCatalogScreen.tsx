// src/screens/publications/PublicationsCatalogScreen.tsx
import { Helmet } from "react-helmet-async";
import Navbar from "../../common/navbar/Navbar";
import Footer from "../../common/footer/Footer";
import PublicationsCatalog from "../../components/publications/PublicationsCatalog";

const PublicationsCatalogScreen = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Publications Catalog | Wale Lab Nexus</title>
        <meta
          name="description"
          content="Browse our collection of research publications, journals, and technical reports."
        />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <PublicationsCatalog />
      </main>
      <Footer />
    </div>
  );
};

export default PublicationsCatalogScreen;
