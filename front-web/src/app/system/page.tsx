"use client"

import { ArticleBody, type Artista } from "@/components/ArticleBody";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { Search } from "@/components/Search";
import { useState, useEffect, ChangeEvent } from "react";

export default function System() {
    const [artists, setArtists] = useState<Artista[]>([]);
    const [name_artists, setNameArtist] = useState('');

    async function handleNameArtist(event: ChangeEvent<HTMLInputElement>){
        setNameArtist(event.target.value.toUpperCase());
        console.log(name_artists);
        const url = 'http://localhost:3333/search_artist_name/'+name_artists;
        const response = await fetch(url);

        const res_json = await response.json() as Artista[];

        setArtists(res_json);
    }

    async function pesquisar() {
        const url = 'http://localhost:3333/search_artist_name/'+name_artists;
        const response = await fetch(url);

        const res_json = await response.json() as Artista[];

        setArtists(res_json);
    }

    useEffect(() => {
        pesquisar();
    }, [])

    return (
        <div className="dark:bg-gray-700">
            <NavBar />
            
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="w-full p-4 text-center bg-white border border-gray-200 shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <input type="search" id="default-search" className="w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pesquisar por artistas ou bandas [ENTER PARA PESQUISAR]..." required onChange={handleNameArtist} value={name_artists} />
                </div>
            </div>

            {
                artists.map((artist) => {
                    return (
                        <ArticleBody
                            key={artist.id_artist}
                            id_artist={artist.id_artist}
                            name_artists={artist.name_artists}
                            small_description={artist.small_description}
                        />
                    );
                })
            }
            <Footer/>
        </div>
    )
}