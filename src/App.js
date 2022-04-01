import React, {useState, useEffect} from "react";
import './App.css';
import Title from './components/title';
import MainCard from "./components/MainCard";
import Form from "./components/Form";
import Favorites from "./components/Favorites";

const jsonLocalStorage = {
          setItem: (key, value) => {
            localStorage.setItem(key, JSON.stringify(value));
          },
          getItem: (key) => {
            return JSON.parse(localStorage.getItem(key));
          },
};

const fetchCat = async (text) => {
            const OPEN_API_DOMAIN = "https://cataas.com";
            const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
            const responseJson = await response.json();
            return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};

      // console.log("야옹");
      
const App = () =>{
        const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";
        const CAT2 = "https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn";
        const CAT3 = "https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript";

        const [counter, setCounter] = React.useState(()=>{
          return jsonLocalStorage.getItem("counter");
        });
        const [maincat, setMainCat] = React.useState(CAT1);
        const [favorites, setFavorites] = React.useState(()=>{
          return jsonLocalStorage.getItem("favorites") || []
        });

        const alreadyFavorite = favorites.includes(maincat);
        const counterTitle = counter === null ? "": counter + "번째 ";

        async function setInitialCat(){
          const newCat = await fetchCat("First cat");
          console.log(newCat);
          setMainCat(newCat);
        }

        React.useEffect(()=>{
          setInitialCat();
        }, []);


  
        // console.log("카운터 :", counter)

        async function updateMainCat(value){
          const newCat =  await fetchCat(value);
          setMainCat(newCat);

          setCounter((prev)=>{
            const nextCounter = prev + 1;
            jsonLocalStorage.setItem("counter", nextCounter);
            return nextCounter;
          });
        }

        function handleHeartClick(){
          const nextFavorites =[...favorites]
          // console.log("하트 클릭", favorites);
          setFavorites([...favorites, maincat]);
          jsonLocalStorage.setItem('favorites', nextFavorites);
        }

        return(
          <div>
            <Title>{counterTitle}고양이 짤방 만들기</Title>
            <Form updateMainCat={updateMainCat} />
            <MainCard img={maincat} onHeartClick={handleHeartClick} alreadyFavorite={alreadyFavorite}/>
            <Favorites favorites={favorites} />
          </div>  

        );
      }

export default App;
