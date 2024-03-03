"use client";
import Swal from 'sweetalert2'
import {ChangeEvent, useState} from 'react';
import { useRouter } from 'next/navigation';

export default function UserCad() {
    let [name_user, setName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let router = useRouter();

    function handleNameChanged(event: ChangeEvent<HTMLInputElement>){
        setName(event.target.value.toUpperCase());
    }

    function handleEmailChanged(event: ChangeEvent<HTMLInputElement>){
        setEmail(event.target.value);
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value);
    }

    async function save_user(){
        let body = JSON.stringify({name_user, email, password});
        let return_response = 0;
        let url = 'http://localhost:3333/user_cad';
        let response = await fetch(url, {method:"POST", headers:{"Content-Type":"application/json"}, body});

        return_response = response.status;
        
        if(return_response == 201){
            let json_response = response.json();
            json_response.then((promise) => {
                sessionStorage.setItem("name_user", promise['name_user']);
                sessionStorage.setItem("email_user", promise['email']);
                sessionStorage.setItem("id_user", promise['id_user']);
            });

            Swal.fire({title: "Sucesso", text: "Sucesso no processo de cadastro!", icon: "success"});

            setTimeout(function(){router.push("/");}, 3000);
        }else if(return_response == 205){
            Swal.fire({title: "Falha", text: "Falha no processo de cadastro!", icon: "error"});
        }else{
            throw new Error('Erro desconhecido');
        }
    }

    function cancel(){
        router.push("/");
    }


    return (
        <form className="max-w-sm mx-auto mt-[10%]">
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium dark:text-white">Nome Completo</label>
                <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="João da Silva" required onChange={handleNameChanged} value={name_user}/>
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium dark:text-white">Email</label>
                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@email.com" required  onChange={handleEmailChanged} value={email}/>
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium dark:text-white">Senha</label>
                <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={handlePasswordChange} value={password}/>
            </div>
            <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={cancel}>Cancelar e Voltar</button>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2 ml-10" onClick={save_user}>Realizar meu cadastro</button>
        </form>
    )
}