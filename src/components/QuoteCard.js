import React from 'react'
import './QuoteCard.css'

function QuoteCard({quote, character, picture}) {
    
    return(
        <main>
            <div className="card-wrap">
                <div className="card"> 
                    <div className="card-top">                       
                        <h2 className="char-name"> {character}</h2>
                        <div className="card-pic">
                            <img src={picture} alt=""></img>             
                        </div>
                    </div>
                    {/* eslint-disable-next-line */}
                    <h3 className="char-quote">  {quote} </h3> 
                </div>
            </div>
        </main>
    )
}

export default QuoteCard