import React,{useState,useEffect,useContext} from 'react'
import {API} from "../../backend";
import Axios from "axios";
import {Link} from "react-router-dom"
import { SearchContext } from './SearchContext';


const Card = (props) => {
    return(
        <div className="br-22 bestsellerCard d-flex flex-column justify-content-start">
            <img src={props.imgUrl} className="br-22 bestsellerImg"  />
            <p className="bestsellerText  mb-0 px-2">{props.title}</p>
        </div>
    )
};



function AssetMarkingSearch({key}) {
    const [allAssetMarkings, setAllAssetMarkings] = useState([]);
    const [allItems, setAllItems] = useState([])
    const {searchTerm,setSearchTerm,update} = useContext(SearchContext)


    useEffect(()=>{

     
      
        Axios.get(`${API}posters/getPosterByCatSubCat`, {params: {category_slug: "asset-markings"}}).then((res)=>{
          setAllAssetMarkings(res.data.data.postersExists);
      console.log(res);
        }).catch((err)=> {
         console.log(err);
        });
      },[]);


      useEffect(() => console.log(searchTerm), [searchTerm]);


      const filteredResults = allAssetMarkings.filter(result=>{
          return result.subCategory[0].sub_cat_slug.toLowerCase().includes(searchTerm.toLowerCase() )
      })
   

    return (
        <div>
            
            {
                        filteredResults.length>0 ? filteredResults.map((val,i)=>{
                            return(
                                <Link  to="">  <Card title={val.name ? val.name : "-"} imgUrl={val.imgUrl.length>0 ? val.imgUrl[0] : ""} /></Link>
                             )
                        })
                        :
                
                        <div>
                            <h3>No results found</h3>
                            </div>
                    }
            
        </div>
    )
}

export default AssetMarkingSearch
