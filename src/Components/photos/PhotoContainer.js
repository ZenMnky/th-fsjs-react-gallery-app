import React from 'react';
import Photo from './Photo';
import NotFound from '../NotFound';
import Loading from '../Loading';


const PhotoContainer = (props) => {
    console.log(props);
    const results = props.data;
    let photos;

    if(props.loading){
        photos = <Loading />
    } else if (results.length > 0) {
        photos = results.map(photo =>
            <Photo farmId={photo.farm} id={photo.id} serverId={photo.server} secret={photo.secret} key={photo.id} />
        );
    } else {
        photos = <NotFound />
    }

    return (
        <div className="photo-container">
            <h2>{props.searchTerm}</h2>
            <ul>
                {photos}
            </ul>
        </div>
    );
}

export default PhotoContainer;