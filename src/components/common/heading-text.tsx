interface HeadingProps {
  children: string
  subtext?: string
}

export function HeadingText({ children, subtext }: HeadingProps) {
  return (
    <div>
      <h1 className="text-lg font-semibold">{children}</h1>
      {subtext && (
        <h2 className="text-zinc-500 dark:text-zinc-400">
          {subtext}
        </h2>
      )}
    </div>
  )
}
