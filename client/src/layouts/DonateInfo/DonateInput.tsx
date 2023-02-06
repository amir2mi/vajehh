import { FormEvent, useState } from "react";
import { Input, Button, Checkbox } from "react-flatifycss";
import config from "../../config.json";

export default function DonateInput() {
  const [amount, setAmount] = useState<string | number | null>(null);
  const [isEuro, setIsEuro] = useState<boolean>(false);

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    window.open(`${config.donateURL}/${isEuro ? "euro" : "toman"}/${amount}`, "_blank");
  };

  return (
    <form className="input-with-button" onSubmit={handleOnSubmit}>
      <Input
        required
        type="number"
        min="0"
        placeholder={`مبلغ موردنظر به ${isEuro ? "یورو" : "تومان"}`}
        onChange={(value) => setAmount(value)}
      >
        <Button state="static" theme="blue">
          حمایت
        </Button>
      </Input>
      <Checkbox size="sm" checked={isEuro} onClick={() => setIsEuro(!isEuro)} sx={`margin-bottom: 2em`}>
        خارج ایران هستم (€)
      </Checkbox>
    </form>
  );
}
