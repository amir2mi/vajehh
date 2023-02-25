import { useEffect } from "react";
import DonateInfo from "@layouts/DonateInfo";
import DonationsList from "@layouts/DonationsList";
import "./style.scss";

export default function DonatePage() {
  useEffect(() => {
    document.title = "واژه | حمایت مالی";
  }, []);

  return (
    <main className="donate-main main-container">
      <DonateInfo />
      <DonationsList />
    </main>
  );
}
