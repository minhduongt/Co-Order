import { useQuery } from "react-query";
import { getAllPosts } from "../../api/post";

const usePosts = (params) => {
  const posts = useQuery(["posts", params], () => getAllPosts(params));

  return {
    ...posts,
    data: posts.data?.data,
    metadata: posts.data?.metadata,
  };
};

export default usePosts;
