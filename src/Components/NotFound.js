import React from 'react';

function NotFound() {
    return (
        <div className="not-found">
            <h2>No Results Found</h2>
            <i className="material-icons icon-gif">sentiment_very_dissatisfied</i>
            <h3>Your search did not return any results. Please try again.</h3>
        </div>            
    );
}

export default NotFound;