// src/screens/dashboard/UserDashboardScreen.tsx
import { Helmet } from "react-helmet-async";
import Navbar from "../../common/navbar/Navbar";
import Footer from "../../common/footer/Footer";
import UserDashboard from "../../components/dashboard/UserDashboard";

const UserDashboardScreen = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>My Dashboard | Wale Lab Nexus</title>
        <meta
          name="description"
          content="Access your publications, downloads, and account settings."
        />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <UserDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboardScreen;
