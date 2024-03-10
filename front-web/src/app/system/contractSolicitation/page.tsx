"use client"
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, ChangeEvent } from "react";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import Swal from 'sweetalert2'

export default function MoreContracts() {
    const searchParams = useSearchParams();
    const router = useRouter();
    let id_user = searchParams.get("id_user");
    let id_artist = searchParams.get("id_artist");
    let name_artist = searchParams.get("name_artists");
    let name_user = sessionStorage.getItem('name_user');

    if(id_user == null || id_artist == null || name_artist == null || name_user == null){
        cancel();
    }

    const [cache, setCache] = useState(0);
    const [date, setDate] = useState(Date.now());
    const [event_address, setEvent_address] = useState('');

    function handleCacheChanged(event: ChangeEvent<HTMLInputElement>){
        setCache(parseInt(event.target.value));
    }

    function handleDateChanged(event: ChangeEvent<HTMLInputElement>){
        setDate(Date.parse(event.target.value));
    }

    function handleEventAddress(event: ChangeEvent<HTMLInputElement>){
        setEvent_address(event.target.value);
    }

    async function form() {
        let body = JSON.stringify({id_user, id_artist, cache, date, event_address, name_artist});
        let return_response = 0;
        let url = "http://localhost:3333/contract_registration";
        let response = await fetch(url, {method:"POST", headers:{"Content-Type":"application/json"}, body});

        return_response = response.status;

        if(return_response == 201){
            Swal.fire({icon: "success", title: "Sucesso", text: "Sucesso no processo de contratação de artista", footer: 'Você pode consultar a qualquer momento na aba <strong>minhas contratações</strong>'});
            setTimeout(function(){router.push("/system");}, 3000);
        }else{
            throw new Error("Erro desconhecido");
        }
    }

    function cancel(){
        router.push("/");
    }

    return (
        <div className="dark:bg-gray-700">
            <NavBar />
            <form className="max-w-sm mx-auto mt-[10%]">
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium dark:text-white text-center">Nome do Artista</label>
                    <input type="text" id="name-artist" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="João da Silva" value={name_artist} readOnly />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium dark:text-white text-center">Nome do Contratante</label>
                    <input type="text" id="name_user" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="João da Silva" value={name_user} readOnly />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium dark:text-white text-center">valor do cache</label>
                    <input type="number" id="value_cache" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleCacheChanged} value={cache}/>
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium dark:text-white text-center">Data do Evento</label>
                    <input type="datetime-local" id="date" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleDateChanged}/>
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium dark:text-white text-center">Endereço Evento</label>
                    <input type="text" id="value_cache" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleEventAddress} value={event_address}/>
                </div>
                <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={cancel}>Cancelar e Voltar</button>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2 ml-10" onClick={form}>Enviar Solicitação</button>
            </form>
            <Footer />
        </div>
    );
}