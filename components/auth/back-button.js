"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export const BackButton = ({ href, label }) => {
  return (
    <Button asChild variant="link" size="sm" className="font-normal w-full">
      <Link href={href}>{label}</Link>
    </Button>
  );
};
