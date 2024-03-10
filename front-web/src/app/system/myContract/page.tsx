"use client"

import { Contract, ContractInterface } from "@/components/Contract"
import { Footer } from "@/components/Footer"
import { NavBar } from "@/components/NavBar"
import { useState, useEffect } from "react";

export default function MyContract(){
    const[contract, setContract] = useState<ContractInterface[]>([]);

    async function search_contract(){
        let user_id = sessionStorage.getItem('id_user');
        let url = 'http://localhost:3333/search_contract/'+user_id+'?';
        let response = await fetch(url);
        let res_json = await response.json() as ContractInterface[];
        setContract(res_json);
    }

    useEffect(() => {
        search_contract();
    }, [])

    return(
        <div className="dark:bg-gray-700">
            <NavBar/>
                {
                    contract.map((contract) => {
                        return(
                            <Contract
                            key={contract.id_contract}
                            id_contract={contract.id_contract}
                            name_artist = {contract.name_artist}
                            cache = {contract.cache}
                            data = {contract.data}
                            event_address = {contract.event_address}
                            />
                        );
                    })
                }
            <Footer/>
        </div>
    )
}