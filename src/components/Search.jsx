import React, { useState, useContext } from "react";
import { db } from "../firebase";
import { collection, query, where, doc, getDocs, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    
    const {currentUser} = useContext(AuthContext);

    const handleChange = (e) => {
        return setUsername(e.target.value);
    };

    const handleSearch = async () => {
        // Create a query against the collection.
        const q = query(
            collection(db, "users"), 
            where("displayName", "==", username)
        );
        
        try{
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        }catch(err){
            setErr(true);
        }
    };

    const handleKeydown = (e) => {
        e.code === "Enter" && handleSearch();
    };

    const handleSelect = async () => {  
        //check whether the group(chat collection in firestore) exist
        const combinedID = currentUser.uid > user.uid 
        ? currentUser.uid + user.uid 
        : user.uid + currentUser.uid
        
        try{
            const res = await getDoc(doc(db, "chats", combinedID))
           
            if(!res.exists()){
                //create a new chats collection
                await setDoc(doc(db,"chats",combinedID),{ messages: []});
                
                //create user chats
                //this is updating firestore for sender
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedID + ".userInfo"]:{
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedID+".date"]: serverTimestamp(),
                });

                //this is updating firestore for receipient
                await updateDoc(doc(db,"userChats",user.uid),{
                    [combinedID + ".userInfo"]:{
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedID+".date"]: serverTimestamp(),
                });
            }
        }catch(err){}
        setUser(null);
        setUsername("")
    };  

    return (
    <div className="search">
        <div className="searchForm">
            <input 
            type="text" 
            placeholder="Find a user" 
            onKeyDown={handleKeydown} 
            onChange={handleChange}
            value={username}
            />
        </div>
        {err && <span>User not found</span>}
        {user && (
            <div className="userChat" onClick={handleSelect}>
                <img src={user.photoURL} alt="" />
                <div className="userChatInfo">
                    <span>{user.displayName}</span>
                </div>
            </div>
        )}
    </div>
    );
};

export default Search;