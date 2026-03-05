import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
}

export default function PrivacyPage() {
  return (
    <section className="mt-8 space-y-6 text-zinc-700 dark:text-zinc-300">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Privacy Policy
      </h1>
      <p className="text-sm text-zinc-500">Last updated: March 5, 2026</p>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          1. Overview
        </h2>
        <p>
          This website is a personal portfolio. I take your privacy seriously
          and process personal data only as described below and in accordance
          with the General Data Protection Regulation (GDPR).
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          2. Responsible Party
        </h2>
        <p>
          The responsible party for data processing on this website is listed on
          the{" "}
          <a href="/impressum" className="underline">
            Impressum
          </a>{" "}
          page.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          3. Hosting
        </h2>
        <p>
          This website is hosted by Vercel Inc. When you visit this site, Vercel
          may collect technical data such as your IP address, browser type, and
          access times in server log files. This processing is based on Art.
          6(1) lit. f GDPR (legitimate interest in secure and efficient
          operation).
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          4. Analytics
        </h2>
        <p>
          This website uses analytics services (Google Analytics, PostHog, and
          Vercel Analytics) to understand how visitors interact with the site.
          These services may collect anonymized usage data such as pages visited,
          time spent, and referral sources. The legal basis is Art. 6(1) lit. f
          GDPR (legitimate interest in improving the website).
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          5. Cookies
        </h2>
        <p>
          This website may use cookies for analytics and to remember your theme
          preference (light/dark mode). You can configure your browser to reject
          cookies, though this may limit some functionality.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          6. External Services
        </h2>
        <p>
          This website may load content from external services such as Google
          Fonts and GitHub. When accessing these resources, your IP address is
          transmitted to the respective providers. This is based on Art. 6(1)
          lit. f GDPR.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          7. Your Rights
        </h2>
        <p>Under the GDPR, you have the right to:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Access the personal data stored about you (Art. 15 GDPR)</li>
          <li>Rectification of inaccurate data (Art. 16 GDPR)</li>
          <li>Erasure of your data (Art. 17 GDPR)</li>
          <li>Restriction of processing (Art. 18 GDPR)</li>
          <li>Data portability (Art. 20 GDPR)</li>
          <li>Object to processing (Art. 21 GDPR)</li>
        </ul>
        <p>
          To exercise any of these rights, please contact me via the details on
          the{" "}
          <a href="/impressum" className="underline">
            Impressum
          </a>{" "}
          page.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          8. Changes
        </h2>
        <p>
          I may update this privacy policy from time to time. The latest version
          will always be available on this page.
        </p>
      </div>
    </section>
  )
}
