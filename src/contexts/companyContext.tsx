import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
} from 'react'

import useFetchCompanies from '@/contexts/hooks/useFetchCompanies'
import { CompanyContextProps } from '@/interfaces'

const CompanyContext = createContext<CompanyContextProps | undefined>(undefined)

export const CompanyProvider = ({ children }: { children: ReactNode }) => {
  const { companies, error } = useFetchCompanies()
  const [activeCompany, setActiveCompany] = useState<string | null>(null)
  const [activeCompanyId, setActiveCompanyId] = useState<string | null>(null)

  useEffect(() => {
    if (companies.length > 0) {
      setActiveCompany(companies[0].name)
      setActiveCompanyId(companies[0].id)
    }
  }, [companies])

  const value = useMemo(
    () => ({
      activeCompany,
      setActiveCompany,
      companies,
      activeCompanyId,
      setActiveCompanyId,
      error,
    }),
    [activeCompany, companies, activeCompanyId, error]
  )

  return (
    <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
  )
}

export const useCompany = () => {
  const context = useContext(CompanyContext)

  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider')
  }

  return context
}
