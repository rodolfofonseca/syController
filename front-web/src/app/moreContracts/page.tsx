"use client"

import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { Search } from "@/components/Search";

export default function MoreContracts(){
    return(
        <div className="dark:bg-gray-700">
            <NavBar/>
            <Search/>
            <Footer/>
        </div>
    );
}