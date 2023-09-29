'use client'
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const MatchmakingSuccess = () => {
    const router = useRouter();
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('role');

        if (!isAuthenticated || isAuthenticated !== 'maintainer') {
        router.push('/');
        }
    }, []);


    const handleMatchmaking = () => {
        router.push("/matchmaking");
    }

    return (
        <div className="mr-4 lg:flex-grow md:w-1/3 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-lg mb-2 font-bold">Success</h1>


            <button className="btn btn-outline btn-primary btn-block" onClick={ handleMatchmaking } >
            proceed
            </button>
        </div>
        );
}

export default MatchmakingSuccess;


