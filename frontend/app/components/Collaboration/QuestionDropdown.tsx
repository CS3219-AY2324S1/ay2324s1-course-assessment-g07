import React, { useState } from 'react';

const QuestionDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={styles.container}>
            <button onClick={() => setIsOpen(!isOpen)}>Question</button>
            
            {isOpen && (
                <div style={styles.dropdown}>
                    Content goes here...
                    
                </div>
            )}
        </div>
    );
};
import { CSSProperties } from 'react';

const styles = {
    container: {
        position: 'relative', 
        display: 'flex',
        justifyContent: 'center', 
    } as CSSProperties,
    dropdown: {
        position: 'absolute',
        top: '23.5px',
        right: 0,
        width: '650px',
        height: '500px',
        backgroundColor: 'black',
        overflowY: 'auto',
        zIndex: 5 ,
    } as CSSProperties,
    
} 

export default QuestionDropdown;
