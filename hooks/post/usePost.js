import { useQuery } from "react-query";
import { request } from "../../api/utils.js";

export const getPostDetail = (id) =>
  request.get(`/posts/${id}`).then((res) => res.data);

const usePost = ({ id }) => {
  const post = useQuery(["posts", id], () => getPostDetail(id));

  return {
    ...post,
  };
};

export default usePost;
