import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import { useEffect } from 'react';

import io from 'socket.io-client';
const socket = io('http://localhost:4000');

interface CollabEditorProps {
  side: 'left' | 'right';
  sideJoined: string | null;
  editorValue: string;
  setEditorValue: (value: string) => void;
  onJoin: (side: 'left' | 'right') => void;
  disabled: boolean|undefined;
  buttonState: boolean|undefined;
}

const CollabEditor: React.FC<CollabEditorProps> = ({ side, sideJoined, editorValue, setEditorValue, onJoin, disabled, buttonState }) => {
  
  useEffect(() => {
    socket.on('editorUpdate', (data) => {
      if (data.side === side) {
        setEditorValue(data.value);
      }
    });

    return () => {
      socket.off('editorUpdate');
    };
  }, [side, setEditorValue]);

  const handleEditorChange = (value: string) => {
    localStorage.setItem(`${side}EditorValue`, value);
    setEditorValue(value);
    socket.emit('editorChange', { side, value });
  };

  // If buttonState is false or the side has been joined, render the editor
  if (!buttonState || sideJoined === side) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, height: '100%' }}>
      <AceEditor
        mode="javascript"
        theme="monokai"
        onChange={handleEditorChange}
        name={`${side}Editor`}
        editorProps={{ $blockScrolling: true }}
        value={editorValue}
        style={{ width: '500px', height: '500px' }}
      />
      </div>
    );
  }

  // If buttonState is true, render the join button
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <button onClick={() => onJoin(side)} disabled={disabled}>
        Join
      </button>
    </div>
  );
};

export default CollabEditor;
