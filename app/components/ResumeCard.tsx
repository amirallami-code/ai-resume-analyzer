import { Link } from "react-router";
import ScoreCircle from "../components/ScoreCircle";

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
  return (
    <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
        <div className="resume-card-header">
            <div className="flex flex-col gap-1 items-start justify-center">
                <h2 className="!text-black font-bold break-words">{companyName}</h2>
                <h3 className="text-base break-words text-gray-500">{jobTitle}</h3>
            </div>
            <div className="flex-shrink-0">
                <ScoreCircle score={feedback.overallScore} />
            </div>
        </div>
        <div className="gradient-border animate-in fade-in duration-1000 !p-3 !rounded-2xl">
            <div className="w-full h-full">
                <img src={imagePath} alt="Resume" className="w-full h-64 max-sm:h-[200px] object-cover object-top rounded-2xl" />
            </div>
        </div>
    </Link>
  )
}

export default ResumeCard