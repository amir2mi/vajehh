import { useState } from "react";

export default function ResultImage() {
  const [imageUrl, setImageUrl] = useState<string>("");

  return <img src={imageUrl} alt="" />;
}
