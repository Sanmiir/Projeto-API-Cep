'use client'
import Input from './components/input';
import { cepSchema } from './components/zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { data } from 'autoprefixer';

export default function Home() {
  const{
      register,
      handleSubmit,
      getValues,
      setValue,
       formState:{errors},
       } = useForm({
      resolver: zodResolver(cepSchema),
    })
    const onSubmit = (data) => {
      console.log(data)
    }
    const  handleBlur = () => {
      fetch(`https://viacep.com.br/ws/${getValues('cep')}/json/`)
        .then((response) => response.json())
        .then((data) =>{
          setValue('rua', data.logradouro)
          setValue('bairro', data.bairro)
          setValue('cidade', data.localidade)
          setValue('estado', data.uf)
        })
        .catch((error) => console.error(error))
    }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#1f2937]">
      <h1 className="text-3xl text-white font-bold ">Formulário de Endereço</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col py-4 w-1/3 space-y-4">
          <Input id="cep" type="text" label="CEP" register={register}error={errors.cep} onBlur={handleBlur}/>
          <Input id="rua" type="text" label="RUA" register={register}error={errors.rua}/>
          <Input id="numero" type="number" label="Número" register={register}error={errors.numero}/>
          <Input id="bairro" type="text" label="Bairro" register={register}error={errors.bairro}/>
          <Input id="cidade" type="text" label="Cidade" register={register}error={errors.cidade}/>
          <Input id="estado" type="text" label="Estado" register={register}error={errors.estado}/>
          <button type='submit' className='bg-blue-500 text-white hover:bg-blue-700 font-bold rounded-md p-2 w-2/4'>Enviar</button>
      </form>
    </main>
  );
}
