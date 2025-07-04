import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type MetadataProps = {
  title?: string;
  description?: string;
  canonical: string;
};

const defaultMetadata = {
  title: "Neyvin Technologies",
  description:
    "Neyvin Technologies offers expert HR services, payroll, regulatory compliance, staffing solutions, and seamless job applications with CV upload support.",
};

export const constructMetadata = ({
  title,
  description = defaultMetadata.description,
  canonical = "/",
}: MetadataProps) => {
  return {
    metadataBase: new URL("https://neyvin.org"),
    title: title ? `${title} - Neyvin` : defaultMetadata.title,
    description,
    keywords: ["neyvin", "ai barcode scanner", "product analyser"],
    alternates: {
      canonical,
    },
    authors: [
      {
        name: "Shashwat Kumar",
        url: "https://github.com/shashwat6204",
      },
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
    },
  };
};

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel
    "http://localhost:3000";

  // Include `https://` when not localhost.
  url = url.startsWith("http") ? url : `https://${url}`;
  // Remove trailing slash if present
  url = url.endsWith("/") ? url.slice(0, -1) : url;
  return url;
};

export function capitalizeInital(input: unknown): string | undefined {
  if (typeof input !== "string") {
    return "";
  }
  if (input.length === 0) {
    return "";
  } else if (input.length === 1) {
    return input.toUpperCase();
  }
  return input.charAt(0).toUpperCase() + input.slice(1);
}
