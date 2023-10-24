import { useRouter, useSearchParams } from 'next/navigation';

const CollaborationSession = () => {
  const router = useRouter();
  const sessionId = useSearchParams().get("sessionId");
  return (
    <div>
      <h1>Collaboration Session: {sessionId}</h1>
    </div>
  );
};

export default CollaborationSession;