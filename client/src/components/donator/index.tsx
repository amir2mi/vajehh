import clsx from "clsx";
import gravatarUrl from "gravatar-url";
import defaulyAvatar from "../../assets/images/none.jpeg";
import "./style.scss";

interface DonatorProps {
  amount: number;
  className: string;
  email: string;
  name: string;
  url?: string;
}

export default function Donator(props: DonatorProps) {
  const { className, email, name, url, amount } = props;
  const avatarOptions = {
    size: 100,
    default: "identicon",
  };

  const avatarUrl = email ? gravatarUrl(email, avatarOptions) : defaulyAvatar;

  return (
    <div className={clsx("donator-item", className)}>
      <img className="avatar" src={avatarUrl} alt={name} loading="lazy" />
      {url ? (
        <a className="name" href={url} target="_blank" rel="nofollow noreferrer noopener">
          {name}
        </a>
      ) : (
        <p className="name">{name}</p>
      )}

      <span className="amount flex-center">
        {amount.toLocaleString("fa-IR")} <span className="size-xs">﷼</span>
      </span>
    </div>
  );
}
