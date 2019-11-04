import React from 'react';

class ContactPage extends React.Component {
  render() {
    return (
      <form
        action="https://formspree.io/dreadloresystem@gmail.com"
        className="col l7 m12"
        id="contact-form"
        method="POST"
      >
        <h3>Contact Us:</h3>
        <div className="input-field">Enter your name:<br />
          <input 
            name="name"
            type="text">
          </input>     
        </div>

        <div className="input-field">
          Enter your e-mail address:
          <input 
            name="_replyto"
            type="email">
          </input>
        </div>

        <div className="input-field">
          What are you asking?<br />
          <textarea 
            className="materialize-textarea" 
            name="message"></textarea>
        </div>

        <button 
          className="btn waves-effect red darken-2"
          name="action"
          type="submit"
          value="Send"
        >Send 
        {/* <i className="material-icons right"></i> */}
        </button>
      </form>
    );
  };
};

export default ContactPage;