// src/screens/publications/PublicationDetailScreen.tsx
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Navbar from "../../common/navbar/Navbar";
import Footer from "../../common/footer/Footer";
import PublicationDetail from "../../components/publications/PublicationDetail";

const PublicationDetailScreen = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Publication Details | Wale Lab Nexus</title>
        <meta
          name="description"
          content="View detailed publication information, abstract, and access options."
        />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <PublicationDetail publicationId={id} />
      </main>
      <Footer />
    </div>
  );
};

export default PublicationDetailScreen;
