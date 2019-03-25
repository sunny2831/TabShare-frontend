import React from 'react';

import './AddTabModal.css';

const AddTabModal = (props) => {
    return (
        <div>
            <div className="modal-backdrop"
                style={{
                    transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                <div className="modal-box">
                  <div className="modal-header">
                      <h1 className="header-text">Add a Tab</h1>
                      <form >
                          <label for="with" className="username-label">with you and:</label>
                          <input type="text" placeholder="enter username" className="enter-username" required></input>
                          <input type="text" placeholder="enter description" className="enter-description"  required></input>
                          <label for="total" className="pound-sign">£</label>
                          <input type="text" placeholder="0.00" className="enter-total" required></input>
                          <label for="paid-by" className="paid-by-label">paid by:</label>
                          <input type="text" placeholder="Me or Them" className="enter-paid-by" required></input>
                          <input type="text" placeholder="£ Amount Owed" className="enter-amount-owed" required></input>
                          <button className="close-modal" type="button" onClick={props.close}>close</button>
                          <button className="save-btn" type="button">Save</button>


                      </form>
                  </div>
                </div>
            </div>
        </div>
    )
}

export default AddTabModal;
