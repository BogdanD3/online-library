import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Change Password</h2>
        <form id="passwordForm">
          <label htmlFor="oldPassword">Old Password:</label>
          <input type="password" id="oldPassword" name="oldPassword" required />
          <br />
          <br />
          <label htmlFor="newPassword">New Password:</label>
          <input type="password" id="newPassword" name="newPassword" required />
          <br />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
      <style>{`
            /* The Modal (background) */
.modal {
    display: flex; /* Use flexbox to center the modal */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px; /* Max width for better appearance on large screens */
}

/* The Close Button */
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
}

            `}</style>
    </div>
  );
};

export default Modal;
