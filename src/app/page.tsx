'use client'

import { useState } from 'react'
import { useCompany } from '@/contexts/companyContext'
import { useSensor } from '@/contexts/sensorContext'
import { TreeNode } from '@/interfaces'

import ThunderBolt from '@/assets/thunderBolt.png'
import ExclamationCircle from '@/assets/exclamationCircle.png'

import { FilterLink } from './_components/FilterLink'
import { TreeView } from './_components/TreeView'
import { AssetDetails } from './_components/AssetsDetails'

export default function Home() {
  const { activeCompany, activeCompanyId } = useCompany()
  const {
    activeSensor,
    setActiveSensor,
    setSensorType,
    sensorType,
    setStatus,
    status,
  } = useSensor()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItem, setSelectedItem] = useState<TreeNode | null>(null)

  const handleEnergyFilter = () => {
    setSensorType(sensorType === 'energy' ? '' : 'energy')
    setActiveSensor(sensorType === 'energy' ? '' : 'Sensor de Energia')
    setStatus('')
  }

  const handleCriticalFilter = () => {
    setStatus(status === 'alert' ? '' : 'alert')
    setActiveSensor(status === 'alert' ? '' : 'Crítico')
    setSensorType('')
  }

  const sensorLinks = [
    {
      name: 'Sensor de Energia',
      href: '/',
      imageSrc: ThunderBolt,
      imageAlt: 'thunderBolt',
      handleClick: handleEnergyFilter,
    },
    {
      name: 'Crítico',
      href: '/',
      imageSrc: ExclamationCircle,
      imageAlt: 'exclamationCircle',
      handleClick: handleCriticalFilter,
    },
  ]

  return (
    <div className="w-full h-[53rem] p-2">
      <div className="w-full mx-auto p-4 pt-0 bg-white h-full border border-gray-300 rounded-tl-md gap-3">
        <div className="flex justify-between mt-2">
          <p>
            <span className="font-semibold font-inter text-xl leading-7 mr-2">
              Ativos
            </span>
            / {activeCompany}
          </p>

          <div className="flex items-center gap-4">
            {sensorLinks.map((link) => (
              <FilterLink
                key={link.name}
                href={link.href}
                iconSrc={link.imageSrc}
                altText={link.imageAlt}
                label={link.name}
                isActive={activeSensor === link.name}
                handleClick={() => {
                  setActiveSensor(link.name)
                  link.handleClick()
                }}
                toggleActive={() => {
                  setActiveSensor(activeSensor === link.name ? '' : link.name)
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row mt-3">
          <div className="flex flex-col flex-shrink-0 w-full md:w-[479px] h-[720px]">
            <input
              type="text"
              placeholder="Buscar Ativo ou Local"
              className="p-2 border border-gray-300 rounded-md w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="h-full w-full border p-4 overflow-y-auto">
              {activeCompanyId && (
                <TreeView
                  companyId={activeCompanyId}
                  searchTerm={searchTerm}
                  sensorType={sensorType}
                  status={status}
                  onSelectItem={(item) => {
                    setSelectedItem({
                      ...item,
                      sensorId: item.sensorId,
                      gatewayId: item.gatewayId,
                    })
                  }}
                />
              )}
            </div>
          </div>
          <AssetDetails selectedItem={selectedItem} />
        </div>
      </div>
    </div>
  )
}
