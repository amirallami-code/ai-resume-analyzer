import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
    const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);

    const loadFiles = async () => {
        const files = (await fs.readDir("./")) as FSItem[];
        setFiles(files);
    };

    useEffect(() => {
        loadFiles();
    }, []);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe");
        }
    }, [isLoading]);

    const handleDelete = async () => {
        files.forEach(async (file) => {
            await fs.delete(file.path);
        });
        await kv.flush();
        loadFiles();
    };

    if (isLoading) {
        return <main className="bg-[url('/images/bg-main.svg')] bg-cover flex flex-col gap-4 items-center justify-center px-4">
            <p className="text-gray-500">
                Loading...
            </p>
        </main>;
    }

    if (error) {
        return <main className="bg-[url('/images/bg-main.svg')] bg-cover flex flex-col gap-4 items-center justify-center px-4">
            <p className="text-gray-500">
                Error: {error}
            </p>
        </main>;
    }

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover flex flex-col gap-4 items-center justify-center px-4">
            <nav className="resume-nav absolute top-1 left-1 !border-none">
                <Link to="/" className="back-button bg-white">
                    <img src="/icons/back.svg" alt="Go Back" className="w-2.5 h-2.5" />
                    <span className="text-gray-800 text-sm font-semibold">Back to Homepage</span>
                </Link>
            </nav>
            <section className="flex flex-col gap-4">
                <p className="border-b-2 border-gray-300/50 pb-5">
                    Authenticated as: <span className="font-semibold">{auth.user?.username}</span>
                </p>
                <p className="text-sm">Existing Files:</p>
                <div className="flex flex-col gap-2">
                    {files.length ? (
                        files.map((file) => (
                            <div key={file.id} className="text-start text-xs">
                                <p>{file.name}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">App is Clear!</p>
                    )}
                </div>
                <div className="border-t-2 border-gray-300/50 pt-5">
                    <button
                        className="primary-button px-4 py-2 rounded-xl cursor-pointer"
                        onClick={() => handleDelete()}
                    >
                        Clear Data
                    </button>
                </div>
            </section>
        </main>
    );
};

export default WipeApp;