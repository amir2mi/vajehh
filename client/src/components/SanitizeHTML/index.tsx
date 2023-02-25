import xss from "xss";

interface SanitizeHTMLProps {
  children: string;
}

export default function SanitizeHTML({ children }: SanitizeHTMLProps) {
  return <div dangerouslySetInnerHTML={{ __html: xss(children) }} />;
}
