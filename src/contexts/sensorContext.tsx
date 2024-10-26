import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

import { SensorContextProps } from '@/interfaces'

const SensorContext = createContext<SensorContextProps | undefined>(undefined)

export const SensorProvider = ({ children }: { children: ReactNode }) => {
  const [activeSensor, setActiveSensor] = useState<string | null>(null)
  const [sensorType, setSensorType] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)

  const [energyFilter, setEnergyFilter] = useState<boolean>(false)
  const [criticalStatusFilter, setCriticalStatusFilter] =
    useState<boolean>(false)

  const sensorContextValue = useMemo(
    () => ({
      activeSensor,
      setActiveSensor,
      sensorType,
      setSensorType,
      status,
      setStatus,
      energyFilter,
      setEnergyFilter,
      criticalStatusFilter,
      setCriticalStatusFilter,
    }),
    [activeSensor, sensorType, status, energyFilter, criticalStatusFilter]
  )

  return (
    <SensorContext.Provider value={sensorContextValue}>
      {children}
    </SensorContext.Provider>
  )
}

export const useSensor = () => {
  const context = useContext(SensorContext)

  if (!context) {
    throw new Error('useSensor must be used within a SensorProvider')
  }

  return context
}
