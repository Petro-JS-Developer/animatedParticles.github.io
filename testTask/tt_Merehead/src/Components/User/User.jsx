import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { deleteUserFromState, isEditCell, boolValCell, editUserAction } from '../../Store/store';
import './style.css'
import { deleteUser, editUser } from '../../API/api';
import { useDispatch, useSelector } from 'react-redux';

export const User = ({ name, email, phone, website, id }) => {
  const dispatch = useDispatch();
  const isEdCell = useSelector(boolValCell);

  const [editName, setEditName] = useState(false);
  const [customName, setCustomName] = useState(name);

  const [editEmail, setEditEmail] = useState(false);
  const [customEmail, setCustomEmail] = useState(email);

  const [editPhone, setEditPhone] = useState(false);
  const [customPhone, setCustomPhone] = useState(phone);

  const [editWebsite, setEditWebsite] = useState(false);
  const [customWebsite, setCustomWebsite] = useState(website);

  const verificationEditCell = (setValue) => {
    if (isEdCell) {
      dispatch(isEditCell(false));
      setValue(true);
    }
  }

  const handleEdit = (e, setValue) => {
    setValue(e.target.value);
  }

  const handleSave = async (e, id, setValue, value) => {
    if (e.code === "Enter") {
      if (!customName || !editEmail || !editPhone || !editWebsite) {
        setValue(value);
      }

      editUser(id, {
        method: 'PATCH',
        body: JSON.stringify({
        name: customName,
        email: customEmail,
        phone: customPhone,
        website: customWebsite,
        }),
        headers: { 'Content-type': 'application/json; charset=utf-8' },
      })

      dispatch(editUserAction(
        {
          id: id,
          name: customName,
          email: customEmail,
          phone: customPhone,
          website: customWebsite,
          }
      ))

      setEditName(false);
      dispatch(isEditCell(true));
    }

    if (e.code === "Escape") {
      setValue(value);
      setEditName(false);
    }
  }

  return (
    <tr>
      <td onDoubleClick={() => { verificationEditCell(setEditName) }}>{editName && !isEdCell ? <input value={customName} onChange={(e) => handleEdit(e, setCustomName)} onKeyDown={(e) => handleSave(e, id, setCustomName, customName)} /> : customName}</td>
      <td onDoubleClick={() => { verificationEditCell(setEditEmail) }}>{editEmail && !isEdCell ? <input value={customEmail} onChange={(e) => handleEdit(e, setCustomEmail)} onKeyDown={(e) => handleSave(e, id, setCustomEmail, customEmail)} /> : customEmail}</td>
      <td onDoubleClick={() => { verificationEditCell(setEditPhone) }}>{editPhone && !isEdCell ? <input value={customPhone} onChange={(e) => handleEdit(e, setCustomPhone)} onKeyDown={(e) => handleSave(e, id, setCustomPhone, customPhone)} /> : customPhone}</td>
      <td onDoubleClick={() => { verificationEditCell(setEditWebsite) }}>{editWebsite && !isEdCell ? <input value={customWebsite} onChange={(e) => handleEdit(e, setCustomWebsite)} onKeyDown={(e) => handleSave(e, id, setCustomWebsite, customWebsite)} /> : customWebsite}</td>
      <td> <button onClick={async () => {
        await deleteUser(id);
        deleteUserFromState(id);
      }}>Delete</button></td>
    </tr>
  )
};

User.propTypes = {
  id: PropTypes.any,
  name: PropTypes.any,
  email: PropTypes.any,
  phone: PropTypes.any,
  website: PropTypes.any,
}

