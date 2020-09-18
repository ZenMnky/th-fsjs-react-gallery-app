import React from 'react';

const Photo = (props) => {
    let imgSrc = `https://farm${props.farmId}.staticflickr.com/${props.serverId}/${props.id}_${props.secret}.jpg`;

    return (
        <li>
            <a href={imgSrc} target='_blank' rel='noopener noreferrer'>
            <img 
                src={imgSrc} 
                alt="" 
            />
            </a>
            
        </li>
    );
}

export default Photo;