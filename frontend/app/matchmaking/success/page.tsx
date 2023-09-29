'use client'
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./page.css";
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
        <div className="matchmaking-success">
            <h1 className="matchmaking-success-title">Success</h1>
            <div className="matchmaking-success-notification">
                Found a teammate
            </div>
        </div>
        );
}

export default MatchmakingSuccess;


