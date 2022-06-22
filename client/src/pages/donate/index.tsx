import { useEffect, useState } from "react";
import axios from "axios";

export default function DonatePage() {
  useEffect(() => {
    document.title = "واژه | حمایت مالی";
  }, []);

  return <p>Donate</p>;
}
