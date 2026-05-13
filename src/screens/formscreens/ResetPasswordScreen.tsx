import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../../common/navbar/Navbar";
import ResetPassword from "../../components/form/ResetPassword";
import Footer from "../../common/footer/Footer";

const ResetPasswordScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Reset Password | Wale Lab Nexus</title>
        <meta
          name="description"
          content="Create a new password for your Wale Lab Nexus account."
        />
      </Helmet>

      <Navbar />
      <main className="flex-grow">
        <ResetPassword />
      </main>
      <Footer />
    </div>
  );
};

export default ResetPasswordScreen;
