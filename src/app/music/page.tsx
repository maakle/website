import { HeadingText } from "@/components/common/heading-text"
import SoundCloudEmbedded from "@/components/music/soundcloud-wrapper"

export const metadata = {
  title: "Music",
  description: "Details about me producing music",
}

export default async function Music() {
  return (
    <main className="items-center px-4 py-8">
      <div className="space-y-4">
        <HeadingText subtext="Details about me producing music">
          Music
        </HeadingText>
        <SoundCloudEmbedded
          url="https://soundcloud.com/avenmusik/aven-live-at-project-rabbit-hole"
          height="150px"
          showComments={true}
        />
        <SoundCloudEmbedded
          url="https://soundcloud.com/avenmusik/every-day-i-dream"
          height="150px"
          showComments={true}
        />
        <SoundCloudEmbedded
          url="https://soundcloud.com/avenmusik/tribal-fever"
          height="150px"
          showComments={true}
        />
        <SoundCloudEmbedded
          url="https://soundcloud.com/avenmusik/into-the-forest"
          height="150px"
          showComments={true}
        />
      </div>
    </main>
  )
}
