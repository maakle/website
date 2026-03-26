import { HeadingText } from "@/components/common/heading-text"
import { Handbook } from "@/components/handbook"

export const metadata = {
  title: "Handbook",
  description: "How I work & operate",
}

export default async function Music() {
  return (
    <main className="items-center px-4 py-8">
      <div className="space-y-4">
        <HeadingText subtext="How I work & operate">Handbook</HeadingText>
        <Handbook />
      </div>
    </main>
  )
}
