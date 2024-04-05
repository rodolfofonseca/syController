"use client";
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation';
import {ChangeEvent, useState} from 'react';

export default function Home() {

  let router = useRouter();
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    function companiesRegistrarion() {
        router.push("/companies/companies_registration");
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
        let return_response = 0;

        let response = await fetch(url, {method:"POST", headers:{"Content-Type":"application/json"}, body});

        return_response = response.status;

        if(return_response == 200 || return_response == 201){
            let res_json = response.json();
            
            res_json.then((promise) => {
                sessionStorage.setItem('id_user', promise['id_user']);
                sessionStorage.setItem('name_user', promise['name_user']);
                sessionStorage.setItem('email', promise['email']);
            });

            Swal.fire({title: "Sucesso", text: "Login realizado com sucesso!", icon: "success"});
            
            setTimeout(function(){router.push("/system");}, 3000);
        }else if (return_response == 205){
            Swal.fire({title: "Falha", text: "Falha no processo de login uuário ou senha incorretos!", icon: "error"});
        }else{
            throw new Error('Erro desconhecido');
        }
    }

  return (
    <div>
      <form className="max-w-sm mx-auto mt-[10%]">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium dark:text-white">Email</label>
          <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@email.com" required onChange={handleEmailChanged} value={email} />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium dark:text-white">Senha</label>
          <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={handlePasswordChange} value={password} />
        </div>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={login}>Enviar</button>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-[125px]" onClick={companiesRegistrarion}>Não sou cadastrado</button>
      </form>
    </div>
  )
}
