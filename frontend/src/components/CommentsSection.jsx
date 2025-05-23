import React, { useState, useEffect, useContext } from 'react';
import {
  addComment,
  getCommentsByPostId,
  deleteComment,
} from '../adapters/commentsFetch';
import CurrentUserContext from '../contexts/current-user-context';
import { getUserById } from '../adapters/user-adapter'; // Import the function to get user by ID
// import { useParams } from "react-router-dom";

const CommentsSection = ({ postId }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const [data, error] = await getCommentsByPostId(postId);
        if (error) {
          console.error('Error fetching comments:', error);
          return;
        }

        console.log('Fetched comments:', data.comments);

        // Fetch user details for each comment
        const commentsWithUserDetails = await Promise.all(
          data.comments.map(async (comment) => {
            const [user, userError] = await getUserById(comment.user_id);
            if (userError) {
              console.error(
                `Error fetching user for comment ${comment.id}:`,
                userError
              );
              return { ...comment, user: { username: 'Unknown' } }; // fallback
            }
            return { ...comment, user };
          })
        );

        setComments(commentsWithUserDetails);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      alert('Comment cannot be empty!');
      return;
    }

    try {
      const [comment, error] = await addComment({
        post_id: postId,
        user_id: currentUser.id,
        content: newComment,
      });
      if (error) {
        console.error('Error submitting comment:', error);
        return;
      }

      // Fetch user details for the new comment
      const [user, userError] = await getUserById(currentUser.id);
      if (userError) {
        console.error('Error fetching user for new comment:', userError);
        return;
      }

      setComments((prevComments) => [...prevComments, { ...comment, user }]);

      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      const [response, error] = await deleteComment(id);

      console.log('Delete response:', response, id);

      if (error) {
        console.error('Error deleting comment:', error);
        return;
      }

      // Remove the deleted comment from the state
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== id)
      );
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="comments-section">
      <h5>Comments:</h5>
      <ul>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <li key={`${comment.id}-${index}`}>
              <strong>{`${comment.user?.username}`}</strong> {comment.content}
              {currentUser?.id === comment.user_id && (
                <button
                  className="deleteButton"
                  onClick={() => {
                    console.log('Clicked comment:', comment);
                    handleDeleteComment(comment.id);
                  }}
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </button>
              )}
            </li>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </ul>
      <textarea
        className="commentBox"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write a comment..."
        rows="4"
        cols="50"
      ></textarea>
      <button onClick={handleCommentSubmit}>Submit Comment</button>
    </div>
  );
};

export default CommentsSection;
