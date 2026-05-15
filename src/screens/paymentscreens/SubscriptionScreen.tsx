// src/screens/payment/SubscriptionScreen.tsx
import { Helmet } from "react-helmet-async";
import Navbar from "../../common/navbar/Navbar";
import Footer from "../../common/footer/Footer";
import SubscriptionPlans from "../../components/payment/SubscriptionPlans";

const SubscriptionScreen = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Subscription Plans | Wale Lab Nexus</title>
        <meta
          name="description"
          content="Choose the right subscription plan to access premium research content from Wale University."
        />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <SubscriptionPlans />
      </main>
      <Footer />
    </div>
  );
};

export default SubscriptionScreen;
