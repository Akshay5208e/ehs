import React from 'react'
import ArticleData from './ArticleData'
import ArticleList from './ArticeList'

const DetailedArticle = ({match}) => {
    const name = match.params.name;
    const article = ArticleData.find((article) => article.name === name);
    
   
    return (
        <div className='text-center'>
            {article&& <>
                <div className="p-2 col-md-9 mx-auto article">
                
                <h1 className= "text-color my-2">{article.title}</h1>
                <div className="text-primary text-decoration-none">
                    <img src={article.thumbnail} alt="blog" className="card-img-top my-2 card_image" />
                </div>
                {article.content.map ((paragraph, index) => (
                <p key={index}>{paragraph}</p>
                ))}
                <a href="./resources" className='btn btn-outline-primary' style={{width:"10%"}}>Back to list</a>
            </div>
            </>}
           
            
        </div>
    )
}

export default DetailedArticle

// import React from 'react'
// import Data from './Data';
// import ResourceList from './ResourceList';

// const ResourceMainPage = ({match}) => {
//     const name = match.params.name;
//     const article = Data.find((article) => article.name === name);

//     return (
//         <div className='text-center'>
//             <div className="p-2 col-md-9 mx-auto article">
//                 <h1 className= "text-color my-2">{article.title}</h1>
//                 <div className="text-primary text-decoration-none">
//                     <img src={article.thumbnail} alt="blog" className="card-img-top my-2" />
//                 </div>
//                 {article.content.map ((paragraph, index) => (
//                 <p key={index}>{paragraph}</p>
//                 ))}
//                 <a href="./" className='btn btn-outline-primary' >Back to list</a>
//             </div>
//         </div>
//     )
// }

// export default ResourceMainPage


// import React from 'react'
// import Data from "./Data.json"

// function ResourceMainPage() {
//     return (
//         <div className="container">
            
//         {
//             Data.map(post=>{
//                 return(
//                     <div key ={post.key}>
//                     <h4>{post.title}</h4>
//                     </div>
//                 )
//             })
//         }
//         </div>
//     )
// }

// export default ResourceMainPage
