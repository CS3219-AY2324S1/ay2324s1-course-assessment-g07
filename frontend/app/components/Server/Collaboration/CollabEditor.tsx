import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-java';


import { useEffect } from 'react';


import io from 'socket.io-client';

const url = process.env.NODE_ENV === 'production' ? process.env.EDITOR_SERVICE_URL : 'localhost:4000';

const socket = io(`http://${url}/`);

interface CollabEditorProps {
  side: 'left' | 'right';
  sideJoined: string | null;
  editorValue: string;
  setEditorValue: ((value: string) => void) | undefined;
  onJoin: (side: 'left' | 'right') => void;
  disabled: boolean | undefined;
  buttonState: boolean | undefined;
  language: string;
  sessionId: string | string[];
  isTimeUp: boolean;
}

const CollabEditor: React.FC<CollabEditorProps> = ({ side, sideJoined, editorValue, setEditorValue, onJoin, disabled,
  buttonState, language, sessionId, isTimeUp }) => {
  const isReadOnly = sideJoined !== side && !isTimeUp;
  useEffect(() => {
    const url = process.env.NODE_ENV === 'production' ? process.env.EDITOR_SERVICE_URL : 'localhost:4000';
    const socket = io(`http://${url}/`, { query: { sessionId } });
    socket.on('editorUpdate', (data) => {
      if (data.sessionId === sessionId && data.side === side) {
        if (setEditorValue) {
          setEditorValue(data.value);
        }
      }
    });

    return () => {
      socket.off('editorUpdate');
      socket.disconnect;
    };
  }, [side, setEditorValue]);

  const handleEditorChange = (value: string) => {
    if (setEditorValue) {
      setEditorValue(value);
    }
    socket.emit('editorChange', { sessionId, side, value });
  };

  // If buttonState is false or the side has been joined, render the editor
  // if (true) {
  if (!buttonState || sideJoined === side) {
    return (

      <AceEditor
        mode={language}
        theme="monokai"
        onChange={handleEditorChange}
        name={`${side}Editor`}
        editorProps={{ $blockScrolling: true }}
        value={editorValue}
        readOnly={isReadOnly}
        style={{ width: `${isTimeUp ? '700px' : '650px'}`, height: '400px' }}
        />
    );
  }

  // If buttonState is true, render the join button
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <button onClick={() => onJoin(side)} disabled={disabled}
      className='btn btn-primary text-white body-font'>
        Join
      </button>
    </div>
  );
};

export default CollabEditor;
