import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../../common/navbar/Navbar";
import ForgotPassword from "../../components/form/ForgotPassword";
import Footer from "../../common/footer/Footer";

const ForgotPasswordScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Forgot Password | Wale Lab Nexus</title>
        <meta
          name="description"
          content="Reset your Wale Lab Nexus account password. Enter your email to receive a verification code."
        />
      </Helmet>

      <Navbar />
      <main className="flex-grow">
        <ForgotPassword />
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPasswordScreen;
