import React from 'react';

export default MSpinner = (props)=>{
    return (
        <div style={{width: props.size,height: props.size}}className="preloader-wrapper active">
            <div className="spinner-layer spinner-red-only">
            <div className="circle-clipper left">
                <div className="circle"></div>
            </div><div className="gap-patch">
                <div className="circle"></div>
            </div><div className="circle-clipper right">
                <div className="circle"></div>
            </div>
            </div>
        </div>
    )
}