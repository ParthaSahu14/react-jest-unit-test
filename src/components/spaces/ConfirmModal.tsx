import React from 'react';
import './ConfirmModal.css'

interface ConfirmModalProps{
    show: boolean;
    content: string;
    close: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = (props: ConfirmModalProps) => {

    const renderModal = () => {
        if(!props.show){
            return null;
        }else{
            return (
                <div className="modal">
                    <div className="modal-content">
                        <h2>You tried to reserve...</h2>
                        <h3 className="modal-text">{props.content}</h3>
                        <button onClick={() => props.close()}>ok Close it</button>
                    </div>
                </div>
            )
        }
    }

    return (
        <>
            {renderModal()}
        </>
    )
}

export {ConfirmModal};