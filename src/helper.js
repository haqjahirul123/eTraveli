import axios from "axios";

// get all movie list

export const getMovies = async (setter, setLoading, setDatas) => {
  try {
    setLoading(true);
    const res = await axios.get("https://star-wars-api.herokuapp.com/films");
    const newData = res?.data?.map(item => ({
      ...item,
      episode : `EPISODE ${item?.fields?.episode_id}`
    }))
    setter(newData);
    setDatas(newData);
    setLoading(false);
  } catch (error) {
    alert("Something went wrong, try again");
    setLoading(false);
  }
};
