import React from "react"

export function Introduction() {
  return (
    <div className="space-y-4 p-4">
      <p>Hey, I'm Mathias! 👋</p>
      <p>
        I'm a full-stack developer and tech entrepreneur based in Berlin, Germany. Currently, I work as CTO at <a className="font-bold underline" target="_blank" href="https://midlane.com">Midlane</a>. Previously I built and sold a KYC & digital identity company called <a className="font-bold underline" target="_blank" href="https://passbase.com">Passbase</a>.
      </p>
      <p>I love open-source and solving hard technical problems. My first love was iOS development and Swift. Over the years I more and more felt in love with web apps and the Javascript ecosystem.</p>
      <p>
        My favorite tech stack for building apps is {" "}
        <span className="font-semibold">Next.js</span> with{" "}
        <span className="font-semibold">TypeScript</span> for the frontend.{" "}
        <span className="font-semibold">Tailwind</span> for styles.{" "}
        <span className="font-semibold">Prisma</span> as ORM with {" "}
        <span className="font-semibold">Postgres</span> as database. Hosted on {" "}
        <span className="font-semibold">Vercel</span> or {" "}
        <span className="font-semibold">AWS</span>.

      </p>
    </div>
  )
}
