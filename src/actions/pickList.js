
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
    return (dispatch, getState) => {
        dispatch(addDefaultList(items));
    };
}