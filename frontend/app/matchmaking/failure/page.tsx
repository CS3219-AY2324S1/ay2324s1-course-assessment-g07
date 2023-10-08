'use client'
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./page.css"; 
const MatchmakingFailure = () => {
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
        <div className="matchmaking-failure">
            <h1 className="matchmaking-failure-title">Failed</h1>
            <p className="matchmaking-failure-notification">failed to found a teammate within the time limit</p>


            <button className="btn btn-outline btn-info btn-block" onClick={ handleMatchmaking }>
            back
            </button>
        </div>
        );
}

export default MatchmakingFailure;


