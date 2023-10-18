import React from "react";
import "./Loading.css";

const Loading = () => {

    const renderLoading = () => {

        return <div>
            <div className="text-white text-lg font-extrabold">...Loading</div>
        </div>
    }

    return (
        renderLoading()
    )
}

export default Loading;