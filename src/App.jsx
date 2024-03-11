import { useState } from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <h1 className="text-3xl font-bold underline mb-4">Hello world!</h1>
      <Button colorScheme="blue">Button</Button>
    </ChakraProvider>
  );
}

export default App;
