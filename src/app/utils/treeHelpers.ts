import { TreeNode } from '@/interfaces'
import { filterByStatus, filterBySensorType, filterByText } from './filters'

export const filterTree = (
  tree: TreeNode[],
  searchText: string,
  sensorType?: string,
  criticalStatus?: string
): TreeNode[] => {
  let filteredTree = filterByText(tree, searchText)

  if (sensorType) {
    filteredTree = filterBySensorType(filteredTree, sensorType)
  }

  if (criticalStatus) {
    filteredTree = filterByStatus(filteredTree, criticalStatus)
  }

  return filteredTree
}
