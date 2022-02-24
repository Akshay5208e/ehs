import React from 'react'
import { Link } from "react-router-dom"

const ArticleList = ({articles}) => {
    return (
        <div>
            {articles.map((article,index) => (
            <div key={index} className = "p-1 col-sm-6 my-2 inline mx-auto"> 
                <div className = "card myborder" style={{borderRadius:"20px"}} >
                    <div className="text-decoration-none">
                    <img src={article.thumbnail} alt="image" className="card-img-top p-1 card_image1" />
                    </div>
                    <div className="bg-light card-body" style={{borderRadius:" 0 0 20px 20px"}}>
                        <div className="text-decoration-none" >
                            <h3 className = " text-color card-title">{article.title}</h3>
                        </div>
                        <p className="card-text my-2">
                            {article.content[0].substring(0,250)}...
                        </p>
                        <Link to = {`/${article.name}`} className = "btn btn-outline-primary my-2" style={{width:"20%"}}>
                            Learn more
                        </Link>
                    </div>
                </div>  
            </div>
          ))}
        </div>
    )
}

export default ArticleList;

// import React from 'react'
// import { Link } from "react-router-dom"

// const ResourceList = ({data}) => {
//     return (
//         <div>
//             {data.map((article,index) => (
//             <div key={index} className = "p-1 col-sm-6 my-2 inline mx-auto"> 
//                 <div className = "card border-primary" style={{borderRadius:"20px"}} >
//                     <div className="text-primary text-decoration-none">
//                     <img src={article.thumbnail} alt="blog" className="card-img-top p-1" />
//                     </div>
//                     <div className="bg-light card-body" style={{borderRadius:" 0 0 20px 20px"}}>
//                         <div className="text-decoration-none" key={index}>
//                             <h3 className = " text-color card-title">{article.title}</h3>
//                         </div>
//                         <p className="card-text">
//                             {article.content[0].substring(0,250)}...
//                         </p>
//                         <Link to = {`/${article.name}`} className = "btn btn-outline-primary">
//                             Learn more
//                         </Link>
//                     </div>
//                 </div>  
//             </div>
//           ))}
//         </div>
//     )
// }

// export default ResourceList



// import React from 'react'

// function ResourceSubPage() {
//     return (
//         <div>
            
//         </div>
//     )
// }

// export default ResourceSubPage
