"use client";
import Swal from 'sweetalert2'
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function UserRegistration() {
    let router = useRouter();
    let [name_user, setNameUser] = useState('');
    let [login_user, setLoginUser] = useState('');
    let [password_user, setPasswordUser] = useState('');
    let [user_type, setUserType] = useState('');

    function handleNameUserChanged(event: ChangeEvent<HTMLInputElement>) {
        setNameUser(event.target.value.toUpperCase());
    }

    function handleLoginUserChanged(event: ChangeEvent<HTMLInputElement>) {
        setLoginUser(event.target.value);
    }

    function handlePasswordUserChanged(event: ChangeEvent<HTMLInputElement>) {
        setPasswordUser(event.target.value);
    }

    function handleUserTypeChanged(event: ChangeEvent<HTMLSelectElement>) {
        setUserType(event.target.value);
    }

    const save_data = async () => {
        // let regex = new RegExp("/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/");
        // let retorno = regex.test(password_user);
        let retorno = true;

        if (retorno == true) {
            let id_company = sessionStorage.getItem('id_company');
            let body = JSON.stringify({ id_company, name_user, login_user, password_user, user_type });
            let url = "http://localhost:3333/user_registration";
            let response = await fetch(url, { method: "POST", body });
            let return_response = response.status;
            let res_json = response.json();

            res_json.then((promise) => {
                if(return_response == 201){
                    Swal.fire({icon:'success', title:'sucesso na operação', text: promise['message']});
                    router.push("/");
                }else{
                    Swal.fire({icon:'error', title:'Erro interno', text: promise['message']});
                }
            });
        }
    }

    return (
        <form className="max-w-sm mx-auto mt-[10%]">
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium dark:text-white">Nome Completo Usuário</label>
                <input type="text" id="name_user" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="João da Silva" required onChange={handleNameUserChanged} value={name_user} />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium dark:text-white">Login Usuário</label>
                <input type="text" id="login_user" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="joaosilva" required onChange={handleLoginUserChanged} value={login_user} />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium dark:text-white">Senha Usuário</label>
                <input type="password" id="password_user" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="#########" required onChange={handlePasswordUserChanged} value={password_user} />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium dark:text-white">Tipo Acesso</label>
                <select
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" id="user_type" value={user_type} onChange={handleUserTypeChanged}>
                    <option value="SELECIONE">Selecione um Tipo</option>
                    <option value="ADMINISTRADOR">ADMINISTRADOR DE SISTEMA</option>
                    <option value="COMUM">USUÁRIO COMUM</option>
                </select>
            </div>
            <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2 ml-10"
                onClick={save_data}>Realizar meu cadastro</button>
        </form>
    )
}