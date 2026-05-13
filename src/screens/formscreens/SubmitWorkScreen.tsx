import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../../common/navbar/Navbar";
import SubmitWork from "../../components/form/SubmitWork";
import Footer from "../../common/footer/Footer";

const SubmitWorkScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Submit Work | Wale Lab Nexus</title>
        <meta
          name="description"
          content="Submit your research, prototypes, or impact case studies to the Wale Lab Nexus public evidence layer."
        />
      </Helmet>

      <Navbar />
      <main className="flex-grow">
        <SubmitWork />
      </main>
      <Footer />
    </div>
  );
};

export default SubmitWorkScreen;
