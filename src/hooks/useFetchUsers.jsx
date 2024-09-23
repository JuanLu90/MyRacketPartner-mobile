import { useState, useEffect } from "react";
import { getUsersSearch } from "../resolvers/users.resolvers";

const useSearchUsers = (query) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(getUsersSearch(query));
        const result = await response.json();
        setUsers(result);
      } catch (err) {
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [query]);

  return { users, loading, error };
};

export default useSearchUsers;
