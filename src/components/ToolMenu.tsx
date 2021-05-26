import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button, Icon, Menu, MenuButton, MenuItem, MenuList, Text,
} from '@chakra-ui/react';
import React from 'react';
import { GiStoneWall } from 'react-icons/gi';

export enum Tools {
  Wall = 'WALL',
}

type ToolMenuProps = {
  selectTool: (tool: Tools) => () => void;
}

const ToolMenu = ({
  selectTool,
}: ToolMenuProps) => (
  <Menu>
    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
      Tools
    </MenuButton>
    <MenuList>
      <MenuItem onClick={selectTool(Tools.Wall)}>
        <Icon as={GiStoneWall} mr=".4em" />
        <Text>Wall Mode</Text>
      </MenuItem>
    </MenuList>
  </Menu>
);

export default ToolMenu;
