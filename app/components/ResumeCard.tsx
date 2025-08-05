import {Link} from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";
import resume from "~/routes/resume";

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if(!blob) return;
            let url = URL.createObjectURL(blob);
            setResumeUrl(url);
        }

        loadResume();
    }, [imagePath]);

    return (
        <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
            <div className="resume-card-header">
                <div className="flex flex-col gap-2">
                    {companyName && <h2 className="!text-black font-bold break-words">{companyName}</h2>}
                    {jobTitle && <h3 className="text-base break-words text-gray-500">{jobTitle}</h3>}
                    {!companyName && !jobTitle && <h2 className="!text-black font-bold">Resume</h2>}
                </div>
                <div className="flex-shrink-0">
                    <ScoreCircle score={feedback.overallScore} />
                </div>
            </div>
            {resumeUrl ? (
                <div className="gradient-border animate-in fade-in duration-1000 !p-3 !rounded-2xl">
                    <div className="w-full h-full">
                        <img src={resumeUrl} alt="Resume" className="w-full h-64 max-sm:h-[200px] object-cover object-top rounded-2xl" />
                    </div>
                </div>
            ) : (
                <div className="gradient-border animate-in fade-in duration-1000 !p-3 !rounded-2xl">
                   <p className="w-full h-full flex items-center justify-center text-gray-500 min-h-48">
                       <span className="loader !w-8 !h-8 !border-gray-300 !border-t-transparent"></span>
                   </p>
                </div>
            )}
        </Link>
    )
}
export default ResumeCard