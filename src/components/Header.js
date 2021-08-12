import React from "react";

const Header=({
  handleNameSearch,
  setUserDidSearch,
  getSearchBarDataApi,
  pokemonName
})=> {

  const onSubmit = () => {
    if(pokemonName.length>=3){
       // invoke api search function in pokeapp
    setUserDidSearch(true);
    getSearchBarDataApi(pokemonName);
    }

  };
  const enterSubmit = (e) => {
    if (e.key === "Enter" && pokemonName.length>=3) {
      setUserDidSearch(true);
      getSearchBarDataApi(pokemonName);
    }
  };

  return (
    <div className="header">
      <img src="pocketDexLogo.svg" alt="pokeball" className="logo" />
      <nav>
        <ul className="nav-ul">
          <li className="nav-li">
            <a href="/" className="nav-link">
              <img
                src="allPokemonLogo.svg"
                alt="pokeball logo"
                className="nav-icon"
              />
              All Pokemon
            </a>
          </li>
          <li className="nav-li">
            <a href="/" className="nav-link">
              <img
                src="topPicksLogo.svg"
                alt="person logo"
                className="nav-icon"
              />
              Top Picks
            </a>
          </li>

          <li className="nav-li">
            <a href="/" className="nav-link">
              <img src="gamesLogo.svg" alt="game logo" className="nav-icon" />
              Games
            </a>
          </li>
        </ul>

        <div className="searchBarContainer">
          <input
            id="input"
            type="text"
            placeholder="Enter Pokemon Name..."
            onChange={handleNameSearch}
            onKeyPress={enterSubmit}
            className="searchbar-input"
          />
          <button className="searchBarButton" onClick={() => onSubmit()}>
            <img
              src="searchBarLogo.svg"
              alt="searchbar magnifier logo"
              className="search-icon"
            />
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Header;
