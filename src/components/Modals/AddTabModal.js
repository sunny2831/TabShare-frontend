import React from 'react';

import './AddTabModal.css';


// class AddTabModal extends React.Component {
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
                      <form onSubmit={props.addTabOnSave}>
                          <input type="text" name="owed_to_user" placeholder="debit username" className="enter-username" required></input>
                          <input type="text" name="owed_by_user" placeholder="credit username" className="enter-description"  required></input>
                          <label htmlFor="total" className="pound-sign">£</label>
                          <input type="text" name="tab_total" placeholder="Tab Total" className="enter-total" required></input>
                          <input type="text" name="description" placeholder="Description" className="enter-paid-by" required></input>
                          <input type="text" name="amount_owed" placeholder="£ Amount Owed" className="enter-amount-owed" required></input>
                          <button className="close-modal" type="button" onClick={props.close}>close</button>
                          <button className="save-btn" type="submit" >Save</button>


                      </form>
                  </div>
                </div>
            </div>
        </div>
    )
}

export default AddTabModal;
