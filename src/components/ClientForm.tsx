import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { Input, Button, Flex, SimpleGrid, GridItem} from '@chakra-ui/react'
import { Field } from "@/components/ui/field"
import { NativeSelectField, NativeSelectRoot } from "@/components/ui/native-select"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {clientsUseStore} from '@/stores/clients'
import api from '@/api'

type FormData = {
  name: string
  email: string
  phone: string
  zip: string
  state: string
  city: string
  district: string
  address: string
}

const ClientForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>()
  const { addData, formData } = clientsUseStore();
  const [loading, setLoading] = useState(false);

  const getAddressByZip = async (cep: string) => {
    setLoading(true);
    try {
      const response = await api.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;

      if (data.erro) {
        Toast.fire({
          icon: "warning",
          title: "CEP não encontrado!"
        });

        setLoading(false);

        return;
      }

      setValue('address', data.logradouro);
      setValue('district', data.bairro);
      setValue('city', data.localidade);
      setValue('state', data.uf);
      setLoading(false);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Ops.. Houve um erro ao buscar o CEP!"
      });

      setLoading(false);
    }
  };

  const MySwal = withReactContent(Swal)

  const Toast = MySwal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const onSubmit = (data: FormData) => {
    console.log(data)
    addData(data)

    Toast.fire({
      icon: "success",
      title: "Cliente cadastrado com sucesso!"
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex>
        
      </Flex>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <GridItem px={2} py={2}>
            <Field label="Nome" invalid={!!errors.name} errorText={errors.name?.message}>
              <Input
                id="name"
                placeholder="Nome"
                {...register('name', { required: 'O nome é obrigatório' })}
              />
            </Field>
          </GridItem>

          <GridItem px={2} py={2}>
            <Field label="E-mail" invalid={!!errors.email} errorText={errors.email?.message}>
              <Input
                id="email"
                placeholder="Email"
                {...register('email', { required: 'O e-mail é obrigatório' })}
              />
            </Field>
          </GridItem>

          <GridItem px={2} py={2}>
            <Field label="Telefone">
              <Input id="phone" placeholder="Telefone" {...register('phone')} />
            </Field>
          </GridItem>

          <GridItem px={2} py={2}>
            <Field label="CEP" invalid={!!errors.zip} errorText={errors.zip?.message}>
              <Input
                id="zip"
                placeholder="CEP"
                {...register('zip', { required: 'O CEP é obrigatório' })}
                onBlur={(e) => getAddressByZip(e.target.value)}
              />
            </Field>
          </GridItem>

          <GridItem px={2} py={2}>
            <Field label="Bairro">
              <Input id="district" placeholder="Bairro" {...register('district')} disabled={loading} />
            </Field>
          </GridItem>

          <GridItem px={2} py={2}>
            <Field label="Cidade">
              <Input id="city" placeholder="Cidade" {...register('city')} disabled={loading} />
            </Field>
          </GridItem>

          <GridItem px={2} py={2}>
            <Field label="UF">
              <NativeSelectRoot>
                <NativeSelectField placeholder="UF" {...register('state')}>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </NativeSelectField>
              </NativeSelectRoot>
            </Field>
          </GridItem>

          <GridItem px={2} py={2} colSpan={{ base: 1, md: 2 }}>
            <Field label="Endereço">
              <Input id="address" placeholder="Endereço" {...register('address')} disabled={loading} />
            </Field>
          </GridItem>
        </SimpleGrid>

      <Button type="submit" mt={4}>
        {loading ? 'Carregando...' : 'Salvar'}
      </Button>
    </form>
  )
}

export default ClientForm
