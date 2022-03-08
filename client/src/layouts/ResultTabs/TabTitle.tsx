import { Badge, Loading } from "react-flatifycss";

interface TabTitleProps {
  title: string;
  value: number | undefined;
}

export default function TabTitle({ title, value }: TabTitleProps) {
  return (
    <>
      {title}
      {value === -1 ? (
        <Badge className="tab-button-loading">
          <Loading />
        </Badge>
      ) : value ? (
        <Badge>{value}</Badge>
      ) : null}
    </>
  );
}
