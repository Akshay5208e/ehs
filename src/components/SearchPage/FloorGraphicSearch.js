import React,{useState,useEffect,useContext} from 'react'
import {API} from "../../backend";
import Axios from "axios";
import {Link} from "react-router-dom"
import { SearchContext } from './SearchContext';



const Card = (props) => {
    return(
        <div className="br-22 bestsellerCard justify-content-start m-2" style={{display:"inline-block"}}>
            <img src={props.imgUrl} className="br-22 bestsellerImg"  />
            <p className="bestsellerText  mb-0 px-2">{props.title}</p>
        </div>
    )
};





function FloorGraphicSearch({key}) {
    const [allFloorGraphics, setAllFloorGraphics] = useState([]);
    const [allItems, setAllItems] = useState([])
    const {searchTerm,setSearchTerm,update} = useContext(SearchContext)


    useEffect(()=>{

     
    
        Axios.get(`${API}posters/getPosterByCatSubCat`, {params: {category_slug: "floor-graphics"}}).then((res)=>{
          setAllFloorGraphics(res.data.data.postersExists);
         console.log(res);
        }).catch((err)=> {
          console.log(err);
        });
     
      },[]);
      useEffect(() => console.log(searchTerm), [searchTerm]);


      const filteredResults = allFloorGraphics.filter(result=>{
        return result.subCategory[0].sub_cat_slug.toLowerCase().includes(searchTerm.toLowerCase() )
    })

    
    return (
        <div>


                       {
                        filteredResults.length>0 ?  filteredResults.map((val,i)=>{
                            return(
                                <Link to ={`/${val.category[0].cat_slug}/${val.subCategory[0].sub_cat_slug}/product/id=${val._id}`}> <Card title={val.name ? val.name : "-"} imgUrl={val.imgUrl.length>0 ? val.imgUrl[0] : ""} ></Card></Link>
                             )
                        })
                        :
                        <div className='margin_y'>
                            <h3>No results found</h3>
                            </div>
                    }
            
        </div>
    )
}

export default FloorGraphicSearch
