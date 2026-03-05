import { Metadata } from "next"

import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Impressum",
}

export default function ImpressumPage() {
  return (
    <section className="mt-8 space-y-6 text-zinc-700 dark:text-zinc-300">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Impressum
      </h1>
      <p className="text-sm text-zinc-500">Angaben gemäß § 5 TMG</p>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Contact
        </h2>
        <p>
          Mathias Klenk
          <br />
          E-Mail:{" "}
          <a href="mailto:m@maakle.com" className="underline">
            m@maakle.com
          </a>
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Responsible for Content
        </h2>
        <p>
          Responsible according to § 55 Abs. 2 RStV:
          <br />
          Mathias Klenk
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Liability for Content
        </h2>
        <p>
          As a service provider, I am responsible for my own content on these
          pages according to § 7 Abs. 1 TMG. According to §§ 8 to 10 TMG, I am
          not obligated to monitor transmitted or stored third-party information
          or to investigate circumstances that indicate illegal activity.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Liability for Links
        </h2>
        <p>
          This website contains links to external third-party websites over
          whose content I have no control. I cannot accept any liability for
          these external contents. The respective provider or operator of the
          linked pages is always responsible for their content.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Copyright
        </h2>
        <p>
          The content and works on these pages created by the site operator are
          subject to German copyright law. Reproduction, editing, distribution,
          and any kind of use outside the limits of copyright law require written
          consent of the respective author or creator.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Online Presence
        </h2>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            GitHub:{" "}
            <a
              target="_blank"
              href={siteConfig.links.github}
              className="underline"
            >
              {siteConfig.links.github}
            </a>
          </li>
          <li>
            LinkedIn:{" "}
            <a
              target="_blank"
              href={siteConfig.links.linkedin}
              className="underline"
            >
              {siteConfig.links.linkedin}
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
