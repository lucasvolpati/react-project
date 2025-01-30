import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Box, Flex, Heading, Container } from "@chakra-ui/react"

export const Route = createRootRoute({
  component: () => (
    <>
      <Box bg="blue.500" px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-around">
            <Heading size="md" color="white" width="60%">
                React Project
            </Heading>

            <Flex justifyContent={"space-around"} width="40%">
                <Link px={2} py={8} color="white" to="/" className="[&.active]:font-bold">
                    Home
                </Link>
                <Link px={2} py={8} color="white" to="/clients" className="[&.active]:font-bold">
                    Clientes
                </Link>
            </Flex>
        </Flex>
        </Box>
      <Container py={6}>
        <Outlet />
      </Container>
      <TanStackRouterDevtools />
    </>
  ),
})
