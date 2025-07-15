import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const Navbar = ({ onLogout }) => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Student Data Collection
        </Link>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;