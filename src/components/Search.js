import React, { useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase-config"
import { useContext } from "react";
import { AuthContext } from "../context/Auth-context"




function Search({ openChat }) {
  const [user, setUser] = useState('')
  const usersRef = collection(db, "users");
  const { currentUser } = useContext(AuthContext)


  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputRef = e.target[0].value;
    const q = query(usersRef, where("displayName", "==", inputRef));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const foundMatch = doc.data()
      setUser(foundMatch)
    });
  }
  const ClickHandler = () => {
    openChat(user);
  }

  return (
    <>
      <form class="d-flex" role="search" onSubmit={handleSubmit}>
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
      <div className='container'>
        {user && (
          <span onClick={ClickHandler}>{user.displayName}</span>
        )}
      </div>




    </>


  )
}

export default Search;
