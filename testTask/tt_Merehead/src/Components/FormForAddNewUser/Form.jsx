import React from 'react';
import { addUser } from '../../API/api';
import { addUserToState } from '../../Store/store';
import './styleForForm.css';

export const Form = () =>  (
    <div className="container">
      <form className="new-employee-form" name="addUser" method="get">
        <label className="labelForm" htmlFor="name">Full name:*
        <input className="inputForm" type="text" name="name" id='name' required placeholder="Irina Sokolova"/>
        </label>
        <label className="labelForm" htmlFor="email">Email:*
        <input className="inputForm" type="email" name="email" id="email" required placeholder="ivanov@gmail.com"/>
        </label>
        <label className="labelForm" htmlFor="phone">Phone:*
        <input className="inputForm" type="tel" name="phone" id="phone" required placeholder="+38(097)532-23-11"/>
        </label>
        <label className="labelForm" htmlFor="webSite">Web site:*
        <input className="inputForm" type="url" name="webSite" id="webSite" required  placeholder="https://mysite.com"/>
        </label>
        <button type="submit" className="formButton" onClick={async(event) => {
          let form = event.target.form;
          await addUser({
            method: 'POST',
            body: JSON.stringify({
              name: form.name.value,
              email: form.email.value,
              phone: form.phone.value,
              website: form.webSite.value,
            }),
            headers: { 'Content-type': 'application/json; charset=utf-8' },
          })

          addUserToState({
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            website: form.webSite.value,
          });

          form.reset();
        }}>Add new user</button>
      </form>
    </div>
  );