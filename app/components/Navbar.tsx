import { Link } from "react-router";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="md:ml-2">
                <p className="text-base md:text-xl font-bold text-gradient">RESUMIND</p>
            </Link>
            <Link to="/upload" className="primary-button w-fit text-sm md:text-base">
                Upload Resume
            </Link>
        </nav>
    )
}

export default Navbar;