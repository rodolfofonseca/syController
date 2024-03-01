"use client";

import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation';
import {ChangeEvent, useState} from 'react';
import { NavBar } from '@/components/NavBar';


export default function Login() {
    let router = useRouter();
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    function userCad() {
        router.push("/login/user_cad")
    }

    function handleEmailChanged(event: ChangeEvent<HTMLInputElement>){
        setEmail(event.target.value);
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value);
    }

    async function login() {
        let body = JSON.stringify({email, password});
        let url = 'http://localhost:3333/user_login';
        let response = await fetch(url, {method:"POST", headers:{"Content-Type":"application/json"}, body});
        let res_json = response.json();

        res_json.then((promise) => {
            console.log(promise['name_user']);
        });
    /*
    let body = JSON.stringify({name_user, email, password});
        let return_response = 0;
        let url = 'http://localhost:3333/user_cad';
        let response = await fetch(url, {method:"POST", headers:{"Content-Type":"application/json"}, body});

        return_response = response.status;
        
        if(return_response == 201){
            Swal.fire({title: "Sucesso", text: "Sucesso no processo de cadastro!", icon: "success"});
            
            localStorage.setItem("name_user", name_user);
            localStorage.setItem("email_user", email);

            setTimeout(function(){router.push("/");}, 3000);
        }else if(return_response == 205){
            Swal.fire({title: "Falha", text: "Falha no processo de cadastro!", icon: "error"});
        }else{
            throw new Error('Erro desconhecido');
        }
    */
    }

    return (
        <div>
            <form className="max-w-sm mx-auto mt-[10%]">
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium dark:text-white">Email</label>
                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@email.com" required onChange={handleEmailChanged} value={email}/>
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium dark:text-white">Senha</label>
                    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={handlePasswordChange} value={password}/>
                </div>
                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                    </div>
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Lembra de minha pessoa</label>
                </div>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={login}>Enviar</button>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-[125px]" onClick={userCad}>Não sou cadastrado</button>
            </form>
        </div>
    )
}