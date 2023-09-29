import { useState, useCallback, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const activeHttpRequests: any = useRef([]);

  const sendRequest = useCallback(
    async (
      url: RequestInfo | URL,
      method = 'GET',
      body: string | null = null,
      headers = {}
    ) => {
      setIsLoading(true);

      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);
      try {
        console.log('try response?');
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        console.log(response);

        setIsLoading(false);

        return response;
      } catch (err: any) {
        toast.error(err.message);
      }
      setIsLoading(false);
    },
    []
  );

  useEffect(() => {
    return () => {
      // eslint-disable-next-line
      activeHttpRequests.current.forEach((abortCtrl: any) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest };
};
