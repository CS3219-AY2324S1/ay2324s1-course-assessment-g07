'use client'
import { useRouter, useParams } from 'next/navigation';

const CollaborationSession = () => {
  const router = useRouter();
  const {sessionId} = useParams();
  return (
    <div>
      <h1>Collaboration Session: {sessionId}</h1>
    </div>
  );
};

export default CollaborationSession;