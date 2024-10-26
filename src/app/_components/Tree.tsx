import { useState } from 'react'
import Image from 'next/image'

import { TreeNode } from '@/interfaces'
import { getAdditionalIcons } from '../utils/icons'

interface TreeProps {
  nodes: TreeNode[]
  onSelectItem: (item: TreeNode) => void
  expanded?: boolean
  filterId?: string
}

export const Tree = ({
  nodes,
  onSelectItem,
  expanded,
  filterId,
}: TreeProps) => {
  return (
    <ul>
      {nodes.map((node) => (
        <TreeNodeComponent
          key={`node.${node.id} ${filterId}`}
          node={node}
          onSelectItem={onSelectItem}
          expanded={expanded}
        />
      ))}
    </ul>
  )
}

interface TreeNodeComponentProps {
  node: TreeNode
  onSelectItem: (item: TreeNode) => void
  expanded?: boolean
}

const TreeNodeComponent = ({
  node,
  onSelectItem,
  expanded = false,
}: TreeNodeComponentProps) => {
  const [isExpanded, setIsExpanded] = useState(expanded)
  const additionalIcons = getAdditionalIcons(node.status, node.sensorType)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const isAsset = node.type === 'component'

  return (
    <li className="relative">
      <div
        className={`flex items-center ${isAsset ? 'cursor-pointer' : ''}`}
        onClick={isAsset ? () => onSelectItem(node) : undefined}
      >
        {node.children.length > 0 && (
          <button
            onClick={toggleExpand}
            className="mr-4 text-lg border-dotted border-gray-300 p-1"
          >
            {isExpanded ? '▼' : '▶'}
          </button>
        )}
        <Image
          src={node.icon.src}
          alt={`${node.type} icon`}
          width={24}
          height={24}
        />
        <span className="ml-4 text-lg">{node.name}</span>
        {additionalIcons.map((icon, index) => (
          <Image
            key={index}
            src={icon.src}
            alt={icon.alt}
            width={10}
            height={10}
            className="ml-2"
          />
        ))}
      </div>
      {isExpanded && node.children.length > 0 && (
        <ul className="ml-8 relative">
          {node.children.map((child, index) => (
            <li key={child.id} className="relative">
              <span
                className={`absolute left-[-1.25rem] top-0 ${
                  index !== node.children.length - 1 ? 'h-full' : 'h-1/2'
                } border-l-2 border-dotted border-gray-300`}
              />
              <TreeNodeComponent
                node={child}
                onSelectItem={onSelectItem}
                expanded={expanded}
              />
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}
