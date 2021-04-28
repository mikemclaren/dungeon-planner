import React, { useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

import HomeScreen from "./HomeScreen";
import GridScreen from "./GridScreen";

import theme from "../theme";
import ModalManager from "./ModalManager";

const AppRouter = () => {
  return (
    <ChakraProvider theme={theme}>
      <HashRouter>
        <Box>
          <RecoilRoot>
            <Switch>
              <Route exact path="/" component={HomeScreen} />
              <Route exact path="/grids/:gridId" component={GridScreen} />
            </Switch>

            <ModalManager />
          </RecoilRoot>
        </Box>
      </HashRouter>
    </ChakraProvider>
  );
};

export default AppRouter;
