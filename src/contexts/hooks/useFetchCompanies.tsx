import { useState, useEffect } from 'react'

import { Company } from '@/interfaces'
import { fetchAllLocations } from '@/services/api'

const useFetchCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetchAllLocations()
        if (Array.isArray(response)) {
          setCompanies(response)
        } else {
          setError('Invalid data format')
        }
      } catch (error) {
        console.log(error)
        setError('Failed to fetch companies')
      }
    }

    fetchCompanies()
  }, [])

  return { companies, error }
}

export default useFetchCompanies
