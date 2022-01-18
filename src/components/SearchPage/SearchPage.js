import React,{useState,useEffect} from 'react'
import {API} from "../../backend";
import Axios from "axios";
import PosterSearch from './PosterSearch';
import FloorGraphicSearch from './FloorGraphicSearch';
import AssetMarkingSearch from './AssetMarkingSearch';
import SignagesSearch from './SignagesSearch';
import './SearchPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'



function SearchPage() {
    

    const [active, setActive] = useState("first");

    
    return (
        <div className='container main_container text-center mx-auto' >

            <div id="carouselExampleControls" class=" button-container carousel slide mb-4" data-ride="carousel" >
            <div class="carousel-inner">
              <div class="carousel-item active w-100 row h-auto mx-auto" data-interval="10000">
                <button onClick={()=>setActive("first")} className='responsiveMargin inlineBlock'>Posters</button>
                <br className='visibleOnSmall'/>
                <button onClick={()=>setActive("second")} className=' responsiveMargin inlineBlock'>Signages</button>
              </div>
              <div class="carousel-item w-100 h-auto " data-interval="10000">
                <button onClick={()=>setActive("third")} className='responsiveMargin inlineBlock'>FloorGraphics</button>
                <br className='visibleOnSmall'/>
                <button onClick={()=>setActive("fourth")} className='responsiveMargin inlineBlock'>AssetMarkings</button>
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span className='ArrowBorder'>
              <FontAwesomeIcon icon={faAngleLeft} className='carousel-control-prev-icon'/>
              <span class="sr-only">Previous</span>
              </span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span className='ArrowBorder'>
            <FontAwesomeIcon icon={faAngleRight} className='carousel-control-next-icon'/>
            <span class="sr-only">Next</span>
            </span>
            </a>
          </div>

            <div className='results_container'>

                    {active == "first"  &&  <PosterSearch key="1"/>}
                    {active == "second" &&  <SignagesSearch  key="2"/>}
                    {active == "third"  &&  <FloorGraphicSearch  key="3"/>}
                    {active == "fourth" &&  <AssetMarkingSearch key="4"/>}         
                    
            </div>

                   
        </div>
    )
}

export default SearchPage