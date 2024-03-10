"use client"
import Link from "next/link"

export interface ContractInterface{
    id_contract:string,
    name_artist:string,
    cache:number,
    data:Date,
    event_address:string
}

export function Contract(props: ContractInterface){

    function return_date(){
        const convert_date = new Date(props.data);
        const options = {timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        };
        
        const date_convert = convert_date.toLocaleString('pt-BR', options);
        return date_convert;
    }
    return(
        <article className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <div className="w-full p-4 text-center bg-white border border-gray-200 shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {props.name_artist}
                </h5>
                <p className="mb-5 text-base text-left text-gray-500 sm:text-lg dark:text-gray-400">
                    Valor Contrato: {props.cache}
                </p>
                <p className="mb-5 text-base text-left text-gray-500 sm:text-lg dark:text-gray-400">
                    Data: {return_date()}
                </p>
                <p className="mb-5 text-base text-left text-gray-500 sm:text-lg dark:text-gray-400">
                    Local: {props.event_address}
                </p>
            </div>
        </article >
    )
}