import React from "react"

import { Cube } from "./animation/cube"

export function Introduction() {
  return (
    <div className="space-y-4 p-4">
      <Cube />
      <p>Hey, I&apos;m Mathias! 👋</p>
      <p>
        I&apos;m a full-stack developer & tech entrepreneur based in Berlin.
        Currently, I work as CTO at{" "}
        <a
          className="font-bold underline"
          target="_blank"
          href="https://midlane.com"
        >
          Midlane
        </a>
        . Previously I built & sold a digital identity company called{" "}
        <a
          className="font-bold underline"
          target="_blank"
          href="https://passbase.com"
        >
          Passbase
        </a>
        .
      </p>
      <p>
        My first programming love was iOS development and Swift. Over the years
        I also started to fall in love with web applications and the Javascript
        ecosystem.
      </p>
      <p>
        Currently, my favorite tech stack for building apps is{" "}
        <span className="font-semibold">Next.js</span> with{" "}
        <span className="font-semibold">TypeScript</span>,{" "}
        <span className="font-semibold">Tailwind</span> for styles,{" "}
        <span className="font-semibold">Prisma</span> as ORM with{" "}
        <span className="font-semibold">Postgres</span> as a database. Hosted on{" "}
        <span className="font-semibold">Vercel</span> or{" "}
        <span className="font-semibold">AWS</span>.
      </p>
      <p>
        Sometimes, I write small angel checks into other tech startups.
        Investments include:{" "}
        <a
          className="font-bold underline"
          target="_blank"
          href="https://wemolo.com"
        >
          Wemolo
        </a>
        ,{" "}
        <a
          className="font-bold underline"
          target="_blank"
          href="https://www.fides.technology/en/"
        >
          Fides
        </a>
        ,{" "}
        <a
          className="font-bold underline"
          target="_blank"
          href="https://www.turnkey.com/"
        >
          Turnkey
        </a>
        ,{" "}
        <a
          className="font-bold underline"
          target="_blank"
          href="https://www.euclidpower.com/"
        >
          Euclid
        </a>
        ,{" "}
        <a
          className="font-bold underline"
          target="_blank"
          href="https://www.rex.app/"
        >
          Rex
        </a>
        ,{" "}
        <a
          className="font-bold underline"
          target="_blank"
          href="https://www.synonym.bio/"
        >
          Synomym
        </a>
        ,{" "}
        <a
          className="font-bold underline"
          target="_blank"
          href="https://www.dashworks.ai/"
        >
          Dashworks
        </a>
        , or{" "}
        <a
          className="font-bold underline"
          target="_blank"
          href="https://popcorn.space/"
        >
          Popcorn
        </a>{" "}
        and a few more.{" "}
      </p>
    </div>
  )
}
