"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
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
                <ul className="flex items-center space-x-2 text-sm text-zinc-500 dark:text-zinc-400">
                  <li>
                    <Link
                      className="rounded-md px-3 py-2 hover:bg-muted"
                      href="/"
                      onClick={handleClick}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="rounded-md px-3 py-2 hover:bg-muted"
                      href="/handbook"
                      onClick={handleClick}
                    >
                      Handbook
                    </Link>
                  </li>
                  <li>
                    <a
                      className="rounded-md px-3 py-2 hover:bg-muted"
                      target="_blank"
                      href="https://blog.maakle.com"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <Link
                      className="rounded-md px-3 py-2 hover:bg-muted"
                      href="/music"
                      onClick={handleClick}
                    >
                      Music
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="rounded-md px-3 py-2 hover:bg-muted"
                      href="/statistics"
                      onClick={handleClick}
                    >
                      Statistics
                    </Link>
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
                <DisclosureButton
                  as="a"
                  href="/"
                  className="block rounded-md py-2 pl-3 pr-4 text-base font-medium hover:bg-muted"
                >
                  Home
                </DisclosureButton>
                <DisclosureButton
                  as="a"
                  href="/handbook"
                  className="block rounded-md py-2 pl-3 pr-4 text-base font-medium hover:bg-muted"
                >
                  Handbook
                </DisclosureButton>
                <DisclosureButton className="w-full text-left">
                  <a
                    className="block rounded-md py-2 pl-3 pr-4 text-base font-medium hover:bg-muted"
                    target="_blank"
                    href="https://blog.maakle.com"
                  >
                    Blog
                  </a>
                </DisclosureButton>
                <DisclosureButton
                  as="a"
                  href="/music"
                  className="block rounded-md py-2 pl-3 pr-4 text-base font-medium hover:bg-muted"
                >
                  Music
                </DisclosureButton>
                <DisclosureButton
                  as="a"
                  href="/statistics"
                  className="block rounded-md py-2 pl-3 pr-4 text-base font-medium hover:bg-muted"
                >
                  Statistics
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
