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
          <div className='row button_style mx-auto'>

            <div className='col-md-3 col-xs-6'> <button onClick={()=>setActive("first")} className=' inlineBlock '>Posters</button></div>
            <div className='col-md-3 col-xs-6'> <button onClick={()=>setActive("second")} className=' inlineBlock '>Signages</button></div>
            <div className='col-md-3 col-xs-6'> <button onClick={()=>setActive("third")} className=' inlineBlock ' >FloorGraphics</button></div>
            <div className='col-md-3 col-xs-6'><button onClick={()=>setActive("fourth")} className=' inlineBlock '>AssetMarkings</button></div>
              
                
                
               
            
               
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