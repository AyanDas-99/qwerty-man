import axios from 'axios';
import { useQuery } from 'react-query';

function useAPI() {
  const { data, error, isLoading, refetch } = useQuery(["sentence"], () => {
    return axios.get("https://baconipsum.com/api/?type=mean-and-filler&paras=6&format=text").then(res => res.data);
  })

  return { data, error, isLoading, refetch };

}

export default useAPI;