import { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | NEXA Studio",
  description: "Official Privacy Policy for NEXA Studio digital branding and web development services.",
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}