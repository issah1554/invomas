import React, { type ReactNode, type CSSProperties } from 'react';
import { Button } from './Buttons';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    blur?: boolean;
    opacity?: number;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'full';
    showCloseButton?: boolean;
    className?: string;
    overlayClassName?: string;
    style?: CSSProperties;
    overlayStyle?: CSSProperties;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    blur = true,
    opacity = 0.5,
    size = 'md',
    showCloseButton = true,
    className = '',
    overlayClassName = '',
    style = {},
    overlayStyle = {},
}) => {
    if (!isOpen) return null;

    let modalWidth = '400px';
    if (size === 'sm') modalWidth = '300px';
    if (size === 'lg') modalWidth = '600px';
    if (size === 'xl') modalWidth = '800px';
    if (size === 'xxl') modalWidth = '1000px';
    if (size === 'full') modalWidth = '100%';

    return (
        <>
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(-20px) scale(0.95); }
        }
        .modal-overlay-default {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,${opacity});
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          ${blur ? 'backdrop-filter: blur(5px);' : ''}
          animation: ${isOpen ? 'fadeIn' : 'fadeOut'} 0.2s ease-in-out forwards;
        }
        .modal-content-default {
          position: relative;
          background: white;
          padding: 20px;
          border-radius: 8px;
          min-width: 300px;
          max-width: 90%;
          width: ${modalWidth};
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          ${size === 'full' ? 'height: 100%; max-width: 100%; border-radius: 0;' : ''}
          animation: ${isOpen ? 'slideIn' : 'slideOut'} 0.2s ease-in-out forwards;
        }
        .modal-title {
          margin-top: 0;
          margin-bottom: 10px;
        }
        .modal-x-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 1000;
          background: #eee;
          border: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .modal-x-btn:hover {
          background: #ccc;
          color: #000;
        }
      `}</style>

            <div
                className={`modal-overlay-default ${overlayClassName}`}
                style={overlayStyle}
                onClick={onClose}
            >
                <div
                    className={`modal-content-default ${className}`}
                    style={style}
                    onClick={e => e.stopPropagation()}
                >
                    {showCloseButton && (
                      <Button className="modal-x-btn" onClick={onClose} variant="text" color={'dark'} size={'sm'}>
                        <i className="bi bi-x" style={{ fontSize: 16 }}></i>
                      </Button>
                    )}
                    {title && <h2 className="modal-title">{title}</h2>}
                    <div className="modal-body">{children}</div>
                </div>
            </div>
        </>
    );
};

export default Modal;

// Demo
// export const ModalDemo = () => {
//     const [isModalOpen, setModalOpen] = React.useState(false);

//     return (
//         <div>
//             <button onClick={() => setModalOpen(true)}>Open Modal</button>

//             <Modal
//                 isOpen={isModalOpen}
//                 onClose={() => setModalOpen(false)}
//                 opacity={0.7}
//                 size="xxl"
//                 showCloseButton
//             >
//                 <h3>Modal Title</h3>
//                 <p>This is a bigger modal (xxl/full supported).</p>
//                 <Button onClick={() => setModalOpen(false)} color={'dark'} size={'sm'} children={undefined}>Close Modal</Button>
//             </Modal>
//         </div>
//     );
// };