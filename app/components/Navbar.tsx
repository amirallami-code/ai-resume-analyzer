import { Link } from "react-router";
import {usePuterStore} from "~/lib/puter";

const Navbar = () => {
    const { auth, kv } = usePuterStore();

    return (
        <nav className="navbar">
            <Link to="/" className="md:ml-2">
                <p className="text-base md:text-xl font-bold text-gradient">RESUMIND</p>
            </Link>

            { !auth.isAuthenticated ? (
                <Link to="/auth?next=/" className="primary-button w-fit text-sm md:text-base font-semibold">
                    Sign In
                </Link>
            ) : (
                <Link to="/upload" className="primary-button w-fit text-sm md:text-base">
                    Upload Resume
                </Link>
            )}
        </nav>
    )
}

export default Navbar;