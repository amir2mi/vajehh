import { useEffect, useState, useMemo, useCallback } from "react";
import { Loading } from "react-flatifycss";
import { getDonations } from "../../services/api";
import { Donator } from "../../components";
import DonationsHeader from "./DonationsHeader";
import "./style.scss";

interface donations {
  amount: number;
  date: string;
  email: string;
  name: string;
  url: string;
}

export default function DonationsList() {
  const [donations, setDonations] = useState<donations[]>([]);
  const [filteredBy, setFilteredBy] = useState<"date" | "amount">("amount");

  // By default [donations] is ordered by date [DESC].
  // Just when we fetch donations, sort one-time and save the result here for further usages
  const [donationsByAmount, setDonationsByAmount] = useState<donations[]>([]);

  const handleFetchDonations = useCallback(async () => {
    try {
      const { data } = await getDonations();
      setDonations(data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const totalDonations = useMemo(
    () => donations && donations.reduce((acc: number, curr: donations) => acc + curr.amount, 0),
    [donations]
  );

  useEffect(() => {
    handleFetchDonations();
  }, [handleFetchDonations]);

  useEffect(() => {
    // updated sorted by amount when donations list changes
    if (!donations) return;
    const filteredByAmount = [...donations].sort((a, b) => b.amount - a.amount);
    setDonationsByAmount(filteredByAmount);
  }, [donations]);

  return (
    <section className="donate-list-wrapper anim-delay-items">
      <DonationsHeader
        total={totalDonations}
        donatorsCount={donations.length}
        filteredBy={filteredBy}
        onFilter={setFilteredBy}
      />
      <div className="donate-list">
        {!donations ? (
          <Loading className="donations-loading" />
        ) : (
          (filteredBy === "date" ? donations : donationsByAmount).map((item, index) => (
            <Donator key={index + item.amount} className="anim-delay anim-rise" {...item} />
          ))
        )}
      </div>
    </section>
  );
}
