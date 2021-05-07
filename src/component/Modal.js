import React from 'react';
import './Modal.css';

export const Modal = (
  isOpen,
  handleModal,
  handleDescription,
  title,
  id,
  url
) => {
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

        {/* Form for user's descriptions */}
        <section>
          <h4>Add a description!</h4>
          <form onSubmit={handleDescription}>
            <label>Paint Description: </label>
            <input type='text' id='description' name='description'></input>
            <button type='submit'>Post</button>
          </form>
        </section>

        <div>
          <p>
            <b>
              <u>Descriptions:</u>
            </b>
          </p>
          <div></div>
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
