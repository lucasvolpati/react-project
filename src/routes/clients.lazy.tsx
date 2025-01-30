import { createLazyFileRoute } from '@tanstack/react-router'
import { clientsUseStore } from '@/stores/clients'
import { Box, Card, Table } from '@chakra-ui/react'
import { useEffect } from 'react';

export const Route = createLazyFileRoute('/clients')({
  component: Clients,
})

function Clients() {
  useEffect(() => {
    document.title = 'Clientes';
  }, []);

  const { formData } = clientsUseStore()

  /**
   * Listagem dos clientes cadastrados, para evitar erros ao printar direto no JSX
   */
  const list = formData.map((item) => (
    <Table.Row key={item.email}>
      <Table.Cell>{item.name}</Table.Cell>
      <Table.Cell>{item.email}</Table.Cell>
      <Table.Cell>{item.phone}</Table.Cell>
      <Table.Cell>
        {item.address} - {item.district}, {item.city}-{item.state}, {item.zip}
      </Table.Cell>
    </Table.Row>
  ))

  return (
    <Card.Root width="100%">
      <Card.Header>
        <Card.Title>Clientes Cadastrados</Card.Title>
      </Card.Header>
      <Card.Body>
        <Box>
          <Table.ScrollArea borderWidth="1px" maxW="full">
            <Table.Root size="sm" striped>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Nome</Table.ColumnHeader>
                  <Table.ColumnHeader>E-mail</Table.ColumnHeader>
                  <Table.ColumnHeader>Telefone</Table.ColumnHeader>
                  <Table.ColumnHeader>Endereço</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>{list}</Table.Body>
            </Table.Root>
          </Table.ScrollArea>
        </Box>
      </Card.Body>
      <Card.Footer />
    </Card.Root>
  )
}
