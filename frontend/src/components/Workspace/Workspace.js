import React from "react";
import { useParams } from "react-router-dom";
import './Workspace.css'

const Workspace = ({ setAuth, isAuthenticated }) => {
    const { sessionId : sessionId } = useParams();
    return (
    <div className="workspace-container">
        <div className="workspace-title">Congrat! You have found a teammate!</div>
        <div className="workspace-session-id">session id: {sessionId}</div>
    </div>)
}

export default Workspace;