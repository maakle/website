import Link from "next/link"

import { siteConfig } from "@/config/site"

export default function Footer() {
  return (
    <footer className="mt-auto block space-y-1 px-4 pb-2 pt-4 text-sm text-zinc-500 dark:text-zinc-400">
      <div>
        © {new Date().getFullYear()}{" "}
        <a
          target="_blank"
          href={siteConfig.links.linkedin}
          className="underline"
        >
          Mathias Klenk
        </a>
        . All Rights Reserved.
      </div>
      <div className="flex gap-3">
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>
        <Link href="/impressum" className="underline">
          Impressum
        </Link>
      </div>
    </footer>
  )
}
