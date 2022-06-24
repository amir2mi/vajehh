import { useState } from "react";
import { Input, Button } from "react-flatifycss";
import config from "../../config.json";

export default function DonateInput() {
  const [amount, setAmount] = useState<number | null>(null);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    window.open(`${config.donateURL}/${amount}`, "_blank");
  };

  return (
    <form className="input-with-button" onSubmit={handleOnSubmit}>
      <Input type="number" min="0" placeholder="مبلغ موردنظر به تومان" onChange={(value) => setAmount(value)}>
        <Button theme="blue">حمایت</Button>
      </Input>
    </form>
  );
}
