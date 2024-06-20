import React from "react"

export function Handbook() {
  return (
    <div className="space-y-4">
      <p className="pt-6 font-bold">Background</p>
      <ul className="list-disc space-y-2 px-5">
        <li>
          Built an identity system at{" "}
          <a
            className="font-bold underline"
            target="_blank"
            href="https://passbase.com"
          >
            Passbase
          </a>
        </li>
        <li>
          Currently building an HR operating system for frontline workers at{" "}
          <a
            className="font-bold underline"
            target="_blank"
            href="https://midlane.com"
          >
            Midlane
          </a>
        </li>
        <li>
          Worked as fullstack software engineer on mobile and web applications
        </li>
        <li>Loves open-source software</li>
      </ul>

      <p className="pt-6 font-bold">Values, Principles, Beliefs</p>
      <ul className="list-disc space-y-2 px-5">
        <li>You can usually reach 80% of the value in 20% of the time</li>
        <li>Engineering velocity is the most important metric to optimize</li>
        <li>
          Solve the hard problems for your customers and make them the heros
        </li>
        <li>I care a lot about UI & UX</li>
        <li>
          Done means it runs in production and is used by customers flawless
        </li>
        <li>Processes kills most of a startups innovation</li>
        <li>
          Better to suffer a lot a short period of time, than only a little over
          a long time
        </li>
        <li>If you truly care about a problem you can&apos;t sleep at night</li>
        <li>The best people want to play in a championship team</li>
      </ul>

      <p className="pt-6 font-bold">Work Style</p>
      <ul className="list-disc space-y-2 px-5">
        <li>
          I love ideating and innovating. I hate making the operational plan for
          it
        </li>
        <li>MVP first, then iteration 1 to n to shape it</li>
        <li>
          I am driven by bursts of energy. Sometimes I don&apos;t get a lot of
          things done, but then a lot in a short amount of time
        </li>
        <li>If it is not written down, it&apos;s not decided</li>
        <li>Don&apos;t bring me the problem, but the solution</li>
        <li>Don&apos;t ask for permission, but for forgiveness</li>
      </ul>

      <p className="pt-6 font-bold">API</p>
      <ul className="list-disc space-y-2 px-5">
        <li>
          If it&apos;s not in my calendar, high chance I won&apos;t show up.
        </li>
        <li>If the meeting could be an email, it should be an email</li>
        <li>
          I usually respond within 24-48h. If I take longer, I don&apos;t
          consider it urgent. If you need an answer earlier, feel free ping me
        </li>
        <li>I usually only take meetings in the afternoon</li>
        <li>Meetings should be max 30 minutes or 1.5h workshops</li>
      </ul>
    </div>
  )
}
