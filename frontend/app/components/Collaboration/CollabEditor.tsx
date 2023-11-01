import React from 'react';
import {useRef} from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-java';


import { useEffect } from 'react';


import io from 'socket.io-client';

const socket = io(`http://localhost:4000/`);

interface CollabEditorProps {
  editorValue: string;
  setEditorValue: ((value: string) => void) | undefined;
  disabled: boolean | undefined;
  language: string;
  sessionId: string | string[];
  isTimeUp: boolean;
  userId: any;
}

interface ReactAce {
  editor: any;
}

const CollabEditor: React.FC<CollabEditorProps> = ({ editorValue, setEditorValue, disabled,
  language, sessionId, isTimeUp, userId }) => {
  const isReadOnly = disabled;

  useEffect(() => {
    const socket = io(`http://localhost:4000/`, { query: { sessionId, isReadOnly: '' + isReadOnly } });
    socket.on('editorUpdate', (data) => {
      if (data.sessionId === sessionId && data.userId !== userId && (isReadOnly)) {
        if (setEditorValue) {
          setEditorValue(data.value);
        }
      }
    });
  
    return () => {
      socket.off('editorUpdate');
      socket.disconnect();
    };
  }, [setEditorValue, sessionId, userId, isReadOnly]);



  const handleEditorChange = (value: string) => {
    if (setEditorValue) {
      setEditorValue(value);
    }
    socket.emit('editorChange', { sessionId, value, userId, isReadOnly });
  };


    return (
      <AceEditor
        mode={language}
        theme="monokai"
        onChange={handleEditorChange}
        name={`${isReadOnly}Editor`}
        editorProps={{ $blockScrolling: true }}
        value={editorValue}
        readOnly={isReadOnly}
        style={{ 
          width: `${isTimeUp ? '700px' : '650px'}`, 
          height: '400px',
          filter: isReadOnly && !isTimeUp ? 'blur(4px)' : 'none',
        }}

        />
    );
  }



export default CollabEditor;
