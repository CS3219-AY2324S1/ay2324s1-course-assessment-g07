import { matchesMiddleware } from "next/dist/shared/lib/router/router";
import React from "react";
import { useState } from "react";

const Matchmaking = () => {
    const [activeButton, setActiveButton] = useState(null);

    const setActive = (button: any) => {
      setActiveButton(button);
    };

    return (
        <div className="mr-4 lg:flex-grow md:w-1/3 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-lg mb-2 font-bold">Race</h1>
            <p className="mb-1 leading-relaxed text-sm">
            Select a difficulty level!
            </p>
            <button
            className={`btn btn-outline btn-success btn-block mb-2 ${
                activeButton === 'easy' ? 'btn-active' : ''
            }`}
            onClick={() => setActive('easy')}
            >
            Easy
            </button>
            <button
            className={`btn btn-outline btn-warning btn-block mb-2 ${
                activeButton === 'medium' ? 'btn-active' : ''
            }`}
            onClick={() => setActive('medium')}
            >
            Medium
            </button>
            <button
            className={`btn btn-outline btn-error btn-block mb-2 ${
                activeButton === 'hard' ? 'btn-active' : ''
            }`}
            onClick={() => setActive('hard')}
            >
            Hard
            </button>
            <p className="mb-1 leading-relaxed text-sm">
            Click on "Search for an opponent" and we will match you up against
            an opponent!
            </p>
            <button className="btn btn-outline btn-primary btn-block">
            Search for an opponent
            </button>
        </div>
        );
}

export default Matchmaking;