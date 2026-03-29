import { HeadingText } from "@/components/common/heading-text"
import SoundCloudEmbedded from "@/components/music/soundcloud-wrapper"
import { YouTubeEmbed } from "@/components/music/youtube-embed"

export const metadata = {
  title: "Music",
  description: "DJ sets, original productions and live recordings by klenksy",
}

const youtubeVideos = [
  {
    id: "_MLIGQ7LqeY",
    title: "Afro House DJ Set – Cape Town 2026",
  },
  {
    id: "MhT0awzoa_o",
    title: "Afro House & Melodic Techno – NYE 2025, El Gouna",
  },
  {
    id: "-D1jvppKpgY",
    title: "Sunset DJ Set in Málaga – Melodic House Mix",
    soundcloudUrl: "https://soundcloud.com/klenksy/sunset-over-malaga-2025",
  },
]

const soundcloudTracks: string[] = [
  "https://soundcloud.com/klenksy/sunset-over-malaga-2025",
  "https://soundcloud.com/klenksy/roofs-of-berlin",
  "https://soundcloud.com/klenksy/schliersee-2024",
  "https://soundcloud.com/klenksy/aven-live-at-project-rabbit-hole",
  "https://soundcloud.com/klenksy/every-day-i-dream",
  "https://soundcloud.com/klenksy/tribal-fever",
  "https://soundcloud.com/klenksy/into-the-forest",
]

export default async function Music() {
  return (
    <main className="items-center px-4 py-8">
      <div className="space-y-10">
        <HeadingText subtext="DJ sets, original productions and live recordings">
          Music
        </HeadingText>

        {/* YouTube DJ Sets */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Video Sets
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {youtubeVideos.map((video) => (
              <div key={video.id} className="space-y-2">
                <YouTubeEmbed videoId={video.id} title={video.title} />
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium">{video.title}</p>
                  {video.soundcloudUrl && (
                    <a
                      href={video.soundcloudUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-md bg-[#ff5500]/10 px-2 py-0.5 text-xs font-medium text-[#ff5500] transition-colors hover:bg-[#ff5500]/20"
                    >
                      SoundCloud
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SoundCloud Tracks */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            SoundCloud Sets
          </h2>
          <div className="space-y-3">
            {soundcloudTracks.map((url) => (
              <SoundCloudEmbedded
                key={url}
                url={url}
                height="150px"
                showComments={true}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
