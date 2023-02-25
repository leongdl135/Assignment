import { Flex, Image } from "@chakra-ui/react";
import Form from "./components/Form";

function App() {
  return (
    <Flex justifyContent="center" alignItems="center" minHeight="100vh">
      <Image src="http://she1k.com/wp-content/uploads/2021/04/wavescan-logo.png" position="absolute" top="-7" left="5" width="150px" height="150px" />
      <Form />
    </Flex>
  );
}

export default App;

