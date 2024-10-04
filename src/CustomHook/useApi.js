// import { useState, useEffect } from 'react';

// function useApi(url, method = 'GET', body = null) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!url) return;
//     fetchData();
//   }, [url, method, body]);

//   async function fetchData() {
//     // Retrieve the token and type from localStorage
//     const token = localStorage.getItem('token');
//     const type = localStorage.getItem('type');
//     console.log(token);
//     console.log(type);

//     const options = {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//           token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzliMjkzMzNmZjA4YjVlZjE2ZGI3MCIsInJvbGUiOiJzdXBlckFkbWluIiwiaWF0IjoxNzI1NjI4MzI1fQ.1Eqw34EoDT1f0HH0PFferIfJJsuEelPtaeHNUj0IJLE",// Use token from localStorage if available
//           type:"superAdmin", // Use type from localStorage if available
//         },
//         body: method === 'GET' ? null : body ? JSON.stringify(body) : null,
//       };
      

//     try {
//       const response = await fetch(url, options);
//       if (!response.ok) throw new Error('Network response was not ok');
//       const result = await response.json();
//       setData(result);
//     } catch (error) {
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return { data, loading, error,fetchData };
// }

// export default useApi;

import { useState, useCallback } from 'react';

function useApi() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async ({ url, method = 'GET', body = null }) => {
    setLoading(true);
    setError(null);

    // Static token and type
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzliMjkzMzNmZjA4YjVlZjE2ZGI3MCIsInJvbGUiOiJzdXBlckFkbWluIiwiaWF0IjoxNzI1NjI4MzI1fQ.1Eqw34EoDT1f0HH0PFferIfJJsuEelPtaeHNUj0IJLE";
    const type = "superAdmin";

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'token': token, // Static token
        'type': type, // Static type
      },
      body: method === 'GET' ? null : body ? JSON.stringify(body) : null,
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchData };
}

export default useApi;