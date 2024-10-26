import { useEffect, useState } from 'react'

import { useDebounce } from '@/hooks/useDebounce'
import { Asset, TreeNode, TreeViewProps } from '@/interfaces'
import { fetchAssets, fetchLocations } from '@/services/api'
import { buildTree } from '@/services/treeBuilder'
import { filterTree } from '../utils/treeHelpers'
import { Tree } from './Tree'

export const TreeView = ({
  companyId,
  searchTerm,
  sensorType,
  status,
  onSelectItem = () => {},
}: TreeViewProps) => {
  const [treeData, setTreeData] = useState<TreeNode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [locations, setLocations] = useState<TreeNode[]>([])
  const [assets, setAssets] = useState<Asset[]>([])

  const debouncedSearchTerm = useDebounce(searchTerm || '', 500)
  const filterId = `${companyId}-${sensorType}-${status}-${debouncedSearchTerm}`
  const hasFilters = sensorType || status || debouncedSearchTerm

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [locations, assets] = await Promise.all([
          fetchLocations(companyId),
          fetchAssets(companyId),
        ])
        setLocations(locations)
        setAssets(assets)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        )
      }
    }

    fetchInitialData()
  }, [companyId])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let tree = buildTree(locations, assets)

        tree = filterTree(
          tree,
          debouncedSearchTerm,
          sensorType || undefined,
          status || undefined
        )

        setTreeData(tree)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [locations, assets, debouncedSearchTerm, sensorType, status])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <Tree
      nodes={treeData}
      onSelectItem={onSelectItem}
      expanded={!!hasFilters}
      filterId={filterId}
    />
  )
}
