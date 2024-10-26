import SensorEnergyIcon from '@/assets/sensorEnergy.png'
import AlertIcon from '@/assets/alert.png'

export const getAdditionalIcons = (status?: string, sensorType?: string) => {
  const icons = []

  if (status === 'alert') {
    icons.push({ src: AlertIcon, alt: 'alert icon' })
  }
  if (sensorType === 'energy') {
    icons.push({ src: SensorEnergyIcon, alt: 'energy sensor icon' })
  }

  return icons
}
