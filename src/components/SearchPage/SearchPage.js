import React,{useState,useEffect} from 'react'
import {API} from "../../backend";
import Axios from "axios";
import PosterSearch from './PosterSearch';
import FloorGraphicSearch from './FloorGraphicSearch';
import AssetMarkingSearch from './AssetMarkingSearch';
import {Link} from "react-router-dom"
import SignagesSearch from './SignagesSearch';
import './SearchPage.css'

const Card = (props) => {
    return(
        <div className="br-22 bestsellerCard d-flex flex-column justify-content-start">
            <img src={props.imgUrl} className="br-22 bestsellerImg"  />
            <p className="bestsellerText  mb-0 px-2">{props.title}</p>
        </div>
    )
};

function SearchPage({search}) {
    const [allItems, setAllItems] = useState([])
    const [allPosters, setAllPosters] = useState([]);
    const [allSignages, setAllSignages] = useState([]);
    const [allFloorGraphics, setAllFloorGraphics] = useState([]);
    const [allAssetMarkings, setAllAssetMarkings] = useState([]);



    const [active, setActive] = useState("first");
    console.log(search);


    useEffect(()=>{

        Axios.get(`${API}posters/getPosterByCatSubCat`).then((res)=>{
            setAllItems(res.data.data.postersExists);
            
        //    console.log("bestseller",res);
          }).catch((err)=> {
            console.log(err);
          });
        Axios.get(`${API}posters/getPosterByCatSubCat`, {params: {category_slug: "posters"}}).then((res)=>{
          setAllPosters(res.data.data.postersExists);
          
      //    console.log("bestseller",res);
        }).catch((err)=> {
          console.log(err);
        });
        Axios.get(`${API}posters/getPosterByCatSubCat`, {params: {category_slug: "signages"}}).then((res)=>{
        setAllSignages(res.data.data.postersExists);

      //   console.log("bestseller",res);
        }).catch((err)=> {
          console.log(err);
        });
        Axios.get(`${API}posters/getPosterByCatSubCat`, {params: {category_slug: "floor-graphics"}}).then((res)=>{
          setAllFloorGraphics(res.data.data.postersExists);
      //    console.log("bestseller",res);
        }).catch((err)=> {
          console.log(err);
        });
        Axios.get(`${API}posters/getPosterByCatSubCat`, {params: {category_slug: "asset-markings"}}).then((res)=>{
          setAllAssetMarkings(res.data.data.postersExists);
      //   console.log("bestseller",res);
        }).catch((err)=> {
         console.log(err);
        });
      },[]);




    return (
        <div className='container main_container text-center mx-auto' >
            
            <div className='button-container'>

            <div id="carouselExampleControls" className="carousel slide row" data-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active w-100">
                  
                  <button onClick={()=>setActive("first")} className='mx-5'>posters</button>
                  <button onClick={()=>setActive("second")} className='mx-5'>Signages</button>
                
                </div>
                <div className="carousel-item w-100">

                  <button onClick={()=>setActive("third")} className='mx-5'>FloorGraphics</button>
                  <button onClick={()=>setActive("fourth")} className='mx-5'>AssetMarkings</button>
                  
                </div>
              </div>
              <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
            </div>

          

            <div className='results_container'>

                    {active == "first"  &&  <PosterSearch key="1"/>}
                    {active == "second" &&  <SignagesSearch  key="2"/>}
                    {active == "third"  &&  <FloorGraphicSearch  key="3"/>}
                    {active == "fourth" &&  <AssetMarkingSearch key="3"/>}         
                    
            </div>

                   
        </div>
    )
}

export default SearchPage
