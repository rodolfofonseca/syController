// import { useState } from "react";
import { articleBody } from "./components/article-body";
import { NavBar } from "./components/nav-bar";
import { footer } from "./components/footer";
// import { carousel } from "./components/carousel";
import { searchArtists } from "./components/search";
import { login } from "./components/login";

export function App() {

  return (
    <div>
      <NavBar />
      {/* {carousel()} */}

      {searchArtists()}

      {articleBody()}
      {articleBody()}
      {articleBody()}
      {footer()}
      {/* {login()} */}
    </div>
  )
}