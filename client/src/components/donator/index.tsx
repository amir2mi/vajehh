import gravatarUrl from "gravatar-url";
import "./style.scss";

interface DonatorProps {
  amount: number;
  email: string;
  name: string;
  url?: string;
}

export default function Donator(props: DonatorProps) {
  const { email, name, url, amount } = props;
  const avatarOptions = {
    size: 100,
    default: "identicon",
  };

  return (
    <div className="donator-item">
      <img className="avatar" src={gravatarUrl(email, avatarOptions)} alt={name} loading="lazy" />
      <a className="name" href={url} target="_blank" rel="nofollow noreferrer noopener">
        {name}
      </a>
      <span className="amount flex-center">
        {amount.toLocaleString("fa-IR")} <span className="size-xs">﷼</span>
      </span>
    </div>
  );
}
