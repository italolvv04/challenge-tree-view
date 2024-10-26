import Link from 'next/link'
import Image from 'next/image'
import { SensorProps } from '@/interfaces'

export const FilterLink = ({
  altText,
  href,
  iconSrc,
  label,
  isActive,
  handleClick,
  toggleActive,
}: SensorProps) => {
  return (
    <Link
      href={href}
      className={`flex items-center w-auto h-[32px] gap-[6px] rounded-[3px] border border-gray-200 pl-[14px] pr-[16px] pt-[6px] pb-[6px] whitespace-nowrap ${
        isActive ? 'bg-colorLink' : 'bg-white'
      }`}
      onClick={(e) => {
        e.preventDefault()
        toggleActive()
        handleClick()
      }}
    >
      <Image
        src={iconSrc}
        alt={altText}
        width={16}
        height={16}
        className={`${isActive ? 'filter brightness-0 invert' : ''}`}
      />
      <span className={isActive ? 'text-white' : 'text-blue-500'}>{label}</span>
    </Link>
  )
}
