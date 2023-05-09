import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useRefreshToken from '../../hooks/useRefreshToken';

function Comment({ comment, onDelete }) {
  const refresh = useRefreshToken();
  const handleDelete = async () => {
    const newAccessToken = await refresh();
    try{
    axios.delete(`http://localhost:8080/Avis/${comment._id}`,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${newAccessToken}`,
      },
    })
      .then(response => {
        console.log('Comment deleted:', response.data);
        onDelete(comment._id);
      })
      .catch(error => {
        console.error('Error deleting comment:', error);
      });
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-200 p-2 my-2">
      <p className="text-gray-700">{comment.NameUser}</p>
      <p className="text-gray-700">{comment.commentaire[0]}</p>
      <p className="text-gray-700">{new Date(comment.DateCreation).toLocaleDateString("en-US",{day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"})}</p>
      <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-2">
        Delete
      </button>
    </div>
  );
}
function CommentForm() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(-1);
  const refresh = useRefreshToken();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newAccessToken = await refresh();
    try{
      axios.post('http://localhost:8080/Avis', {
        comm: comment,
        NoteEvaluation: rating,
        
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${newAccessToken}`,
        },
      })
      .then(response => {
        setComments([response.data, ...comments]);
        console.log('Comment submitted:', response.data);
        setComment('');
		setRating(-1);
      })
      .catch(error => {
        console.error('Error submitting comment:', error);
      });
    }catch(err){

      console.log(err);
    }
  };

  const handleDelete = (id) => {
    setComments(comments.filter(comment => comment._id !== id));
  };



const handleRatingChange = (e) => setRating(parseInt(e.target.value));
  useEffect(() => {
    axios.get('http://localhost:8080/Avis')
      .then(response => {
        console.log(response.data);
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="comment" className="block text-gray-700 font-bold mb-2">Comment</label>
          <textarea
            id="comment"
            placeholder="Your comment"
            value={comment}
            onChange={event => setComment(event.target.value)}
            className="border rounded-lg px-3 py-2 w-full"
            required
          />
        </div>
		<div className="mb-4">
        <span className="block text-gray-700 font-bold mb-2">Rating</span>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((value) => (
            <label key={value} className="inline-flex items-center mr-4">
              <input
                type="radio"
                className="form-radio"
                name="rating"
                value={value}
                checked={rating === value}
                onChange={handleRatingChange}
              />
              <span className="ml-2">{value} stars</span>
            </label>
          ))}
        </div>
      </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
      <div className="mt-8">
        {comments.map(comment => (
          <Comment key={comment._id} comment={comment} onDelete={handleDelete} />
        ))}
      </div>
    </>
  );
}

export default CommentForm;
