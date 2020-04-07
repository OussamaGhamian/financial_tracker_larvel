import React from 'react'
import './style/style.css'
export default function Feature(props) {
    return (
        <div className="feature" >
            <img  src={props.img} alt="FeatureImage" />
            <h3>Title of the Feature</h3>
            <article>Description of the feature</article>
        </div>
    )
}
