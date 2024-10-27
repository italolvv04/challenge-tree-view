import Image from 'next/image'
import { ItemDetailsProps } from '@/interfaces'

import Sensor from '@/assets/sensor.png'
import Receptor from '@/assets/receptor.png'
import Motor from '@/assets/motor.png'
import ElectricIcon from '@/assets/iconElectric.png'
import { getAdditionalIcons } from '../utils/icons'

export const AssetDetails = ({ selectedItem }: ItemDetailsProps) => {
  const additionalIcons = getAdditionalIcons(
    selectedItem?.status,
    selectedItem?.sensorType
  )

  return (
    <div className="flex-grow mt-3 md:mt-0 border p-4 overflow-y-auto ml-2">
      <div className="w-full h-[56px] p-[12px_16px] gap-[8px] border-b border-neutral-150 flex items-center">
        <span className="font-inter text-lg font-medium leading-7 text-left flex items-center">
          {selectedItem ? (
            <>
              {selectedItem.name}
              {additionalIcons.map((icon, index) => (
                <Image
                  key={index}
                  src={icon.src}
                  alt={icon.alt}
                  width={10}
                  height={10}
                  className="ml-4"
                />
              ))}
            </>
          ) : (
            'Selecione um componente'
          )}
        </span>
      </div>
      {selectedItem && (
        <>
          <div className="flex flex-col lg:flex-row mt-4 gap-6">
            <div className="w-full lg:w-[336px] h-auto lg:h-[226px] gap-[10px] rounded-tl-[4px] border">
              <div className="w-full h-auto lg:w-[336px] lg:h-[226px] min-w-[150px] min-h-[100px] max-w-[336px] max-h-[226px]">
                <Image
                  src={Motor}
                  alt="motor"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center mt-4 lg:mt-0">
              <div className="text-left">
                <div className="font-inter text-[16px] font-medium leading-[24px] mb-2">
                  Tipo do equipamento
                </div>
                <span className="font-normal text-[#88929C]">
                  <span> Motor Elétrico ( Trifásico ) </span>
                </span>
                <div className="w-full lg:w-[391px] h-0 border-t border-neutral-150 mt-2" />
              </div>
              <div className="text-left mt-4">
                <div className="font-inter text-[16px] font-medium leading-[24px] mb-2">
                  Responsáveis
                </div>
                <div className="flex gap-2">
                  <Image
                    src={ElectricIcon}
                    width={24}
                    height={24}
                    alt="eletricIcon"
                  />
                  <span> Elétrica </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-0 border-t border-neutral-150 mt-8" />

          <div className="flex">
            <div className="text-left mt-4 flex-1">
              <div className="font-inter text-[16px] font-medium leading-[24px]">
                <span>Sensor</span>
              </div>
              <div className="flex gap-2">
                <Image src={Sensor} alt="sensor" width={24} height={24} />
                {selectedItem?.sensorId || 'N/A'}
              </div>
            </div>
            <div className="text-left mt-4 flex-1">
              <div className="font-inter text-[16px] font-medium leading-[24px]">
                <span>Receptor</span>
              </div>
              <div className="flex gap-2">
                <Image src={Receptor} alt="receptor" width={24} height={24} />
                {selectedItem?.gatewayId || 'N/A'}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
