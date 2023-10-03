import React from 'react';
import './RefreshPageButton.css'

export const RefreshPageButton = () => {
    const handleRefresh = () => {
        window.location.reload();
    }
    return (
        <button className="button" type="button" onClick={handleRefresh}>
            <i className="fa fa-refresh"></i>
            Refresh
        </button>
    )
    ;
};
