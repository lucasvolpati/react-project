import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Box, Flex, Heading, Container, Button, IconButton, Stack } from "@chakra-ui/react"
import { useState } from "react";
import { LuMenu } from "react-icons/lu"

function RootComponent() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    return(
        <>
        <Box bg="blue.500" px={4}>
            <Flex h={16} alignItems="center" justifyContent="space-around">
                <Heading size="md" color="white" width="60%">
                    React Project
                </Heading>

                <IconButton
                    display={{ base: "flex", md: "none" }}
                    onClick={toggleMenu}
                >
                    <LuMenu />
                </IconButton>

                <Flex justifyContent={"center"} display={{ base: "none", md: "flex" }} width="40%">
                    <Button variant="ghost">
                        <Link px={2} py={8} color="white" to="/" className="[&.active]:font-bold">
                            Home
                        </Link> 
                    </Button>
                    <Button variant="ghost">
                        <Link px={2} py={8} color="white" to="/clients" className="[&.active]:font-bold">
                            Clientes
                        </Link>
                    </Button>
                </Flex>

                {isMenuOpen && (
                    <Box
                    position="absolute"
                    top="60px"
                    left="0"
                    right="0"
                    bg="blue.500"
                    zIndex="1"
                    p={4}
                    shadow="md"
                  >
                    <Stack as="nav" spacing={4}>
                      <Link color="white" to="/">
                        Home
                      </Link>
                      <Link color="white" to="/clients">
                        Clientes
                      </Link>
                    </Stack>
                  </Box>
                )}
            </Flex>
            </Box>
        <Container py={6}>
            <Outlet />
        </Container>
        <TanStackRouterDevtools />
        </>
    
    )
}

export const Route = createRootRoute({
    component: RootComponent,
  });