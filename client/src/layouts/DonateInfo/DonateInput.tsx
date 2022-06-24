import { useState } from "react";
import { Input, Button } from "react-flatifycss";
import config from "../../config.json";

export default function DonateInput() {
  const [amount, setAmount] = useState<string | number | null>(null);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    window.open(`${config.donateURL}/${amount}`, "_blank");
  };

  return (
    <form className="input-with-button" onSubmit={handleOnSubmit}>
      <Input required type="number" min="0" placeholder="مبلغ موردنظر به تومان" onChange={(value) => setAmount(value)}>
        <Button state="static" theme="blue">حمایت</Button>
      </Input>
    </form>
  );
}
