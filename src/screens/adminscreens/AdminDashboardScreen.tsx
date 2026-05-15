// src/screens/admin/AdminDashboardScreen.tsx
import { Helmet } from "react-helmet-async";
import Navbar from "../../common/navbar/Navbar";
import Footer from "../../common/footer/Footer";
import AdminDashboard from "../../components/admin/dashboard/AdminDashboard";

const AdminDashboardScreen = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Admin Dashboard | Wale Lab Nexus</title>
        <meta
          name="description"
          content="Manage publications, users, payments, and platform analytics."
        />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <AdminDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboardScreen;
