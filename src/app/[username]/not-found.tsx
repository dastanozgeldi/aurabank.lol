import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <PageHeader
        title="user not found"
        description="if you just changed your username, click profile on the user menu."
      />
      <Button asChild>
        <Link href="/">
          <HomeIcon /> Return Home
        </Link>
      </Button>
    </>
  );
}
