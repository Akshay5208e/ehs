import React from 'react'
import ArticleData from './ArticleData';
import ArticleList from './ArticeList';
import './Resource.css'

function ResourceMainPage() {
    return (
        <div className='body'>
                <div className="jumbotron py-4 mb-3 text-center">
                    <h1 className="h1 text-color">RESOURCES</h1>
                    <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                </div>
                {/* <p className="lead text-center">
                    <p className='h2 inline'>EHS</p><p className='inline h5'>PRINTS.</p>
                </p> */}

                <div className='container text-center px-2'>
                    <ArticleList articles={ArticleData}></ArticleList>
                </div>
        </div>
    )
}

export default ResourceMainPage
