import axios from 'axios';
import { useQuery } from 'react-query';

function useAPI() {
  const { data, error, isLoading } = useQuery(["sentence"], () => {
    return axios.get("http://metaphorpsum.com/paragraphs/5").then(res => res.data);
  })

  return { data, error, isLoading };

}

export default useAPI;