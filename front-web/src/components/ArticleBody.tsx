"use client";
import Link from "next/link"
import { useRouter } from "next/navigation";
export interface Artista {
    id_artist: string,
    name_artists: string,
    small_description: string
}

export function ArticleBody(props: Artista) {
    const router = useRouter();
    
    const id_user = sessionStorage.getItem('id_user');
    const id_artist = props.id_artist;
    const name_artists = props.name_artists;

    const query = {
        id_user,
        id_artist,
        name_artists
    }

    function navigateToContractSolicitation(){
        const url = "/system/contractSolicitation?id_user="+id_user +"&id_artist="+id_artist+"&name_artists="+name_artists;
        router.push(url)
    }

    return (
        <article className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <div className="w-full p-4 text-center bg-white border border-gray-200 shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {props.name_artists}
                </h5>
                <p className="mb-5 text-base text-left text-gray-500 sm:text-lg dark:text-gray-400">
                    {props.small_description}
                </p>
                <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                    <a href="#" className="w-full sm:w-auto bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-blue-700">
                        <div className="text-left rtl:text-right">
                            <button 
                                onClick={navigateToContractSolicitation}
                                className="-mt-1 font-sans text-sm font-semibold"
                            >
                                FAZER SOLICITAÇÃO DE CONTRATAÇÃO
                            </button>
                        </div>
                    </a>
                </div>
            </div>
        </article >
    )
}