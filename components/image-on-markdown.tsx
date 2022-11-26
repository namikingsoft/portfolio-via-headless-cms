import Image from 'next/image'

const ImageOnMarkdown = (props: JSX.IntrinsicElements['img']) => {
  const { src, alt } = props
  const matchDimension = alt?.match(/{([0-9]+)x([0-9]+)}/)

  return src && alt && matchDimension ? (
    <Image
      src={src.replace(/^\/\//, 'https://')}
      alt={alt}
      width={Number.parseInt(matchDimension[1])}
      height={Number.parseInt(matchDimension[2])}
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element -- image dimension not found
    <img {...props} />
  )
}

export default ImageOnMarkdown
