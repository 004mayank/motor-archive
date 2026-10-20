import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "./components";
import { env } from "cloudflare:workers";
import { NewsletterAvailability } from "./newsletter-availability";
export const metadata: Metadata = {
  metadataBase: new URL("https://motor-archive.fynd-8655.chatgpt.site"),
  title: {
    default: "MOTOR / ARCHIVE - The stories behind the machines.",
    template: "%s - MOTOR / ARCHIVE",
  },
  description:
    "An independent automotive journal. One remarkable car at a time. Stories, design, engineering and the road ahead.",
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="top">
        <a className="skip" href="#main">
          Skip to content
        </a>
        <NewsletterAvailability
          available={Boolean(env.RESEND_API_KEY && env.EMAIL_FROM)}
        >
          <Header />
          {children}
          <Footer />
        </NewsletterAvailability>
      </body>
    </html>
  );
}
