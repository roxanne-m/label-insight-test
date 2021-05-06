import React from 'react';
import './Modal.css';

export const Modal = (isOpen, handleModal, title, id, url) => {
  return (
    <div
      className='modal-wrapper'
      style={{ display: isOpen ? 'block' : 'none' }}
    >
      <div className='modal-header'>
        <p>Square Color Information</p>
        <span onClick={handleModal} className='close-modal-button'>
          x
        </span>
      </div>
      <div className='modal-content'>
        <div className='modal-body'>
          <h4>{title}</h4>
          <img key={id} src={url} alt='Brightly colored square' />
        </div>
        <div className='modal-footer'>
          <button onClick={handleModal} className='button-cancel'>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
