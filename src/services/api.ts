import dotenv from 'dotenv'

dotenv.config()

const API_BASE_URL = process.env.API_BASE_URL

export const fetchAllLocations = async () => {
  const response = await fetch(`${API_BASE_URL}/companies`)

  if (!response.ok) {
    throw new Error('Failed to fetch all companies')
  }

  return response.json()
}

export const fetchLocations = async (companyId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/companies/${companyId}/locations`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch locations')
  }

  return response.json()
}

export const fetchAssets = async (companyId: string) => {
  const response = await fetch(`${API_BASE_URL}/companies/${companyId}/assets`)

  if (!response.ok) {
    throw new Error('Failed to fetch assets')
  }

  return response.json()
}
