import { redirect } from "next/navigation";

export default async function CorporateRedirect({ params }) {
  const { locale } = await params;
  redirect(`/${locale}/about`);
}
