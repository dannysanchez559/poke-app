import React, { useState, useEffect } from "react";
import PokeCard from "./PokeCard";
import Filter from "./Filter";
import getTypeColors from "../util/getTypeColor";
import "../styles/pokeAppStyle.css";
import SortTypes from "../util/SortTypes";

const PokeList = ({
  userDidSearch,
  setUserDidSearch,
  fetchedData,
  allPokemons,
}) => {
  const { id, name, sprites, types } = fetchedData;
  const [selectTypeOption, setSelectTypeOption] = useState("");
  const [selectAbilityOption, setSelectAbilityOption] = useState("");
  // abilityOptions: array of sorted ability names for drop-down
  const [abilityOptions, setAbilityOptions] = useState([]);
  // Set sort type; by default, sort by Dex number
  const [sortType, setSortType] = useState(SortTypes.DEX_NO);
  // stores sorted/filtered Pokemon array returned by sortAndFilter()
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [userDidSort, setUserDidSort] = useState(false);
  // Boolean for checking if user wants reverse sorted results
  const [reverse, setReverse] = useState(false);

  // reverse sorting
  const setSortTypeFlags = (newSortFlag) => {
    if (newSortFlag === sortType) {
      setReverse(!reverse);
    } else {
      setSortType(newSortFlag);
      setReverse(false);
    }
    setUserDidSort(true);
  };

  // arrays of Pokemon objects sorted by keys: name, weight, height, dex no
  const sortByName = (pokemonList) => {
    return pokemonList.sort((a, b) => {
      const nameA = a["name"];
      const nameB = b["name"];
      if (nameA < nameB) return reverse ? 1 : -1;
      if (nameA > nameB) return reverse ? -1 : 1;
      return 0;
    });
  };

  const sortByWeight = (pokemonList) => {
    return pokemonList.sort((a, b) => {
      const weightA = a["weight"];
      const weightB = b["weight"];
      return reverse ? weightB - weightA : weightA - weightB;
    });
  };

  const sortByHeight = (pokemonList) => {
    return pokemonList.sort((a, b) => {
      const heightA = a["height"];
      const heightB = b["height"];
      return reverse ? heightB - heightA : heightA - heightB;
    });
  };

  const sortByDexNumber = (pokemonList) => {
    return pokemonList.sort((a, b) => {
      const id1 = a["id"];
      const id2 = b["id"];
      return reverse ? id2 - id1 : id1 - id2;
    });
  };

  const sortAndFilter = () => {
    let allPokemonsFiltered = [...allPokemons];
    switch (sortType) {
      case SortTypes.DEX_NO:
        allPokemonsFiltered = sortByDexNumber(allPokemonsFiltered);
        break;
      case SortTypes.ABC:
        allPokemonsFiltered = sortByName(allPokemonsFiltered);
        break;
      case SortTypes.HEIGHT:
        allPokemonsFiltered = sortByHeight(allPokemonsFiltered);
        break;
      case SortTypes.WEIGHT:
        allPokemonsFiltered = sortByWeight(allPokemonsFiltered);
        break;
      default:
        console.error(`Invalid sort type: ${sortType}`);
    }
    setFilteredPokemons(allPokemonsFiltered);
  };

  useEffect(() => {
    sortAndFilter();
  }, [sortType, reverse]);

   // generate tags, check for tags and types
  let typeTags, sprite;
  if (types && sprites) {
    sprite = sprites["other"]["official-artwork"]["front_default"];
    typeTags = types.map((obj, i) => {
      const typeName = obj["type"]["name"];
      return <span className="type-tag" style={{ backgroundColor: getTypeColors[typeName] }} key={i}>{obj["type"]["name"]} </span>;
    });
  }

  const generateSortedCards = (pokemonList) => {
    const sortedCards = pokemonList.map((pokeObj) => {
      const { id, name, sprites, types } = pokeObj;
      let typeTags=types.map((typeObj,i)=>{
        const typeName = typeObj["type"]["name"];
        return <span style={{ backgroundColor: getTypeColors[typeName], color: '#303030', fontSize: '22px', borderRadius: "4px", padding: "4px" }} key={i}>{typeName}</span>
      })
      let sprite = sprites["other"]["official-artwork"]["front_default"];

      return (
        <PokeCard
          dexNo={id}
          name={name}
          sprite={sprite}
          key={id}
          typeTags={typeTags}
        />
      );
    });
    return sortedCards;
  };

  return (
    <div className="pokeList">
      {!userDidSearch ? (
        <>
          <Filter
            selectTypeOption={selectTypeOption}
            setSelectTypeOption={setSelectTypeOption}
            selectAbilityOption={selectAbilityOption}
            setSelectAbilityOption={setSelectAbilityOption}
            abilityOptions={abilityOptions}
            setAbilityOptions={setAbilityOptions}
            setSortType={setSortTypeFlags}
          />
          <div className="card-container">
            {generateSortedCards(userDidSort ? filteredPokemons : allPokemons)}
          </div>
        </>
      ) : fetchedData.length < 1 ? (
        <h1>Please search pokemon.</h1>
      ) : (
        <PokeCard dexNo={id} name={name} sprite={sprite} typeTags={typeTags} />
      )}
    </div>
  );
};
export default PokeList;
