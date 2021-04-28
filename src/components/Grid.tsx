import { Box } from '@chakra-ui/layout';
import React, { useEffect } from 'react';

export interface Entity {
  name: string;
  id: string;
  alive: boolean;
  almostDead: boolean;
}

export type Cell = {
  location: {
    x: number;
    y: number;
  };
  entity: Entity;
};

export interface Grid {
  name: string;
  id: string;

  /*
    Cells are stored flat (IE not two-dimensionally)
    and are then constructed by GridComponent / any other component
    that wants to directly interact with the grid cells. This seemed
    like the more functional and useful approach.
  */
  cells: Cell[];
}

type GridProps = {
  grid: Grid;
  saveGrid?: (grid: Grid) => void;
  selectedCell?: Cell;
};

/**
 * This component should only be a pass-through / display component;
 * IE, side-effect functions are called, but not defined inside it.
 * This is so that this component can be used in any situation where
 * the Grid is needed without complicating its functionality.
 */
export const GridComponent = ({ grid }: GridProps) => {
  useEffect(() => {}, []);

  return <Box />;
};
