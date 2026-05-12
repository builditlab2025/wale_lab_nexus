// src/screens/homescreen/HomeScreen.tsx
import { Helmet } from "react-helmet-async";
import Navbar from "../../common/navbar/Navbar";
import Home from "../../components/home/Home";
import Footer from "../../common/footer/Footer";

const HomeScreen = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>Wale Lab Nexus | Innovation and Real World Applications</title>
          <meta
            name="description"
            content="Wale Lab is an innovative initiative of Wale University, focused on research, innovation, and real-world applications."
          />
        </Helmet>

        <Navbar />

        <main className="flex-grow">
          <Home />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HomeScreen;
