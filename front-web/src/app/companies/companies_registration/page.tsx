"use client";
import Swal from 'sweetalert2'
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { cpf_cnpj_validation } from '@/lib/user_function';

type Plan = {
  id_plan: string,
  name_plan: string
}

export default function CompaniesRegistration() {
  let [name_company, setNameComapny] = useState('');
  let [fantasy_name, setFantasyName] = useState('');
  let [cpf_cnpj, setCPFCNPJ] = useState('');
  let [email_company, setEmailCompany] = useState('');
  let [id_plan, setIdPlan] = useState('');
  let [listPlan, setListPlan] = useState<Plan[]>([]);

  let router = useRouter();

  function handleNameChanged(event: ChangeEvent<HTMLInputElement>) {
    setNameComapny(event.target.value.toUpperCase());
  }

  function handleFantasyName(event: ChangeEvent<HTMLInputElement>) {
    setFantasyName(event.target.value.toUpperCase());
  }

  function handleCPFCNPJ(event: ChangeEvent<HTMLInputElement>) {
    let cpf_cnpf = event.target.value;
    const cleanedValue = cpf_cnpf.replace(/\D/g, ''); 
    let formatted_value = '';

  if (cleanedValue.length <= 11) {
    formatted_value = cleanedValue.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})/, '$1-$2').replace(/(-\d{2})\d+?$/, '$1');
  } else {
    formatted_value = cleanedValue.replace(/(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1/$2').replace(/(\d{4})(\d)/, '$1-$2');
  }
    setCPFCNPJ(formatted_value);
  }
  function handleEmailChanged(event: ChangeEvent<HTMLInputElement>) {
    setEmailCompany(event.target.value);
  }

  function handlePlanChanged(event: ChangeEvent<HTMLSelectElement>) {
    setIdPlan(event.target.value);
  }


  async function search_plan() {
    let url = "http://localhost:3333/plans_search_status/true";
    let response = await fetch(url);
    let res_json = await response.json();

    let objeto = [];

    objeto = res_json.return_search;

    setListPlan([... objeto]);
  }

  const save_data = async ()=> {
    const return_validation_cpf_cnpj = cpf_cnpj_validation(cpf_cnpj);

    if(return_validation_cpf_cnpj == true){
      let body = JSON.stringify({  id_plan, name_company, fantasy_name, cpf_cnpj, email_company });
      let return_response = 0;
      let url = "http://localhost:3333/companies_registration";
      let response = await fetch(url, {method:"POST", body});
      return_response = response.status;
      let res_json = response.json();

      if(return_response == 412 || return_response == 500){
  
        res_json.then((promise) => {
          Swal.fire({icon:'error', title:'Erro interno', text:promise['message']});
        });
      }else if(return_response == 200){
        res_json.then((promise) => {
          //promise.return_operation.id_company
          sessionStorage.setItem('id_company', promise.return_operation.id_company);
          router.push("/users/user_registration");
        });
      }

    }else{
      Swal.fire({icon:'error', title:'Erro de validação', text:'CPF/CNPJ Inválidos!'});
    }
  }

  useEffect(function() {
    search_plan();
  }, []);
  return (
    <form className="max-w-sm mx-auto mt-[10%]">
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium dark:text-white">Nome Completo Empresa</label>
        <input type="text" id="name_company" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Empresa X .ltda" required onChange={handleNameChanged} value={name_company} />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium dark:text-white">Nome Fantasia</label>
        <input type="text" id="fantasy_name" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="CDR DIVERSIDADES" required onChange={handleFantasyName} value={fantasy_name} />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium dark:text-white">CPF/CNPJ</label>
        <input type="text" id="cpf_cnpj" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="000.000.000-00" required onChange={handleCPFCNPJ} value={cpf_cnpj} />
      </div>

      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium dark:text-white">Email</label>
        <input type="email" id="email_company" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@email.com" required onChange={handleEmailChanged} value={email_company} />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium dark:text-white">Plano</label>
        <select
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="plan"
          value={id_plan}
          onChange={handlePlanChanged}
        >
          <option value="SELECIONE">Selecione um plano</option>
          {listPlan.map((a, b) => (<option value={a.id_plan} key={a.id_plan}>{a.name_plan}</option>))}
        </select>
      </div>
      <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" >Cancelar e Voltar</button>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2 ml-10"
        onClick={save_data}>Realizar meu cadastro</button>
    </form>
  )
}