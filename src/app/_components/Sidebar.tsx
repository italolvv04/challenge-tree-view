'use client'

import Image from 'next/image'
import { useCompany } from '@/contexts/companyContext'

import Logo from '@/assets/logo.png'
import Gold from '@/assets/gold.png'

import { UnitLink } from './UnitLink'

export const Sidebar = () => {
  const { activeCompany, setActiveCompany, companies, setActiveCompanyId } =
    useCompany()

  return (
    <div className="flex flex-col md:flex-row justify-between w-full max-h-screen py-4 bg-sidebar overflow-y-auto">
      <div className="flex items-center mb-4 md:mb-0">
        <Image
          src={Logo}
          alt="logo"
          width={100}
          height={100}
          className="ml-4"
        />
      </div>

      <div className="flex gap-2 mr-4">
        {companies.map((link) => (
          <UnitLink
            imageSrc={Gold}
            key={link.name}
            href={'/'}
            imageAlt="gold"
            imageWidth={14}
            imageHeight={14}
            name={link.name}
            isActive={activeCompany === link.name}
            handleClick={() => {
              setActiveCompany(link.name)
              setActiveCompanyId(link.id)
            }}
          />
        ))}
      </div>
    </div>
  )
}
