import axios from "axios";

export const getAllRecipe = () => async (dispatch) => {
  try {
    const recipes = await axios.get(`http://192.168.18.6:7474/recipes`);
    const result = recipes.data.data;
    dispatch({ type: "GET_ALL_RECIPE", payload: result });
  } catch (err) {
    console.error(err.message);
  }
};

export const createRecipeActions =
  (recipes_title, recipes_ingredients, recipes_video, recipes_photo, login) => async (dispatch) => {
    try {
        const formData = new FormData();
        formData.append('recipes_title', recipes_title)
        formData.append('recipes_ingredients', recipes_ingredients)
        formData.append('recipes_video', recipes_video)
        formData.append('users_id', login)
        if(recipes_photo){
          formData.append('recipes_photo', {
            uri: recipes_photo,
            name:"recipes_photo.jpg",
            type: "image/jpeg"
          })
        }
        const res = await axios.post("http://192.168.18.6:7474/recipes", formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      if (res.data.message === "Create Product Success") {
        alert("Create recipe success");
      }
      const result = res.data.data;

      dispatch({ type: "CREATE_RECIPE", payload: result });
    } catch (err) {
      console.error(err.message);
    }
  };

export const updateRecipeActions =
  (title, description, video, image, recipes_id, setModalVisible, getData) =>
  async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("recipes_title", title);
      formData.append("recipes_ingredients", description);
      formData.append("recipes_video", video);
      if (image) {
        formData.append("recipes_photo", {
          uri: image,
          name: "image.jpg",
          type: "image/jpeg",
        });
      }
      const recipes = await axios.put(
        `http://192.168.18.6:7474/recipes/${recipes_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (recipes.data.statusCode === 200) {
        setModalVisible(false);
        alert("Update Recipe Success");
        getData();
      }
      const result = recipes.data.data;
      dispatch({ type: "UPDATE_RECIPE", payload: result });
    } catch (err) {
      console.error(err.message);
    }
  };

export const deleteRecipeActions = (recipes_id) => async (dispatch) => {
  try {
    const recipes = await axios.delete(
      `http://192.168.18.6:7474/recipes/${recipes_id}`
    );
    const result = recipes.data.data;
    dispatch({ type: "DELETE_RECIPE", payload: result });
    alert("Delete Recipe Success");
  } catch (err) {
    console.error(err.message);
  }
};