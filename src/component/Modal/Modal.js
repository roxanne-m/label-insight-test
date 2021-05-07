import React from 'react';
import './Modal.css';

export const Modal = (props) => {
  return (
    <div
      className='modal-wrapper'
      style={{ display: props.isOpen ? 'block' : 'none' }}
    >
      {/* Modal Header */}
      <div className='modal-header'>
        <p>Square Color Information</p>
        <span onClick={props.handleModal} className='close-modal-button'>
          x
        </span>
      </div>
      {/* Modal Content */}
      <div className='modal-content'>
        {/* Modal Body */}
        <div className='modal-body'>
          <h4>{props.title}</h4>
          <img key={props.id} src={props.url} alt='Brightly colored square' />
        </div>

        {/* Form for user's descriptions */}
        <div className='form-description'>
          <section>
            <p>
              <b>Add a description!</b>
            </p>
            <form onSubmit={props.handleDescription}>
              <label>Paint Description: </label>
              <input
                type='text'
                id='description'
                value={props.userDescription}
                onChange={props.handleDescriptionChange}
              ></input>
              <button type='submit'>Post</button>
            </form>
          </section>

          <p>
            <b>
              <u>Descriptions:</u>
            </b>
          </p>
          <div>{props.userDescription}</div>
        </div>
        {/* Modal Footer */}
        <div className='modal-footer'>
          <button onClick={props.handleModal} className='button-cancel'>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
