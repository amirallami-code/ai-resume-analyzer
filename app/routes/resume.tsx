import { Link, useParams } from "react-router";
import { usePuterStore } from "~/lib/puter";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";


export const meta = () => ([
    {title: "Resumind | Review"},
    {name: 'description', content: 'Detailed overview of your resume'}
])

const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();
    const [jobTitle, setJobTitle] = useState('');

    useEffect(() => {
        if(!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/:${id}`);
    }, [isLoading])

    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume:${id}`);

            if (!resume) return;

            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if(!resumeBlob) return;

            const pdfBlob = new Blob([resumeBlob], {type: "application/pdf"});
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if (!imageBlob) return;
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
            setJobTitle(data.jobTitle);
        }

        loadResume();
    }, [id]);

    return (
        <main className="!pt-0">
            <nav className="resume-nav">
                <div className="flex flex-row flex-wrap gap-3 items-center">
                    <Link to="/" className="back-button">
                        <img src="/icons/back.svg" alt="Go Back" className="w-2.5 h-2.5" />
                        <span className="text-gray-800 text-sm font-semibold">Back to Homepage</span>
                    </Link>
                    <div className="h-full flex flex-row gap-1 items-center justify-center cursor-default text-sm md:text-base">

                        {
                            jobTitle ? (
                                <p className="text-gray-500">
                                    {jobTitle}
                                </p>
                            ) : (
                                <span className="loader"></span>
                            )
                        }

                        <img src="/icons/chevron-right.svg" alt="Icon" />
                        <p>Resume Review</p>
                    </div>
                </div>
            </nav>

            <div className="flex flex-row w-full max-lg:flex-col-reverse">
                <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover min-h-[50vh] md:h-[100vh] sticky top-0 items-center justify-center">
                    {imageUrl && resumeUrl && (
                        <div className="animate-in fade-in duration-1000 gradient-border !p-2.5 max-sm:m-0 md:h-[90%] max-wxl:h-fit w-fit">
                            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={imageUrl}
                                    className="w-full h-full object-contain rounded-2xl"
                                    title="resume"
                                />
                            </a>
                        </div>
                    )}
                </section>
                <section className="feedback-section">
                    <h2 className="text-3xl !text-black font-bold">Resume Review</h2>
                    {feedback ? (
                        <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                            <Summary feedback={feedback}/>
                            <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []}/>
                            <Details feedback={feedback}/>
                        </div>
                    ) : (
                        <img src="/images/resume-scan-2.gif" alt="Scanning..." className="w-full md:w-1/2 m-auto" />
                    )}
                </section>
            </div>
        </main>
    )
}
export default Resume
