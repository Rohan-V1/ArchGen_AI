import { Loader2 } from "lucide-react";

export default function Spinner({ size = 16 }) {
  return <Loader2 size={size} className="spinner" aria-hidden="true" />;
}
