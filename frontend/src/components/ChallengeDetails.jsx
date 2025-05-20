import { getChallengeId } from "../adapters/challengesFetch";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import CreatePost from "./CreatePost";

function ChallengeInfo() {
    const { id } = useParams();
    const [challenge, setChallenge] = useState(null);
    const { currentUser } = useContext(CurrentUserContext);
    const [showCreatePost, setShowCreatePost] = useState(false);

    console.log({ currentUser });

    const navigate = useNavigate();
    useEffect(() => {
        if (!currentUser) {
            console.log("No current user, redirecting to login");
            navigate("/login");
            return;
        }

        const getChallengeInfo = async () => {
            try {
                const [data, error] = await getChallengeId(id);
                if (error) {
                    console.error("Error fetching challenge:", error);
                    return;
                }
                setChallenge(data);
            } catch (error) {
                console.error("Error fetching challenge:", error);
            }
        };
        getChallengeInfo();
    }, [id, currentUser, navigate]);

    const handleJoin = () => {
        setShowCreatePost(true);
    };

    if (!challenge) return <p>Loading...</p>;

    return (
        <>
            <h2>{challenge.title}</h2>
            <p>Description: {challenge.description}</p>
            <p>Start Date: {challenge.created_at}</p>
            <p>End: {challenge.end_time}</p>
            {showCreatePost && (
                <CreatePost onPostCreated={() => setShowCreatePost(false)} challengeId={challenge.id} />
            )}
            <div className="challengeDetails">
                <p><strong>Description:</strong> {challenge.description}</p>
                <p><strong>Start Date:</strong> {challenge.created_at}</p>
                <p><strong>End:</strong> {challenge.end_time}</p>
            </div>
            <div className="challengeActions">
                <button onClick={handleJoin}>Join</button>
                <Link to={"/challenges"}>
                    <button>Back to Challenges</button>
                </Link>
            </div>
        </>
    );
}

export default ChallengeInfo;
