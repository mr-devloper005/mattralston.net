import { redirect } from "next/navigation";

/** Blog listing is not used; send visitors to the home feed. */
export default function BlogPage() {
  redirect("/");
}
