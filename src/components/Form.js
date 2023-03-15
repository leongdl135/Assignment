import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Select,
  Center,
  FormErrorMessage
} from "@chakra-ui/react";
import { useState } from "react";
import ScannerDetails from "./ScannerDetails";
import { isValidDimension, isValidName, isValidFrequency } from "../utils/validation";

export default function Form() {
  const [projectName, setProjectName] = useState("");
  const [nameError, setNameError] = useState("");
  const [scanningMode, setScanningMode] = useState("GANTRY");
  const [scanDimensionsX, setScanDimensionsX] = useState(1);
  const [scanXError, setScanXError] = useState("")
  const [scanDimensionsY, setScanDimensionsY] = useState(1);
  const [scanYError, setScanYError] = useState("")
  const [scannerFrequency, setScannerFrequency] = useState(100);
  const [FrequencyError, setFrequencyError] = useState("")
  const [formSuccess, setFormSuccess] = useState(false);


  const handleNameChange = (event) => {
    const input = event.target.value;
    setProjectName(input);
    setNameError(isValidName(input))
  }

  const handleDimensionXChange = (event) => {
    const input = event.target.value;
    setScanDimensionsX(input);
    setScanXError(isValidDimension(input))
  }

  const handleDimensionYChange = (event) => {
    const input = event.target.value;
    setScanDimensionsY(input);
    setScanYError(isValidDimension(input))
  }

  const handleFrequencyChange = (event) => {
    const input = event.target.value;
    setScannerFrequency(input);
    setFrequencyError(isValidFrequency(input));
    
  }

  function checkDecimal(num) {
    return /^[0-9]+(\.[0-9]{0,1})?$/.test(num);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate form fields
    if (
      projectName.trim().length < 3
    ) {
      alert("Please enter a project name with at least 3 characters");
      setProjectName("");
      return;
    }
    
    if (
      !["GANTRY", "CRAWLER", "AUTO", "MANUAL", "ARM"].includes(scanningMode)
    ) {
      alert("Please select a valid scanning mode");
      return;
    }
    
    if (
      scanDimensionsX < 1 || scanDimensionsY < 1 || scanDimensionsX % 1 !== 0 || scanDimensionsY % 1 !== 0 
    ) {
      alert("Please enter valid scan dimensions (must be greater than or equal to 1) and whole number");
      if (scanDimensionsX < 1) {
        setScanDimensionsX(1)
      }
      if (scanDimensionsY < 1) {
        setScanDimensionsY(1)
      }
      return;
    }
    
    if (
      scannerFrequency < 1 || !checkDecimal(scannerFrequency)
    ) {
      alert("Please enter a valid scanner frequency (must be greater than or equal to 1) and at most 1 d.p.");
      setScannerFrequency(1)
      return;
    }

    
    // Submit form data
    fetch("https://wavescan-internship.saurabhmudgal.repl.co/submitForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectName,
        scanningMode,
        scanDimensionsX,
        scanDimensionsY,
        scannerFrequency: parseFloat(scannerFrequency),
      }),
    })
      .then((response) => {
        console.log(response.status)
        if (response.ok) {
          // alert("Form submitted successfully!");
          setFormSuccess(true);
        } else {
          throw new Error("Failed to submit form");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    (formSuccess ? <ScannerDetails/> : 
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box
          rounded={"lg"}
          bg={"gray.50"}
          boxShadow={"lg"}
          p={8}
        >
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
          
            <FormControl id="name" isRequired isInvalid={nameError}>  
              <FormLabel>Project Name</FormLabel>
              <Input
                type="text"
                value={projectName}
                onChange={handleNameChange}
              />
              <FormErrorMessage>{nameError}</FormErrorMessage>
            </FormControl>
            <FormControl id="mode">
              <FormLabel>Scanning Mode</FormLabel>
              <Select
                value={scanningMode}
                onChange={(event) => setScanningMode(event.target.value)}
              >
                <option value="GANTRY">GANTRY</option>
                <option value="CRAWLER">CRAWLER</option>
                <option value="AUTO">AUTO</option>
                <option value="MANUAL">MANUAL</option>
                <option value="ARM">ARM</option>
              </Select>
            </FormControl>
            <FormLabel>Scan Dimensions (cm)</FormLabel>
            <HStack>
              <HStack>
                <FormLabel>X</FormLabel>
                <FormControl
                  id="X"
                  isRequired
                  pattern="[0-9]+"
                  isInvalid={scanXError}
                >
                <Input
                    type="number"
                    value={scanDimensionsX}
                    pattern="[0-9]"
                    onChange={handleDimensionXChange}
                  />
                  <FormErrorMessage>{scanXError}</FormErrorMessage>
                </FormControl>
              </HStack>
              <HStack>
                <FormLabel>Y</FormLabel>
                <FormControl id="Y"
                isInvalid={scanYError}>
                  <Input
                    type="number"
                    value={scanDimensionsY}
                    pattern="[0-9]"
                    onChange={handleDimensionYChange}
                  />
                  <FormErrorMessage>{scanYError}</FormErrorMessage>
                </FormControl>
              </HStack>
            </HStack>
            <FormControl id="frequency"
            isInvalid={FrequencyError}>
              <FormLabel>Scanner Frequency (Ghz)</FormLabel>
              <Input
                type="number"
                value={scannerFrequency}
                onChange={handleFrequencyChange}
              />
              <FormErrorMessage>{FrequencyError}</FormErrorMessage>
            </FormControl>
            <Center>
              <Button
                type="submit"
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                width={0.8}
              >
                Scan
              </Button>
              </Center>
            
          </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  ));
}
