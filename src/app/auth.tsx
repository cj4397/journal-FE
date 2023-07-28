'use client';

import { useMemo, createContext, useContext } from "react";

import useLocalStorage from "./storage";

const initialState = {
    userData: '',
    // {
    //     name: '',
    //     token: '',
    //     category_id: '',
    //     id: ''
    // },
    user: {
        data: {
            allow_password_change: Boolean,
            email: '',
            id: 0,
        }
    },
    login: (data: { user_info?: object; user_data?: object }) => { },
    get_params: (data: { user_name?: object; user_data?: object }) => { },
    addFriend: (data: number) => { },
    logout: () => { },
};


const AuthContext = createContext(initialState);


export const useAuth = () => {
    return useContext(AuthContext);
};


export default function Auth(props: {
    children: React.ReactNode
}) {
    const [user, setUser] = useLocalStorage("User", null);
    const [userData, setUserData] = useLocalStorage("UserData", null);
    const [userFriendList, setFriendList] = useLocalStorage("Friends", [])

    const login = (data: { user_info?: object; user_data?: object }) => {
        const { user_info, user_data } = data;
        setUser(user_info);
        setUserData(user_data);
    };

    const get_params = (data: { user_name?: object; user_data?: object }) => {
        const { user_name, user_data } = data;
        setUser(user_name);
        setUserData(user_data);
    };

    const logout = () => {
        setUser(null);
        setUserData(null);
    };

    const addFriend = (data: number) => {
        if (userFriendList.findIndex((e: number) => e === data) === -1) {
            userFriendList.push(data)
        }

        setFriendList(userFriendList)
    }

    const value = useMemo(
        () => ({
            userData,
            user,
            get_params,
            login,
            logout,
            addFriend
        }),
        [userData, user]
    );

    return <AuthContext.Provider value={value}> {props.children}</AuthContext.Provider>
}