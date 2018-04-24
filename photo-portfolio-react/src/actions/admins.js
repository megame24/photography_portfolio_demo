import types from "./actionTypes";
import api from "../api";

const listOfAdmins = admins => ({
    type: types.LIST_OF_ADMINS,
    admins
});

export const getListOfAdmins = () => dispatch =>
    api.admins.getListOfAdmins().then(admins => {
        dispatch(listOfAdmins(admins));
    });

export const verifyAdmin = username =>
    api.admins.verifyAdmin(username);

export const enableOrDisableAdmin = (username, enableOrDisable) =>
    api.admins.enableOrDisableAdmin(username, enableOrDisable);