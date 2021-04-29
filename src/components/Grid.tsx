import {
  Box, BoxProps, Flex, Text,
} from '@chakra-ui/layout';
import React, { FunctionComponent, useEffect } from 'react';

export interface GridObject {
  type: string;
  location: Point;
}
export interface Entity {
  name: string;
  id: string;
  alive?: boolean;
  almostDead?: boolean;
  location: Point;
}

export type Point = {
  x: number;
  y: number;
};
export interface Grid {
  name: string;
  id: string;
  width: number;
  height: number;

  entities: Entity[];
  objects: GridObject[];
}

type GridProps = {
  grid: Grid;
  saveGrid?: (grid: Grid) => void;
  selectedPoint?: Point;
  zoom?: number;
};

const CellBoxStyleProps = {
  w: '5rem',
  h: '5rem',
  maxH: '5rem',
  minH: '5rem',
  maxW: '5rem',
  minW: '5rem',
  flex: 1,
};

const CellBox:FunctionComponent<BoxProps> = ({ children }) => (
  <Box {...CellBoxStyleProps} boxSizing="border-box">
    {children}
  </Box>
);

type CellProps = {
  x: number,
  y: number,
};

const CellComponent:FunctionComponent<CellProps> = ({ x, y }) => (
  <Box {...CellBoxStyleProps} boxSizing="border-box" borderRightWidth=".1rem" borderBottomWidth=".1rem" borderLeftWidth={`${x === 0 || y === 0 ? 0.1 : 0}rem`} borderTopWidth={`${x === 0 || y === 0 ? 0.1 : 0}rem`}>
    <Text fontSize="md">
      {x}
      {y}
    </Text>
  </Box>
);

/**
 * This component should only be a pass-through / display component;
 * IE, side-effect functions are called, but not defined inside it.
 * This is so that this component can be used in any situation where
 * the Grid is needed without complicating its functionality.
 */
export const GridComponent:FunctionComponent<GridProps> = ({ grid }) => {
  useEffect(() => {}, []);

  return (
    <Box position="relative" maxH="100vh" maxW="100vw">
      <Flex>
        <CellBox />
        {Array.from({ length: grid.width }, (_v, x) => (
          <CellBox>
            <Text fontSize="md">{x}</Text>
          </CellBox>
        ))}
      </Flex>

      <Flex>
        <Box flex={1} w="5rem">
          {Array.from({ length: grid.height }, (_w, y) => (
            <CellBox>
              <Text fontSize="md">{y}</Text>
            </CellBox>
          ))}
        </Box>

        <Flex>
          {Array.from({ length: grid.width }, (_v, x) => (
            <Flex display="inline-block">
              {Array.from({ length: grid.height }, (_w, y) => <CellComponent x={x} y={y} />)}
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

GridComponent.defaultProps = {
  saveGrid: () => {},
  selectedPoint: {
    x: null,
    y: null,
  },
  zoom: 1,
};
