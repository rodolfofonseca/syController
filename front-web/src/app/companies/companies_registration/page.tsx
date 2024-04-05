"use client";
import Swal from 'sweetalert2'
import {ChangeEvent, useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';

export default function CompaniesRegistration(){
    let [name_company, setNameComapny] = useState('');
    let [fantasy_name, setFantasyName] = useState('');
    let [cpf_cnpj, setCPFCNPJ] = useState('');
    let [email_company, setEmailCompany] = useState('');
    let [plan, setPlan] = useState('');
    let [listPlan, setListPlan] = useState([]);

    let router = useRouter();

    function handleNameChanged(event: ChangeEvent<HTMLInputElement>){
        setNameComapny(event.target.value.toUpperCase());
    }

    function handleFantasyName(event: ChangeEvent<HTMLInputElement>){
        setFantasyName(event.target.value);
    }
    function handleCPFCNPJ(event: ChangeEvent<HTMLInputElement>){
        setCPFCNPJ(event.target.value);
    }
    function handleEmailChanged(event: ChangeEvent<HTMLInputElement>){
        setEmailCompany(event.target.value);
    }

    function handlePlanChanged(event: ChangeEvent<>){
        setPlan(event.target.value);
    }

    async function search_plan(){
        let url = "http://localhost:3333/plans_search_status/true";
        let response = await fetch(url);
        let res_json = await response.json();

        let objeto = res_json.return_search; 

        setListPlan([... objeto]);
    }

    function save_data(){
        let body = JSON.stringify({plan, name_company, fantasy_name, cpf_cnpj, email_company});
        console.log(body);
    }

    useEffect(function(){
        search_plan();
    });
    return (
        <form className="max-w-sm mx-auto mt-[10%]">
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium dark:text-white">Nome Completo Empresa</label>
                <input type="text" id="name_company" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Empresa X .ltda" required onChange={handleNameChanged} value={name_company}/>
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium dark:text-white">Nome Fantasia</label>
                <input type="text" id="fantasy_name" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="CDR DIVERSIDADES" required onChange={handleFantasyName} value={fantasy_name}/>
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium dark:text-white">CPF/CNPJ</label>
                <input type="text" id="cpf_cnpj" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="000.000.000-00" required onChange={handleCPFCNPJ} value={cpf_cnpj}/>
            </div>

            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium dark:text-white">Email</label>
                <input type="email" id="email_company" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@email.com" required  onChange={handleEmailChanged} value={email_company}/>
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium dark:text-white">Plano</label>
                <select className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" id="plan" value={plan} onChange={handlePlanChanged}>
                 {listPlan.map((a, b) => (<option value={a.id_plan} key={a.id_plan}>{a.name_plan}</option>))}
                </select>
            </div>
            <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" >Cancelar e Voltar</button>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2 ml-10"  onClick={save_data}>Realizar meu cadastro</button>
        </form>
    )
}