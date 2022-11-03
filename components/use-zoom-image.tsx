import { MdClose } from 'react-icons/md'
import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

/* eslint-disable @next/next/no-img-element -- via CMS */

type Props = {
  src: string
  onClose: () => void
}

const ZoomImage = ({ src, onClose }: Props) => {
  const [initilized, setInitialized] = useState(false)

  useEffect(() => {
    setInitialized(true)
  }, [])

  return (
    globalThis?.document &&
    createPortal(
      <div
        className={`fixed top-0 left-0 bottom-0 right-0 transition duration-300 bg-black ${
          initilized ? 'bg-opacity-75' : 'bg-opacity-0'
        }`}
        onClick={onClose}
      >
        <div className="w-full h-full text-center p-0 md:p-16 overflow-scroll">
          <img
            src={src}
            alt="Zoom Image"
            className={`transition-transform duration-300 ${
              initilized ? 'scale-100' : 'scale-0'
            }`}
          />
        </div>
        <div className="absolute top-5 right-5 rounded-full p-3 bg-black hover:bg-opacity-100 cursor-pointer bg-opacity-50 drop-shadow">
          <MdClose className=" text-gray-300 hover:text-white cursor-pointer text-3xl drop-shadow-md" />
        </div>
      </div>,
      globalThis.document.body,
    )
  )
}

const useZoomImage = (selector: string): ReactNode => {
  const [zoomImageSrc, setZoomImageSrc] = useState<string>()

  useEffect(() => {
    const handleClick = (event: Event) => {
      event.preventDefault()
      const eventTarget = event.currentTarget
      if (eventTarget instanceof HTMLAnchorElement) {
        const thumbSrc = eventTarget.querySelector('img')!.src
        setZoomImageSrc(
          thumbSrc === eventTarget.href ? eventTarget.href : thumbSrc,
        )
      }
    }

    document.querySelectorAll(selector).forEach((elm) => {
      elm.addEventListener('click', handleClick)
    })

    return () => {
      document.querySelectorAll(selector).forEach((elm) => {
        elm.removeEventListener('click', handleClick)
      })
    }
  }, [])

  useEffect(() => {
    document.querySelectorAll(selector).forEach((elm) => {
      elm.classList.add('cursor-zoom-in')
    })

    return () => {
      document.querySelectorAll(selector).forEach((elm) => {
        elm.classList.remove('cursor-zoom-in')
      })
    }
  })

  return (
    zoomImageSrc && (
      <ZoomImage
        src={zoomImageSrc}
        onClose={() => setZoomImageSrc(undefined)}
      />
    )
  )
}

export default useZoomImage
