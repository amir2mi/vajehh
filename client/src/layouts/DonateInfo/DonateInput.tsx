import { FormEvent, useState } from "react";
import { Input, Button } from "react-flatifycss";
import config from "../../config.json";

export default function DonateInput() {
  const [amount, setAmount] = useState<string | number | null>(null);

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    const rialAmount = parseInt(String(amount)) * 10;
    window.open(`${config.donateURL}/${rialAmount}`, "_blank");
  };

  return (
    <form className="input-with-button" onSubmit={handleOnSubmit}>
      <Input required type="number" min="0" placeholder="مبلغ موردنظر به تومان" onChange={(value) => setAmount(value)}>
        <Button state="static" theme="blue">
          حمایت
        </Button>
      </Input>
    </form>
  );
}
