import React, { useState } from 'react';

type QuestionDropdownProps = {
    randomQuestion: any
}
const QuestionDropdown: React.FC<QuestionDropdownProps> = (randomQuestion) => {
    const [isOpen, setIsOpen] = useState(false);
    let qs = JSON.stringify(randomQuestion.randomQuestion);
    let processedText = qs ? qs.replace(/\\n/g, '<br>')
    .replace(/\\t/g, '&emsp;').replace(/\\/g, ''):'';
  
    return (
        <div className="relative flex justify-center">
            <div className="relative">
                <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 bg-blue-500 text-white rounded">
                    Question
                </button>

                {isOpen && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 w-[700px] h-[500px] bg-black overflow-y-auto z-50">
                        <div dangerouslySetInnerHTML={{ __html: processedText }}/>
                    </div>
                )}
            </div>
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
        zIndex: 5,
    } as CSSProperties,

}

export default QuestionDropdown;
