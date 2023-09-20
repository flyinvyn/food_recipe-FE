import axios from "axios";

export const createLikeActions = (id, dataUser) => async (dispatch) => {
  try {
    const data = {
      recipes_id: id,
      users_id: dataUser,
    };
    const likes = await axios.post("https://food-recipe-be.vercel.app/likeds", data);
    if (likes.data.statusCode === 201) {
      alert("Like Recipe Success");
    } else if (likes.data.message === "Like Already") {
      alert("Liked Already");
    }
    const result = likes.data.data;

    dispatch({ type: "CREATE_LIKE", payload: result });
  } catch (err) {
    console.error(err.message);
  }
};

export const getUserLikeActions = (dataUser) => async (dispatch) => {
  try {
    const likes = await axios.get(
      `https://food-recipe-be.vercel.app/likeds/users/${dataUser}`
    );
    const result = likes.data.data;
    dispatch({ type: "GET_ALL_LIKE", payload: result });
  } catch (err) {
    console.log(err.message);
  }
};
export const deleteLikeActions = (likeds_id) => async (dispatch) => {
  try {
    const likes = await axios.delete(
      `https://food-recipe-be.vercel.app/likeds/${likeds_id}`
    );
    const result = likes.data.data;
    dispatch({ type: "DELETE_LIKE", payload: result });
  } catch (err) {
    console.log(err.message);
  }
};