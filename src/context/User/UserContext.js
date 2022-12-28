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
    setDoc,
    updateDoc

} from "firebase/firestore";
import { useState } from "react";


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
        watchlist: {},


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
        return data[0].id
    }



    // get the watchlist of the user
    const [watchlistMovieData, setWatchlistMovieData] = useState({});
    const getWatchlist = async (id) => {
        const q = query(doc(db, "users", id));
        const snapshot = await getDoc(q);
        const data = snapshot.data();
        console.log(data.watchlist)
        setWatchlistMovieData(data.watchlist.movies)
        dispatch({
            type: 'ADD_DATA_TO_WATCHLIST',
            payload: data.watchlist,
        })
    }
    const removeDataFromWatchlist = (id) => {
        // const remove = state.watchlist.movies.filter((name) => name != id)
        // console.log(remove);
        // const newData = {
        //     shows: state.watchlist.shows,
        //     movies: remove,
        // }
        // dispatch({
        //     type: 'UPDATE_MOVIE_STATE',
        //     payload: newData,
        // })
        // console.log(state.watchlist);
    }
    const addDataToWatchlist = async (newData) => {
        console.log(state.id);
        const q = query(doc(db, "users", state.id));


        console.log(watchlistMovieData);
        setWatchlistMovieData(prev => (
            [...prev, newData]
        )
        )
        console.log(watchlistMovieData);
        // await updateDoc(q, {
        //     watchlist: { wData }

        // })
    }
    // add new subcollection

    const updateWatchlist = async () => {
        const watchlist = collection(db, 'users',)

        const watchlistDetails = await getDocs(watchlist);
        const watchlistData = watchlistDetails.docs.map((doc) =>
            doc.data()
        )
        console.log(watchlistData)
        // await setDoc(collection(db, "users", id), data
        // )
    }
    // Opening and closing the sidebar

    const handleSidebarOpen = async () => {

        // await addDataToWatchlist('transformers')
        removeDataFromWatchlist('nothing')
        // updateWatchlist()
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
                watchlist: {
                    shows: [],
                    movies: []
                },
                favourites: {
                    shows: [],
                    movies: []
                },
                lists: {

                }
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
            const id = await getDocId(res.user.uid);

            getWatchlist(id)
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
                    watchlist: {
                        shows: [],
                        movies: []
                    },
                    favourites: {
                        shows: [],
                        movies: []
                    },
                    lists: {

                    }
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

