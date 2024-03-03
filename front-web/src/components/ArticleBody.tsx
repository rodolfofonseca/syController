"use client";
export interface Artista{
    id_artist: string,
    name_artists: string,
    small_description:string
}

export function ArticleBody() {

    // async function pesquisar(){
    //     let url = 'http://localhost:3333/search_artists/';
    //     let response = await fetch(url, {method:"GET", headers:{"Content-Type":"application/json"}});

    //     let res_json = response.json();
    //     let contador = 0;

    //     res_json.then((promise) => {
    //         let return_promise = promise[contador];
    //         console.log('funcao');
    //         <article className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    //         <div className="w-full p-4 text-center bg-white border border-gray-200 shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    //             <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">....</h5>
    //             <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">...</p>
    //             <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
    //                 <a href="#" className="w-full sm:w-auto bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-blue-700">
    //                     <div className="text-left rtl:text-right">
    //                         <div className="-mt-1 font-sans text-sm font-semibold">FAZER SOLICITAÇÃO DE CONTRATAÇÃO</div>
    //                     </div>
    //                 </a>
    //             </div>
    //         </div>
    //     </article >
    //        });
    //    }

    return (
        <article className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <div className="w-full p-4 text-center bg-white border border-gray-200 shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">...</h5>
                <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">...</p>
                <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                    <a href="#" className="w-full sm:w-auto bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-blue-700">
                        <div className="text-left rtl:text-right">
                            <div className="-mt-1 font-sans text-sm font-semibold">FAZER SOLICITAÇÃO DE CONTRATAÇÃO</div>
                        </div>
                    </a>
                </div>
            </div>
        </article >
    )
}