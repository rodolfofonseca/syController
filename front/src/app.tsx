// import { useState } from "react";
import { articleBody } from "./components/article-body";
import { narBar } from "./components/nav-bar";
import { footer } from "./components/footer";
// import { carousel } from "./components/carousel";
import { searchArtists } from "./components/search";
import { login } from "./components/login";

export function App() {

  return (
    <div>
      {narBar()}
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