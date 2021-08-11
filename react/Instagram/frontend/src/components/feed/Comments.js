import styled from "styled-components";
import Comment from "./Comment";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

const CommentsContainer = styled.div`
  margin-top: 30px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  font-size: 10px;
  margin: 10px 0px;
  display: block;
  font-weight: 600;
`;

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $comment: String!) {
    createComment(photoId: $photoId, comment: $comment) {
      ok
      error
    }
  }
`;

function Comments({ author, caption, commentsNumber, comments, photoId }) {
  const { register, handleSubmit, setValue } = useForm();

  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION
  );

  const onValid = (data) => {
    const { comment } = data;
    // console.log(comment);

    if (loading) return;

    createCommentMutation({
      variables: {
        photoId,
        comment,
      },
    });
    setValue("comment", "");
  };

  return (
    <CommentsContainer>
      <Comment author={author} caption={caption} />
      <CommentCount>댓글 {commentsNumber}개</CommentCount>
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          author={comment.user.username}
          caption={comment.comment}
        />
      ))}
      <div>
        <form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("comment", { required: true })}
            name="comment"
            type="text"
            placeholder="Write a comment "
          />
        </form>
      </div>
    </CommentsContainer>
  );
}

export default Comments;
