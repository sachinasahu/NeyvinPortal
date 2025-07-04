import Vision from "@/components/vision";
import { constructMetadata } from "../../lib/utils";
import { Metadata } from "next/types";

export const metadata: Metadata = constructMetadata({
  title: "Our Mission & Vision",
  description: "Discover Neyvin Technologies' mission and vision for building next-generation technology and creating a tech-driven future.",
  canonical: "/vision",
});

export default function VisionPage() {
  return (
    <>
      <Vision />
    </>
  );
} 