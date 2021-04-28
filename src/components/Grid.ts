export interface Entity {
  name: string
  id: string
  alive: boolean
  almostDead: boolean
}

export type Cell = {
  location: {
    x: number
    y: number  
  },
  entity: Entity,
}

export interface Grid {
  name: string
  id: string
  cells: Cell[]
}

