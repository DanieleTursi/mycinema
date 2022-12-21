import React, { createContext, useReducer, useEffect } from "react";
import userReducer from "./UserReducer";
import jwt_decode from 'jwt-decode';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { db } from '../../firebase';
import {
    getFirestore,
    query,
    getDocs,
    doc, getDoc,
    collection,
    where,
    addDoc,
    onSnapshot,

} from "firebase/firestore";


const UserContext = createContext('')


export const UserProvider = ({ children }) => {
    const initialState = {
        register: false,
        userRegister: {},
        showNavButtons: true,
        user: null,
        loginError: null,
        registerError: null,
        sidebarOpen: false,
        id: null,


    }
    const [state, dispatch] = useReducer(userReducer, initialState);
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser != null) {
                dispatch({
                    type: 'USER_LOGGED_IN',
                    payload: currentUser,
                })
            }


        });
    }, []);

    // get the id of the user
    const getDocId = async (userid) => {
        const q = query(collection(db, "users"), where("uid", "==", userid));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({

            ...doc.data(), id: doc.id
        }))
        console.log(data)
        dispatch({
            type: 'GET_DOC_ID',
            id: data[0].id,
        })
    }



    // get the watchlist of the user

    const getWatchlist = async () => {
        const watchlist = query(collection(db, `users/${state.id}/watchlist`))
        const watchlistDetails = await getDocs(watchlist);
        const watchlistData = watchlistDetails.docs.map((doc) => ({
            ...doc.data(), id: doc.id
        }))
        console.log(watchlistData)

    }
    // add new subcollection

    const newSubcollection = async (id) => {
        const newCollectionRef = await addDoc(collection(db, "users", id, 'Watchlist'), {
            content: 'hello'
        })
    }
    // Opening and closing the sidebar

    const handleSidebarOpen = async () => {
        getWatchlist()
        console.log(state.id)
        dispatch({
            type: 'SIDEBAR_OPEN',
            payload: !state.sidebarOpen,
        })
    }

    const closeSidebar = () => {
        dispatch({
            type: 'SIDEBAR_OPEN',
            payload: false,
        })
    }
    // Register

    const handleRegister = (firstName, sirName, email, password) => {
        const user = {
            firstName: firstName,
            sirName: sirName,
            email: email,
            password: password,
            initials: firstName.charAt(0) + sirName.charAt(0)
        }
        dispatch({
            type: 'REGISTER_USER',
            payload: user
        })

        console.log(user);

    }
    const registerFunc = async (email, password, setErrorSpan, name) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log(res);
            const user = res.user;
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name,
                authProvider: "local",
                email,
            });

            dispatch({
                type: 'LOGIN',
                error: null,
            })
        } catch (error) {
            console.log(error.message);
            if (error.message === 'Firebase: Error (auth/email-already-in-use).') {

                setErrorSpan('*Email already in use*')
            } else {
                setErrorSpan(error.message)
            }
        }
    }

    // Login
    const login = async (loginEmail, loginPassword, setLoginPassword,
        setLoginEmail) => {

        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(user)
            await getDocId(user.user.uid);
            const userObject = {
                email: user.user.email,
                uid: user.user.uid,

            }
            console.log(userObject);
            dispatch({
                type: 'LOGIN',
                error: null,
                payload: userObject,

            })

            setLoginPassword('');
            setLoginEmail('');
        } catch (error) {
            console.log(error.message);

            if (error.message === 'Firebase: Error (auth/user-not-found).') {
                dispatch({
                    type: 'LOGIN_ERROR',
                    payload: 'User not found',
                })
            } else if (error.message === 'Firebase: Error (auth/wrong-password).') {
                dispatch({
                    type: 'LOGIN_ERROR',
                    payload: 'Wrong Password',
                })
            }
            else {
                dispatch({
                    type: 'LOGIN_ERROR',
                    payload: error.message,
                })
            }


        }
    }
    // Google login
    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            const user = res.user;
            console.log(user)
            getDocId(res.user.uid)
            newSubcollection(res.user.id);
            const userObject = {
                name: res.user.displayName,
                email: res.user.email,
                profilePic: res.user.photoURL,
                uid: res.user.uid,
            }
            console.log(userObject)
            dispatch({
                type: 'LOGIN',
                payload: userObject,
            })
            const q = query(collection(db, "users"), where("uid", "==", user.uid));
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    name: user.displayName,
                    authProvider: "google",
                    email: user.email,
                });
            }
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };




    const handleGoogleLogin = async () => {
        signInWithGoogle()



    }



    // display on Login page register form

    const handleRegisterClick = (name) => {
        if (name === 'register') {
            dispatch({
                type: 'SET_REGISTER_CLICKED',
                payload: true,
            })
        } else {
            dispatch({
                type: 'SET_REGISTER_CLICKED',
                payload: false,
            })
        }
    }

    // Logout

    const handleLogout = async () => {
        const confirm = window.confirm('Are you sure you want to logout?')
        if (confirm) {


            await signOut(auth)

            dispatch({
                type: 'LOGOUT',
                payload: null,
            })
        }
    }


    return <UserContext.Provider value={{

        handleRegisterClick,
        handleRegister,
        handleGoogleLogin,
        registerFunc,
        handleLogout,
        login,
        handleSidebarOpen,
        closeSidebar,
        sidebarOpen: state.sidebarOpen,
        loginError: state.loginError,
        showNavButtons: state.showNavButtons,
        register: state.register,
        user: state.user,
        registerError: state.registerError,



    }}>{children}</UserContext.Provider>
}

export default UserContext;

