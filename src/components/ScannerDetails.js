import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Center,
  Heading,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function ScannerDetails() {
  const [scannerDetails, setScannerDetails] = useState([]);

  useEffect(() => {
    fetch("https://wavescan-internship.saurabhmudgal.repl.co/success")
      .then((response) => response.json())
      .then((data) => {
        setScannerDetails(data);
        //console.log(data); 
      });
  }, []);
  

  return (
    <Box rounded={"lg"} boxShadow={"lg"} p={8} bg={"gray.50"}>
    
      <Heading size="md">Scanners found: {scannerDetails.length}</Heading>
      <Box overflowX={"auto"}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Scanner Name</Th>
              <Th>IP Address</Th>
              <Th isNumeric>Scanner Speed</Th>
              <Th>Is Available</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {scannerDetails.map((scanner, index) => (
              <Tr key={index}>
                <Td>{scanner.scannerName}</Td>
                <Td>{scanner.ipAddress}</Td>
                <Td>
                  <Center>{scanner.scannerSpeed + " m/s"}</Center>
                </Td>
                <Td>{scanner.isAvailable === "true" ? "Available" : "Engaged"}</Td>
                <Td>
                  {scanner.isAvailable === "true" ? (
                    <Button colorScheme="blue">Connect</Button>
                  ) : (
                    <Button colorScheme="gray">Connect</Button>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
