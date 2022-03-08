import { Article } from "../../components";
import content from "./help.md";

export default function HelpPage() {
  return <Article file={content} />;
}
