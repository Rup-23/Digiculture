import { checkRole } from "@/utils/role";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const isAdmin = await checkRole("digi_culture");

  if (!isAdmin) {
    redirect("/");
  }

  return <>{children}</>; // ✅ Children me Client Component load hoga
}
