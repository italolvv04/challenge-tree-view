import React from 'react'
import Image from 'next/image'

// Define the TreeNodeProps type
interface TreeNodeProps {
  node: {
    id: string
    name: string
    type: string
    icon: {
      src: string
    }
    children: TreeNodeProps['node'][]
  }
}

// Define the TreeNodeComponentProps type
interface TreeNodeComponentProps {
  node: TreeNodeProps['node']
}

export const TreeNodeComponent = React.memo(
  ({ node }: TreeNodeComponentProps) => {
    return (
      <li>
        <div>
          <Image
            src={node.icon.src}
            alt={`${node.type} icon`}
            width={16}
            height={16}
          />
          {node.name}
        </div>
        {node.children.length > 0 && (
          <ul>
            {node.children.map((child) => (
              <TreeNodeComponent key={child.id} node={child} />
            ))}
          </ul>
        )}
      </li>
    )
  }
)

// Add display name for better debugging
TreeNodeComponent.displayName = 'TreeNodeComponent'
