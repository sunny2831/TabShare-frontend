import React from 'react';

import './SettleUpModal.css';

const SettleUpModal = (props) => {
  return(
    <div>
      <div className="settle-backdrop"
          style={{
              transform: props.showing ? 'translateY(0vh)' : 'translateY(-100vh)',
              opacity: props.showing ? '1' : '0'
          }}>
          <div className="settle-box">
            <div className="settle-header">
                <h1 className="settle-up">Settle Up</h1>
                <form>
                  <input type="text" placeholder="from username" className="from-username" required></input>
                  <label for="paid" className="paid-label">paid</label>
                  <input type="text" placeholder="to username" className="to-username" required></input>
                  <label for="smount" className="sterling-sign">£</label>
                  <input type="text" placeholder="0.00" className="payment-amount" required></input>
                  <button className="close-settler" type="button" onClick={props.closing}>close</button>
                  <button className="save-payment" type="button">Save</button>
                </form>
            </div>
          </div>
      </div>
    </div>
  )
}

export default SettleUpModal
