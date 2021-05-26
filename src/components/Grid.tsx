import {
  Box, BoxProps, Center, Flex, Text,
} from '@chakra-ui/layout';
import React, { FunctionComponent, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@chakra-ui/button';
import Icon from '@chakra-ui/icon';
import { AiOutlinePlus } from 'react-icons/ai';
import { useColorModeValue } from '@chakra-ui/color-mode';

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
  updateGrid?: (grid: Grid) => void;
  selectedPoint?: Point;
  zoom?: number;
  selectPoint?: (point: Point) => void;
};

const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const convertNumToAlpha = (num: number): string => ALPHA[num];

const CellBoxStyleProps = {
  w: '5rem',
  h: '5rem',
  maxH: '5rem',
  minH: '5rem',
  maxW: '5rem',
  minW: '5rem',
  flex: 1,
};

const CellBox: FunctionComponent<BoxProps> = ({ children }) => (
  <Box {...CellBoxStyleProps} boxSizing="border-box">
    <Center w="5rem" h="5rem">
      {children}
    </Center>
  </Box>
);

CellBox.propTypes = {
  children: PropTypes.element.isRequired,
};

type CellProps = {
  x: number;
  y: number;
  selectPoint: (point: Point) => void;
};

const CellComponent: FunctionComponent<CellProps> = ({ x, y, selectPoint }) => {
  const selectCell = () => {
    selectPoint({ x, y });
  };

  return (
    <Box
      {...CellBoxStyleProps}
      boxSizing="border-box"
      borderColor="gray.400"
      borderRightWidth=".1em"
      borderBottomWidth=".1em"
      borderLeftWidth={`${x === 0 ? 0.1 : 0}em`}
      borderTopWidth={`${y === 0 ? 0.1 : 0}em`}
      cursor="pointer"
      textColor="gray.300"
      _hover={{
        bgColor: useColorModeValue('gray.300', 'gray.700'),
        textColor: 'gray.100',
      }}
      onClick={selectCell}
    >
      <Center w="5rem" h="5rem" position="relative">
        <Text
          fontSize="sm"
          fontWeight="semibold"
          position="absolute"
          bottom="0.2em"
          right="0.4em"
        >
          {convertNumToAlpha(x)}
          {y}
        </Text>
      </Center>
    </Box>
  );
};

CellComponent.defaultProps = {
  selectPoint: () => null,
};

CellComponent.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  selectPoint: PropTypes.func,
};

/**
 * This component should only be a pass-through / display component;
 * IE, side-effect functions are called, but not defined inside it.
 * This is so that this component can be used in any situation where
 * the Grid is needed without complicating its functionality.
 */
export const GridComponent: FunctionComponent<GridProps> = ({
  grid, updateGrid, selectedPoint, selectPoint, zoom,
}) => {
  const addColumnToGrid = () => {
    updateGrid({ ...grid, width: grid.width + 1 });
  };

  const addRowToGrid = () => {
    updateGrid({ ...grid, height: grid.height + 1 });
  };

  return (
    <Box position="relative" maxH="100vh" maxW="100vw">
      <Flex>
        <CellBox />
        {Array.from({ length: grid.width }, (_v, x) => (
          <CellBox>
            <Text fontSize="xl" fontWeight="extrabold" color="teal">
              {convertNumToAlpha(x)}
            </Text>
          </CellBox>
        ))}
        <CellBox>
          <IconButton colorScheme="teal" size="lg" icon={<Icon as={AiOutlinePlus} />} aria-label="Add Column" onClick={addColumnToGrid} />
        </CellBox>
      </Flex>

      <Flex justifyItems="flex-start">
        <Box flex={1} w="5em">
          {Array.from({ length: grid.height }, (_w, y) => (
            <CellBox>
              <Text fontSize="xl" fontWeight="extrabold" color="teal">
                {y}
              </Text>
            </CellBox>
          ))}
          <CellBox>
            <IconButton colorScheme="teal" size="lg" icon={<Icon as={AiOutlinePlus} />} aria-label="Add Row" onClick={addRowToGrid} />
          </CellBox>
        </Box>

        <Flex>
          {Array.from({ length: grid.width }, (_v, x) => (
            <Flex display="inline-block">
              {Array.from({ length: grid.height }, (_w, y) => (
                <CellComponent x={x} y={y} selectPoint={selectPoint} />
              ))}
            </Flex>
          ))}
        </Flex>

        <Box flex={1} w="5em" />
      </Flex>
    </Box>
  );
};

GridComponent.defaultProps = {
  updateGrid: () => null,
  selectedPoint: {
    x: null,
    y: null,
  },
  zoom: 1,
  selectPoint: () => null,
};

GridComponent.propTypes = {
  grid: PropTypes.exact({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    entities: PropTypes.arrayOf(PropTypes.exact({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      alive: PropTypes.bool,
      almostDead: PropTypes.bool,
      location: PropTypes.exact({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      }).isRequired,
    })),
    objects: PropTypes.arrayOf(PropTypes.exact({
      type: PropTypes.string.isRequired,
      location: PropTypes.exact({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      }).isRequired,
    })),
  }).isRequired,
  updateGrid: PropTypes.func,
  zoom: PropTypes.number,
  selectedPoint: PropTypes.exact({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  selectPoint: PropTypes.func,
};
