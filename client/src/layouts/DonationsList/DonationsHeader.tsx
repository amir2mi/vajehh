import clsx from "clsx";
import { ButtonGroup, Button } from "react-flatifycss";

interface DonationsHeaderProps {
  donatorsCount: number;
  filteredBy: "date" | "amount";
  onFilter: (filter: "date" | "amount") => void;
  total: number;
}

export default function DonationsHeader(props: DonationsHeaderProps) {
  const { donatorsCount, filteredBy, onFilter, total } = props;

  // convert numbers to local
  const totalLocal = total ? total.toLocaleString("fa-IR") : 0;
  const donatorsCountLocal = donatorsCount ? donatorsCount.toLocaleString("fa-IR") : 0;

  return (
    <div className="donations-header anim-rise">
      <div className="info">
        <h3 className="title">حامیان واژه</h3>
        <p className="total">
          مجموعا مبلغ {totalLocal} ریال توسط {donatorsCountLocal} حامی
        </p>
      </div>
      <div className="filters">
        <ButtonGroup size="sm">
          <Button className={clsx(filteredBy === "date" && "active style-blue")} onClick={() => onFilter("date")}>
            آخرین
          </Button>
          <Button className={clsx(filteredBy === "amount" && "active style-blue")} onClick={() => onFilter("amount")}>
            بیشترین
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
