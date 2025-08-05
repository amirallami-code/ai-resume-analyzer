import { useEffect } from "react";
import {Link, useLocation, useNavigate} from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => ([
    {title: "Resumind | Authentication"},
    {name: 'description', content: 'Log into your account'}
])

const Auth = () =>{
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next])

    return (
        <main className="bg-[url('images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
            <nav className="resume-nav absolute top-1 left-1 !border-none">
                <Link to="/" className="back-button">
                    <img src="/icons/back.svg" alt="Go Back" className="w-2.5 h-2.5" />
                    <span className="text-gray-800 text-sm font-semibold">Back to Homepage</span>
                </Link>
            </nav>

            <div className="gradient-border shadow-lg mx-4 !p-2.5">
                <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1>Welcome</h1>
                        <h2>Log In to Continue Your Job Journey</h2>
                    </div>

                    <div>
                        {isLoading ? (
                            <button className="auth-button animate-pulse">
                                <p>Signing you in...</p>
                            </button>
                        ) : (
                            <>
                                {auth.isAuthenticated ? (
                                    <button className="auth-button" onClick={auth.signOut}>
                                        <p>Sign Out</p>
                                    </button>
                                ) : (
                                    <button className="auth-button" onClick={auth.signIn}>
                                        <p>Sign In</p>
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Auth;