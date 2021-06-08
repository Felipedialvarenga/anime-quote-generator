import './App.css';
import { useState } from 'react'
import QuoteCard from './components/QuoteCard';
import Loading from './components/Loading';

function App() {

  const [animeQuote, setAnimeQuote] = useState([])
  const [charPic, setCharPic] = useState("")
  const [rendering, setRendering] = useState("")
  

  const getQuote = async () => {
    setRendering("loading")
    setTimeout(() => setRendering("quoteCard"), 4000)
    
    const info = await fetch('https://animechan.vercel.app/api/random')
      .then(response => response.json())

    setAnimeQuote(info)
    // setTimeout(console.log(animeQuote), 2000)
    getId(info)
  }

  const getId = async info => {
    const searchedInfo = await fetch(`https://api.jikan.moe/v3/search/character?q=${info.character}&limit=5`)
      .then(response => response.json())
    
    console.log(searchedInfo.results)
    console.log(info.anime)
    console.log(info.character)


    // Search the correct character
    var hasId = false
    if(searchedInfo.results !== undefined) {
      // eslint-disable-next-line
      searchedInfo.results.map( (charInfo) => {
        if(!hasId) {  
          if(charInfo.anime.length > 0) {
            for(var i = 0; i < charInfo.anime.length ; i++) {
              if(info.anime.toLowerCase().includes(charInfo.anime[i].name.toLowerCase()) || charInfo.anime[i].name.toLowerCase().includes(info.anime.toLowerCase())) {
                getPicture(charInfo.mal_id)
                hasId = true
                break  
              }
            }
          } 
          // else {
          //   getPicture(charInfo.mal_id)
          //   hasId = true
          // }
        } 
      })
    }
    
    if(!hasId) {
      setCharPic('')
    }

  }

  const getPicture = async id => {
     const picture = await fetch(`https://api.jikan.moe/v3/character/${id}/pictures`)
       .then(response => response.json())

    // console.log(picture)
    console.log(id)
    console.log(picture.pictures)
    if(picture !== undefined) {
      let i = Math.floor(Math.random() * picture.pictures.length) // to not get the same picture every time 
      console.log(i)
      if(picture.pictures[i].large !== undefined) {
        setCharPic(picture.pictures[i].large) 
      }         
    }
  }


  return (

    <div className="content">
      <div className="title">
        <h1>Anime Quote Generator</h1>
      </div>
      <div className="div-bt">
        <button className="quote-bt" onClick={getQuote}>Generate Quote</button>
      </div>
      {rendering === "loading" && <Loading/> }
      {rendering === "quoteCard" && <QuoteCard quote={animeQuote.quote} character={animeQuote.character} picture={charPic}/> }
      

    </div>

  );
}

export default App;
