import FillImage from './fill-image'

type Props = {
  src: string
  alt: string
  width: number
  height: number
  aspectRatio?: number
  priority?: boolean
}

const ThumbImage = ({
  src,
  alt,
  width,
  height,
  aspectRatio,
  priority,
}: Props) => {
  return (
    <FillImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="shadow-small hover:shadow-medium transition-shadow duration-200"
      aspectRatio={aspectRatio}
      priority={priority}
    />
  )
}

export default ThumbImage
