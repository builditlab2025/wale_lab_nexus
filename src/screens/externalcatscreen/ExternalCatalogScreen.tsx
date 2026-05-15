// src/screens/external/ExternalCatalogScreen.tsx
import { Helmet } from "react-helmet-async";
import Navbar from "../../common/navbar/Navbar";
import Footer from "../../common/footer/Footer";
import ExternalCatalog from "../../components/external/ExternalCatalog";

const ExternalCatalogScreen = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>External Catalog | Wale Lab Nexus</title>
        <meta
          name="description"
          content="Discover cutting-edge research and innovation from Wale University. Access premium publications and technical reports."
        />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <ExternalCatalog />
      </main>
      <Footer />
    </div>
  );
};

export default ExternalCatalogScreen;
