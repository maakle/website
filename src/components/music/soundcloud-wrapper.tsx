import React, { ElementType } from "react"

export type SoundCloudEmbeddedProps = {
  width?: string
  height?: string
  url: string
  autoPlay?: boolean
  hideRelated?: boolean
  showComments?: boolean
  showUser?: boolean
  showReposts?: boolean
  visual?: boolean
  color?: string
}

const SoundCloudEmbedded: ElementType<SoundCloudEmbeddedProps> = ({
  url,
  width = "100%",
  height = "450px",
  autoPlay = false,
  hideRelated = false,
  showComments = false,
  showUser = true,
  showReposts = false,
  visual = true,
  color = "ff5500",
}: SoundCloudEmbeddedProps) => {
  const src = visual
    ? `https://w.soundcloud.com/player/?url=${url}&amp;auto_play=${autoPlay}&amp;hide_related=${hideRelated}&amp;show_comments=${showComments}&amp;show_user=${showUser}&amp;show_reposts=${showReposts}&amp;visual=${visual}`
    : `https://w.soundcloud.com/player/?url=${url}&amp;color=${color}&amp;auto_play=${autoPlay}&amp;hide_related=${hideRelated}&amp;show_comments=${showComments}&amp;show_user=${showUser}&amp;show_reposts=${showReposts}`

  return (
    <iframe
      width={width}
      height={visual ? height : "auto"}
      scrolling="no"
      src={src}
    />
  )
}

export default SoundCloudEmbedded
