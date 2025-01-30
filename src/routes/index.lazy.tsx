import { createLazyFileRoute } from '@tanstack/react-router'
import { Box, Card } from '@chakra-ui/react'
import ClientForm from '@/components/ClientForm'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {

  return (
    <Card.Root width="100%">
        <Card.Header>
            <Card.Title>Cadastro de Clientes</Card.Title>
        </Card.Header>
        <Card.Body>
            <Box>
                <ClientForm />
            </Box>
        </Card.Body>
        <Card.Footer />
    </Card.Root>
  )
}
