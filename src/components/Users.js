import { useState, useEffect } from "react";
import axios from "../api/axios";

const Users = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    let isMounted = true;
    // cancel any request when a component unmounts
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axios.get("/users", {
          // controller signal will allow us to cancel the request if we need to
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getUsers();

    // cleanup function
    // it runs as the component unmounts
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display!</p>
      )}
    </article>
  );
};

export default Users;
