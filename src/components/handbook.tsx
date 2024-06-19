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
        <li>Loves open-source</li>
      </ul>

      <p className="pt-6 font-bold">Values, Principles, Beliefs</p>
      <ul className="list-disc space-y-2 px-5">
        <li>We solve the hard problems and make our customers the heros</li>
        <li>Engineering velocity is the most important metric to optimize</li>
        <li>I care a lot about UI & UX</li>
        <li>
          Done means code that runs in production and is used by customers
        </li>
        <li>Processes kills most innovation</li>
        <li>
          It&apos;s better to suffer a short period a lot, than a long time a
          little bit
        </li>
        <li>If you truly care about a problem you can&apos;t sleep at night</li>
        <li>The best people want to play in a Championship team</li>
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
    </div>
  )
}
