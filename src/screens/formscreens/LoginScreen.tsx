import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../../common/navbar/Navbar";
import Login from "../../components/form/Login";
import Footer from "../../common/footer/Footer";

const LoginScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Login | Wale Lab Nexus</title>
        <meta
          name="description"
          content="Login to your Wale Lab Nexus account to access research publications, prototypes, and impact data."
        />
      </Helmet>

      <Navbar />

      <main className="flex-grow">
        <Login />
      </main>

      <Footer />
    </div>
  );
};

export default LoginScreen;
