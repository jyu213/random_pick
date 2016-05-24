import idMaker from 'utils/idMaker';

export function addPickAction() {
    return {
        // router
    };
}
export function editPickAction() {
    return {};
}

// 添加默认数据列表
export const ADD_DEFAULT_LIST = 'ADD_DEFAULT_LIST';
export function addDefaultList(data) {
    return {
        type: ADD_DEFAULT_LIST,
        payload: data
    };
}

// 删除默认数据列表
export const DELETE_DEFAULT_LIST = 'DELETE_DEFAULT_LIST';
export function deleteDefaultList() {
    return {
        type: DELETE_DEFAULT_LIST,
        payload: []
    };
}

// 设置默认列表数据
export const SET_DEFAULT_LIST_SUCCESS = 'SET_DEFAULT_LIST_SUCCESS';
export const SET_DEFAULT_LIST_FAILURE = 'SET_DEFAULT_LIST_FAILURE';
export function setDefaultList(items) {
    // if (!!items) {
    //     localStorage.setItem('defaultList', items);
    // }
    return (dispatch, getState) => {
        dispatch(addDefaultList(items));
    };
}

// 获取默认数据列表
export const GET_DEFAULT_LIST = 'GET_DEFAULT_LIST';
export function getDefaultList() {
    let items = JSON.parse(localStorage.getItem('defaultList')) || [];

    return (dispatch) => {
        dispatch(addDefaultList(items));
    }
}

// 更新用户数据列表
export const UPDATE_USER_LIST = 'UPDATE_USER_LIST';
export function updateUserList(data) {
    return {
        type: UPDATE_USER_LIST,
        payload: data
    };
}

// 删除用户数据列表
export const DELETE_USER_LIST = 'DELETE_USER_LIST';
export function deleteUserList() {
    return {
        type: DELETE_USER_LIST,
        payload: []
    };
}

export const GET_USER_LIST = 'GET_USER_LIST';
export function getUserList() {
    let items = JSON.parse(localStorage.getItem('userList')) || [];

    return (dispatch) => {
        dispatch(updateUserList(items));
    };
}

// 删除单个主题
export const DELETE_SINGLE_USER_LIST = 'DELETE_SINGLE_USER_LIST';
export function deleteSingleList(pickId) {
    let list = JSON.parse(localStorage.getItem('userList')) || [];
    let newList = list.filter((item) => {
        return item.id !== pickId;
    });
    localStorage.setItem('userList', JSON.stringify(newList));
    return (dispatch) => {
        dispatch(updateUserList(newList));
    };
}

// 新增 Pick 标题
export const ADD_TITLE_PICK = 'ADD_TITLE_PICK';
export function addTitlePick(title, pickId) {
    let userList = JSON.parse(localStorage.getItem('userList')) || [];

    userList.push({
        title: title,
        id: pickId,
        items: []
    });
    localStorage.setItem('userList', JSON.stringify(userList));
    return (dispatch) => {
        dispatch(updateUserList(userList));
    };
}

// 更新 Pick 标题
export const UPDATE_TITLE_PICK = 'UPDATE_TITLE_PICK';
export function updateTitlePick(title, pickId) {
    let userList = JSON.parse(localStorage.getItem('userList')) || [];
    /** @type {Boolean} 是否为新的 Pick */
    // let status = false;

    userList.map((item) => {
        if (item.id === pickId) {
            item.title = title;
        }
        return item;
    });
    localStorage.setItem('userList', JSON.stringify(userList));
    return (dispatch) => {
        dispatch(updateUserList(userList));
    };
}

// 添加单个 item
export const ADD_ITEM_PICK = 'ADD_ITEM_PICK';
export function addItemPick(pickId, title, id) {
    let list = JSON.parse(localStorage.getItem('userList')) || [];

    list.forEach((item) => {
        if (item.id === pickId) {
            if (!item.items) {
                item.items = [];
            }
            item.items.push({
                name: title,
                value: id
            });
        }
    });
    localStorage.setItem('userList', JSON.stringify(list));

    return (dispatch) => {
        dispatch(updateUserList(list));
    };
}

// 修改单个 Item
export const UPDATE_ITEM_PICK = 'UPDATE_ITEM_PICK';
export function updateItemPick(pickId, name, id) {
    let list = JSON.parse(localStorage.getItem('userList')) || [];

    list.forEach((item) => {
        if (item.id === pickId) {
            if (!item.items) {
                item.items = [];
            }
            item.items.map((sub) => {
                if (sub.value === id) {
                    sub.name = name;
                }
                return sub;
            });
        }
    });
    localStorage.setItem('userList', JSON.stringify(list));

    return (dispatch) => {
        dispatch(updateUserList(list));
    };
}

// 删除单个 Item
export const DELETE_ITEM_PICK = 'DELETE_ITEM_PICK';
export function deleteItemPick(pickId, id) {
    let list = JSON.parse(localStorage.getItem('userList')) || [];

    list.forEach((item) => {
        if (item.id === pickId) {
            if (!item.items) {
                item.items = [];
            }
            item.items = item.items.filter((item) => {
                return item.value !== id;
            });
        }
    });
    localStorage.setItem('userList', JSON.stringify(list));

    return (dispatch) => {
        dispatch(updateUserList(list));
    };
}
