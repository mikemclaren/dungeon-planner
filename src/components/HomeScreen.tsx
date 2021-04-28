import React from "react";
import { Box, Button, Center, Flex, Heading, HStack, Icon, Link, VStack } from "@chakra-ui/react";
import { GiDoorway, GiDramaMasks } from "react-icons/gi";
import { Link as RouterLink } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { newGridModalOpenState, savedGridsState } from "../atoms/grids";
import NewGridModal from "./NewGridModal";

import { Grid } from "./Grid";

export function HomeScreen () {
  const grids = useRecoilValue(savedGridsState);
  const setNewGridModalOpen = useSetRecoilState(newGridModalOpenState);

  const openNewGridModal = () => {
    setNewGridModalOpen(true);
  };

  return (
    <Center>
      <Box
        maxWidth="container.xl"
        width="90%"
        padding="2em"
      >
        <Heading marginBottom="1em">Hello. 👋 {grids.length > 0 && "We've saved a few plans of yours."}</Heading>
        <Flex
          width="100%"
          marginBottom="12"
        >
          <HStack
            flex={1}
          >
            <Button leftIcon={<Icon as={GiDoorway} />} onClick={openNewGridModal}>Create New Play Zone</Button>
            <Button leftIcon={<Icon as={GiDramaMasks} />}>Create New Character</Button>
          </HStack>
        </Flex>
        <Flex
          width="100%"
        >
          <Box
            flex={1}
          >
            {grids.length > 0 && <Heading as="h3" size="md">Your Saved Play Zones</Heading>}
            {grids.map((grid: Grid) => (
              <Box key={grid.id}>
                <Link textDecoration="underline" as={RouterLink} to={`/grids/${grid.id}`}>{grid.name}</Link>
              </Box>
            ))}
          </Box>
          <Box
            flex={1}
          >
            <Heading as="h3" size="md">Your Saved Characters</Heading>
          </Box>
        </Flex>
      </Box>
    </Center>
  );
};

export default HomeScreen;