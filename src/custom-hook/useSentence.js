import axios from 'axios';
import { useQuery } from 'react-query';

function useAPI() {
  const { data, error, isLoading, refetch } = useQuery(["sentence"], () => {
    return axios.get("http://metaphorpsum.com/paragraphs/5").then(res => res.data);
  })

  return { data, error, isLoading, refetch };

}

export default useAPI;