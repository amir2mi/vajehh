import { useEffect, useState } from "react";
import { getDonations } from "../../services/api";

export default function DonationsList() {
  const [donations, setDonations] = useState<any>([]);

  const handleFetchDonations = async () => {
    try {
      const { data } = await getDonations();
      setDonations(data);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    handleFetchDonations();
  }, []);

  return (
    <div className="donate-list">
      {donations.map((item) => (
        <>
          {item.name}
          <br />
        </>
      ))}
    </div>
  );
}
