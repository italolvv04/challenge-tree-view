import { TreeNode } from '@/interfaces'

export function filterByText(tree: TreeNode[], searchText: string): TreeNode[] {
  if (!searchText) return tree

  const normalizeText = (text: string) =>
    text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .toLowerCase()

  const normalizedSearchText = normalizeText(searchText)

  const filterNodes = (node: TreeNode): TreeNode | null => {
    if (normalizeText(node.name).includes(normalizedSearchText)) {
      return node
    }

    if (node.children) {
      const filteredChildren = node.children
        .map(filterNodes)
        .filter(Boolean) as TreeNode[]
      if (filteredChildren.length > 0) {
        return { ...node, children: filteredChildren }
      }
    }

    return null
  }

  return tree.map(filterNodes).filter(Boolean) as TreeNode[]
}

export function filterBySensorType(
  tree: TreeNode[],
  sensorType: string
): TreeNode[] {
  const filterNodes = (node: TreeNode): TreeNode | null => {
    if (node.sensorType === sensorType) {
      return node
    }

    if (node.children) {
      const filteredChildren = node.children
        .map(filterNodes)
        .filter(Boolean) as TreeNode[]

      if (filteredChildren.length > 0) {
        return { ...node, children: filteredChildren }
      }
    }

    return null
  }

  const filteredTree = tree.map(filterNodes).filter(Boolean) as TreeNode[]
  return filteredTree
}

export function filterByStatus(tree: TreeNode[], status: string): TreeNode[] {
  const filterNodes = (node: TreeNode): TreeNode | null => {
    if (node.status === status) {
      return node
    }

    if (node.children) {
      const filteredChildren = node.children
        .map(filterNodes)
        .filter(Boolean) as TreeNode[]
      if (filteredChildren.length > 0) {
        return { ...node, children: filteredChildren }
      }
    }

    return null
  }

  const filteredTree = tree.map(filterNodes).filter(Boolean) as TreeNode[]
  return filteredTree
}
