import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function PrimaryBtn() {
  return (
    <Link to="add-bibliotekar">
      <button>
        <i className="bi bi-plus-lg" style={{ fontSize: "1rem" }}></i> Novi
        Bibliotekar/ka
      </button>
    </Link>
  );
}

export default PrimaryBtn;
