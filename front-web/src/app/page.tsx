"use client";
import { ArticleBody } from "@/components/ArticleBody";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import {Search} from "@/components/Search";

export default function Home() {
  let name_user = localStorage.getItem('name_user')?.toString();
  let email_user = localStorage.getItem('email_user')?.toString();
  
  if(name_user == null){
    name_user = '';
  }

  if(email_user == null){
    email_user = '';
  }

  console.log(name_user);



  return (
    <div className="dark:bg-gray-700">
      <NavBar />
      <Search />
      <ArticleBody />
      <ArticleBody />
      <ArticleBody />
      <Footer />
    </div>
  );
}
