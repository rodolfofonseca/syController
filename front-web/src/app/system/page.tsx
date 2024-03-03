"use client"

import { ArticleBody, Artista} from "@/components/ArticleBody";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { Search } from "@/components/Search";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function System() {

    function Search_component() {
        pesquisar();
        return <ArticleBody />
    }

    function colocando_dados(){
        return {"id_artist": "string", "name_artists": "string", "small_description":"string"};
    }

    async function pesquisar() {
        let url = 'http://localhost:3333/search_artists/';
        let response = await fetch(url, { method: "GET", headers: { "Content-Type": "application/json" } });

        let res_json = response.json();
        let contador = 0;

        res_json.then((promise) => {
            let return_promise = promise[contador];
            console.log(return_promise['small_description']);

            return <ArticleBody  />
        });
    }

    return (
        <div className="dark:bg-gray-700">
            <NavBar />
            <Search />
            <Search_component />
        </div>
    )
}