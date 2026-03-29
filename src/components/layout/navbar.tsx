"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react"
import { HiMenuAlt2, HiOutlineX } from "react-icons/hi"

import { siteConfig } from "@/config/site"

import { ModeToggle } from "../mode-toggle"

export default function Navbar() {
  const [navbar, setNavbar] = useState(false)
  const pathname = usePathname()

  const handleClick = async () => {
    setNavbar(false)
  }

  useEffect(() => {
    if (navbar) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [navbar])

  return (
    <nav className="select-none bg-background px-4">
      <Disclosure as="nav">
        {({ open }) => (
          <>
            <div className="flex justify-between">
              <Link
                href="/"
                onClick={handleClick}
                className="flex items-center"
              >
                <h1 className="text-lg font-bold">
                  {siteConfig.name}
                  <span className="animate-ping">_</span>
                </h1>
              </Link>
              <div className="hidden gap-4 sm:flex">
                <ul className="flex items-center space-x-2 text-sm">
                  {[
                    { href: "/", label: "Home" },
                    { href: "/handbook", label: "Handbook" },
                    { href: "/music", label: "Music" },
                    { href: "/statistics", label: "Statistics" },
                  ].map(({ href, label }) => {
                    const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href)
                    return (
                      <li key={href}>
                        <Link
                          className={`rounded-md px-3 py-2 hover:bg-muted ${
                            isActive
                              ? "font-medium text-foreground"
                              : "text-zinc-500 dark:text-zinc-400"
                          }`}
                          href={href}
                          onClick={handleClick}
                        >
                          {label}
                        </Link>
                      </li>
                    )
                  })}
                  <li>
                    <a
                      className="rounded-md px-3 py-2 text-zinc-500 hover:bg-muted dark:text-zinc-400"
                      target="_blank"
                      href="https://www.techfounderstack.com"
                    >
                      Blog
                    </a>
                  </li>
                </ul>
                <ModeToggle />
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 hover:bg-muted focus:outline-none">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <HiOutlineX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <HiMenuAlt2 className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
            </div>
            <DisclosurePanel className="rounded-lg p-1 shadow-xl dark:bg-neutral-900 sm:hidden">
              <div className="space-y-1 pb-3 pt-2">
                {[
                  { href: "/", label: "Home" },
                  { href: "/handbook", label: "Handbook" },
                  { href: "/music", label: "Music" },
                  { href: "/statistics", label: "Statistics" },
                ].map(({ href, label }) => {
                  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href)
                  return (
                    <DisclosureButton
                      key={href}
                      as="a"
                      href={href}
                      className={`block rounded-md py-2 pl-3 pr-4 text-base hover:bg-muted ${
                        isActive
                          ? "font-medium text-foreground"
                          : "text-zinc-500 dark:text-zinc-400"
                      }`}
                    >
                      {label}
                    </DisclosureButton>
                  )
                })}
                <DisclosureButton className="w-full text-left">
                  <a
                    className="block rounded-md py-2 pl-3 pr-4 text-base text-zinc-500 hover:bg-muted dark:text-zinc-400"
                    target="_blank"
                    href="https://www.techfounderstack.com"
                  >
                    Blog
                  </a>
                </DisclosureButton>
                <ModeToggle />
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </nav>
  )
}
