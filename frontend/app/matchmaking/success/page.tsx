'use client'
import React from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TimeCounter from "@/app/components/Matchmaking/TimeCounter";
import "./page.css";
const MatchmakingSuccess = () => {
    const router = useRouter();
    const sessionId = useSearchParams().get("sessionId");
    const waitingTime = 5;

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('role');

        if (!isAuthenticated || isAuthenticated !== 'maintainer') {
        router.push('/');
        }

        const timer = setTimeout(() => {
            handleJoinSession(sessionId);
        }, waitingTime  * 1000);
    
        return () => clearTimeout(timer);
    }, [sessionId]);


    const handleJoinSession = (sessionId : any) => {
        console.log(sessionId);
        router.replace(`/collaboration/${sessionId}`);
    }

    return (
        <div className="matchmaking-success">
            <h1 className="matchmaking-success-title">Success</h1>
            <div className="matchmaking-success-notification">
                Redirecting in 
            </div>
            <div className="matchmaking-success-timecounter" >
                <TimeCounter waitingTime={ waitingTime }></TimeCounter>
            </div>
        </div>
        );
}

export default MatchmakingSuccess;


