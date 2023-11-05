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

const url = process.env.NODE_ENV === 'production' ? "34.123.40.181:30200" : 'localhost:4000'; 

console.log("editor url: " + url);

const socket = io(`http://${url}/`);

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

    const url = process.env.NODE_ENV === 'production' ? "34.123.40.181:30200" : 'localhost:4000'; 

    console.log("editor url: " + url);
    

    const socket = io(`http://${url}/`, { query: { sessionId, isReadOnly: '' + isReadOnly } });
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
        readOnly={isReadOnly && !isTimeUp}
        style={{ 
          width: `${isTimeUp ? '700px' : '650px'}`, 
          height: '400px',
          filter: isReadOnly && !isTimeUp ? 'blur(4px)' : 'none',
        }}

        />
    );
  }



export default CollabEditor;
