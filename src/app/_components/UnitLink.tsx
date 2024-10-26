import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { UnitLinkProps } from '@/interfaces'

export const UnitLink = ({
  href,
  name,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  isActive,
  handleClick,
  ...imageProps
}: UnitLinkProps) => {
  return (
    <Link
      href={href}
      className={`flex justify-between gap-2 rounded-sm items-center w-full h-6 p-2 ${
        isActive ? 'bg-colorLink' : 'bg-unitLink'
      }`}
      onClick={handleClick}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
        {...imageProps}
      />
      <span className="text-white font-light text-xs leading-4 text-center p-1 font-inter whitespace-nowrap">
        {name} Unit
      </span>
    </Link>
  )
}
