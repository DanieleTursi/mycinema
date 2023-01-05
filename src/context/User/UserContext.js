import React, { createContext, useReducer, useEffect } from "react";
import userReducer from "./UserReducer";
import useLocalStorage from "../../hooks/useLocalStorage";
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
        watchlist: {
            movies: [],
            shows: []
        },


    }
    const [state, dispatch] = useReducer(userReducer, initialState);
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser != null) {
                handleUserData(currentUser.uid)
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
        console.log(data
        )
        dispatch({
            type: 'GET_DOC_ID',
            id: data[0].id,
        })
        return data[0].id
    }

    const updWatchlist = (newData) => {
        console.log('working');
        const docRef = doc(db, 'users', state.id);
        updateDoc(docRef, {
            // watchlist: {
            //     movies: ['grinch'],
            //     shows: ['Witcher']
            // }
            watchlist: newData
        }
        )

    }



    // get all data of user from firebase

    const getDataOfUser = async (id) => {
        const q = query(doc(db, "users", id));
        const snapshot = await getDoc(q);
        const data = snapshot.data();

        return data

    }
    // handling the user data after login or state change
    const handleUserData = async (uid) => {
        const docId = await getDocId(uid);
        const userData = await getDataOfUser(docId)
        console.log(userData)
        const userObject = {
            name: userData.name,
            email: userData.email,
            photoURL: userData.photoUrl,
            uid: userData.uid,
            lists: userData.lists,
            watchlists: userData.watchlist,
            favourites: userData.favourites,

        }
        console.log(userObject)
        dispatch({
            type: 'LOGIN',
            payload: userData,
            watchlist: userData.watchlist,
        })


    }
    const removeDataFromWatchlist = (id, showOrMovie) => {
        console.log('working-remove');
        let watchlistMovies = [];
        let watchlistShows = [];
        state.watchlist.movies.forEach(movieId => {
            watchlistMovies.push(movieId)
        })
        state.watchlist.shows.forEach(showId => {
            watchlistShows.push(showId)
        })
        if (showOrMovie === 'movie') {
            const filteredMovies = watchlistMovies.filter(movieid => movieid !== id)
            watchlistMovies = filteredMovies
        }
        else {
            const filteredShows = watchlistShows.filter(showid => showid !== id);
            watchlistShows = filteredShows
        }

        const newObj = {
            movies: watchlistMovies,
            shows: watchlistShows
        }
        console.log(newObj);
        dispatch({
            type: 'UPDATE_WATCHLIST',
            payload: newObj
        })
        updWatchlist(newObj)
    }


    const updateWatchlist = async (id, showOrMovie) => {
        console.log(id, showOrMovie);
        const watchlistMovies = [];
        const watchlistShows = [];
        state.watchlist.movies.forEach(movieId => {
            watchlistMovies.push(movieId)
        })
        state.watchlist.shows.forEach(showId => {
            watchlistShows.push(showId)
        })
        if (showOrMovie === 'movie') {
            watchlistMovies.push(id)
        }
        else {
            watchlistShows.push(id)
        }

        const newObj = {
            movies: watchlistMovies,
            shows: watchlistShows
        }
        console.log(newObj);
        dispatch({
            type: 'UPDATE_WATCHLIST',
            payload: newObj
        })
        updWatchlist(newObj)
    }
    // Opening and closing the sidebar

    const handleSidebarOpen = async () => {


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

                },
                photoUrl: 'https://cdn.pixabay.com/photo/2017/07/10/11/28/bulldog-2489829_1280.jpg',

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
            const docId = await getDocId(user.user.uid);



            const userData = await getDataOfUser(docId)
            handleUserData(user.user.uid)

            dispatch({
                type: 'LOGIN',
                error: null,
                payload: userData,

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

            // getWatchlist(id)

            const q = query(collection(db, "users"), where("uid", "==", user.uid));
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    name: user.displayName,
                    photoUrl: user.photoURL,
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
                return user.uid
            } else {
                return user.uid
            }
        } catch (err) {
            console.error(err);
            alert(err.message);
        }

    };




    const handleGoogleLogin = async () => {
        const uid = await signInWithGoogle()
        console.log(uid)
        handleUserData(uid)
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
        updWatchlist,
        updateWatchlist,
        removeDataFromWatchlist,
        sidebarOpen: state.sidebarOpen,
        loginError: state.loginError,
        showNavButtons: state.showNavButtons,
        register: state.register,
        user: state.user,
        registerError: state.registerError,
        watchlist: state.watchlist,


    }}>{children}</UserContext.Provider>
}

export default UserContext;

