import React, { useEffect } from 'react';
import { getUsersFromServer, allUsers, fromUser, toUser } from '../../Store/store';
import { useSelector } from "react-redux";
import './style.css'
import {User} from '../User/User'

export const Table = () => {
  const arrUsers = useSelector(allUsers)
  const fromUsers = useSelector(fromUser);
  const toUsers = useSelector(toUser);

  useEffect(() => {
    getUsersFromServer();
  }, [arrUsers.length]);

    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Full name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {arrUsers ? arrUsers.map((user, i) => i >= fromUsers - 1 && i < toUsers ? (
              <User key={user.id} {...user} />
            ) : null) : null}
          </tbody>

        </table>
      </>

    )
  };