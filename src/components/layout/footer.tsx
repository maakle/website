import { siteConfig } from "@/config/site"

export default function Footer() {
  return (
    <footer className="mt-auto block px-4 pb-2 pt-4 text-sm text-zinc-500 dark:text-zinc-400">
      © {new Date().getFullYear()}{" "}
      <a target="_blank" href={siteConfig.links.linkedin} className="underline">
        Mathias Klenk
      </a>
      . All Rights Reserved.
    </footer>
  )
}
