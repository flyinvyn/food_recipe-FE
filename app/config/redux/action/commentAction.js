import axios from "axios";

export const createCommentActions =
  (idRecipe, dataUser, commentText) => async (dispatch) => {
    try {
      const data = {
        recipes_id: idRecipe,
        comment_text: commentText,
        users_id: dataUser,
      };
      const comments = await axios.post(
        "https://food-recipe-be.vercel.app/comments",
        data
      );
      if (comments.data.statusCode === 201) {
        alert("Comment Recipe Success");
      }
      const result = comments.data.data;

      dispatch({ type: "CREATE_COMMENT", payload: result });
    } catch (err) {
      console.error(err.message);
    }
  };

export const getUserCommentActions = (id) => async (dispatch) => {
  try {
    const comments = await axios.get(`https://food-recipe-be.vercel.app/comments/${id}`);
    const result = comments.data.data;
    dispatch({ type: "GET_ALL_COMMENT", payload: result });
  } catch (err) {
    console.log(err.message);
  }
};