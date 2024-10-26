import { ImageProps, StaticImageData } from 'next/image'

export interface Location {
  id: string
  name: string
  parentId?: string
}

export interface Asset {
  id: string
  name: string
  locationId?: string
  parentId?: string
  sensorType?: string
  status?: 'operating' | 'alert'
  sensorId?: string
  gatewayId?: string
}

export interface TreeNode {
  id: string
  name: string
  type: 'location' | 'asset' | 'component'
  sensorType?: string
  status?: string
  icon: StaticImageData
  sensorId?: string
  gatewayId?: string
  children: TreeNode[]
}

export interface TreeViewProps {
  companyId: string
  searchTerm?: string
  sensorType?: string | null
  status?: string | null
  onSelectItem?: (item: TreeNode) => void
}

export interface UnitLinkProps extends Omit<ImageProps, 'src' | 'alt'> {
  href: string
  name: string
  imageSrc: StaticImageData
  imageAlt: string
  imageWidth: number
  imageHeight: number
  isActive: boolean
  handleClick: () => void
}

export interface CompanyContextProps {
  activeCompany: string | null
  setActiveCompany: (name: string) => void
  companies: Company[]
  activeCompanyId: string | null
  setActiveCompanyId: (id: string) => void
}

export interface SensorContextProps {
  activeSensor: string | null
  setActiveSensor: (sensor: string) => void
  sensorType: string | null
  setSensorType: (type: string | null) => void
  status: string | null
  setStatus: (status: string | null) => void
  energyFilter: boolean
  setEnergyFilter: (value: boolean) => void
  criticalStatusFilter: boolean
  setCriticalStatusFilter: (value: boolean) => void
}

export interface SensorProps {
  isActive: boolean
  href: string
  iconSrc: StaticImageData
  altText: string
  label: string
  toggleActive: () => void
  handleClick: () => void
}

export interface Company {
  id: string
  name: string
}


export interface ItemDetailsProps {
  selectedItem: TreeNode | null
}