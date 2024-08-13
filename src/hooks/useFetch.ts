import { useEffect, useState } from "react";
import { fetchData } from "../utils";
import { Category } from "../types";

const initialState: {
  status: string;
  value?: Category[];
  error?: string;
} = {
  status: "pending",
  value: undefined,
  error: undefined,
};

const useFetch = (url: string, config?: Record<string, unknown>) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    (async function () {
      setState(initialState);

      try {
        const data = await fetchData(url, config);
        setState({
          status: "success",
          value: data,
          error: undefined,
        });
      } catch (err) {
        setState({
          status: "success",
          value: undefined,
          error: err as string,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...state,
  };
};

export default useFetch;
