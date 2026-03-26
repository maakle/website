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
          url="https://soundcloud.com/klenksy/sunset-over-malaga-2025"
          height="150px"
          showComments={true}
        />
        <SoundCloudEmbedded
          url="https://soundcloud.com/klenksy/roofs-of-berlin"
          height="150px"
          showComments={true}
        />
        <SoundCloudEmbedded
          url="https://soundcloud.com/klenksy/schliersee-2024"
          height="150px"
          showComments={true}
        />
        <SoundCloudEmbedded
          url="https://soundcloud.com/klenksy/aven-live-at-project-rabbit-hole"
          height="150px"
          showComments={true}
        />
        <SoundCloudEmbedded
          url="https://soundcloud.com/klenksy/every-day-i-dream"
          height="150px"
          showComments={true}
        />
        <SoundCloudEmbedded
          url="https://soundcloud.com/klenksy/tribal-fever"
          height="150px"
          showComments={true}
        />
        <SoundCloudEmbedded
          url="https://soundcloud.com/klenksy/into-the-forest"
          height="150px"
          showComments={true}
        />
      </div>
    </main>
  )
}
