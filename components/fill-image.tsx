import Image from 'next/image'
import cn from 'classnames'
import styles from './fill-image.module.css'

type AspectRatio = 'video' | 'retain'

type Props = {
  src: string
  alt: string
  aspectRatio: AspectRatio
  className?: string
}

const FillImage = ({ src, alt, aspectRatio, className }: Props) => {
  return (
    <div
      className={cn(className, 'relative', {
        'aspect-video': aspectRatio === 'video',
        [styles.retainAspectRatio]: aspectRatio === 'retain',
      })}
    >
      <Image
        src={src}
        alt={alt}
        layout="fill"
        className={cn({
          'object-cover object-top': aspectRatio === 'video',
        })}
      />
    </div>
  )
}

export default FillImage
