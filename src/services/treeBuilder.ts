import { Asset, Location, TreeNode } from '@/interfaces'

import locationIcon from '@/assets/location.png'
import assetIcon from '@/assets/asset.png'
import componentIcon from '@/assets/component.png'

export function buildTree(locations: Location[], assets: Asset[]): TreeNode[] {
  // Transform locations into tree nodes
  const locationNodes: TreeNode[] = locations.map((location) => ({
    id: location.id,
    name: location.name,
    type: 'location',
    children: [],
    icon: locationIcon,
  }))

  const locationMap = new Map<string, TreeNode>(
    locationNodes.map((node) => [node.id, node])
  )

  // Temporary arrays for orphan assets and components
  const orphanAssets: TreeNode[] = []
  const orphanComponents: TreeNode[] = []

  // Initialize assetMap before using it
  const assetMap = new Map<string, TreeNode>()

  assets.forEach((asset) => {
    const assetNode: TreeNode = {
      id: asset.id,
      name: asset.name,
      type: asset.sensorType ? 'component' : 'asset',
      sensorType: asset.sensorType,
      status: asset.status,
      gatewayId: asset.gatewayId,
      sensorId: asset.sensorId,
      children: [],
      icon: asset.sensorType ? componentIcon : assetIcon,
    }

    assetMap.set(asset.id, assetNode)
  })

  // Transform assets into tree nodes
  assets.forEach((asset) => {
    const assetNode = assetMap.get(asset.id) as TreeNode

    if (asset.locationId) {
      const locationNode = locationMap.get(asset.locationId)
      if (locationNode) {
        locationNode.children.push(assetNode)
      } else {
        console.warn(`Location with ID ${asset.locationId} not found`)
      }
    } else if (asset.parentId) {
      const parentAssetNode = assetMap.get(asset.parentId)
      if (parentAssetNode) {
        parentAssetNode.children.push(assetNode)
      } else {
        console.warn(`Parent asset with ID ${asset.parentId} not found`)
      }
    } else {
      if (asset.sensorType) {
        orphanComponents.push(assetNode)
      } else {
        orphanAssets.push(assetNode)
      }
    }

    // Add assetNode to assetMap
    if (!asset.sensorType) {
      assetMap.set(asset.id, assetNode)
    }
  })

  // Connect locations
  locations.forEach((location) => {
    if (location.parentId) {
      const parentLocationNode = locationMap.get(location.parentId)
      const childLocationNode = locationMap.get(location.id)
      if (parentLocationNode && childLocationNode) {
        parentLocationNode.children.push(childLocationNode)
      }
    }
  })

  // Combine locations and orphan assets
  const rootNodes = Array.from(locationMap.values()).filter(
    (location) => !locations.find((loc) => loc.id === location.id)?.parentId
  )

  return [...rootNodes, ...orphanAssets, ...orphanComponents]
}
