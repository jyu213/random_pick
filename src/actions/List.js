import idMaker from 'utils/idMaker';
import defaultListValue from 'data/defaultList';

/** @type {String} localStorage 项目列表字段 */
const TOPIC_LIST_NAME = 'TOPIC_LIST_NAME';

// 更新项目数据列表
export const UPDATE_TOPIC_LIST = 'UPDATE_TOPIC_LIST';
export function updateTopicList(data) {
    return {
        type: UPDATE_TOPIC_LIST,
        payload: data
    };
}

// 清空项目列表
export const DELETE_TOPIC_LIST = 'DELETE_TOPIC_LIST';
export function deleteTopicList() {
    return {
        type: DELETE_TOPIC_LIST,
        payload: []
    };
}

// 初始化项目列表信息
export const INIT_TOPIC_LIST = 'INIT_TOPIC_LIST';
export function initTopicList() {
    let items = JSON.parse(localStorage.getItem(TOPIC_LIST_NAME)) || [];

    // @REVIEW: 若无初始数据，则填入默认数据
    if (items.length === 0) {
        defaultListValue.map((item) => {
            item.id = idMaker(item.title);
            return item;
        });
        items = defaultListValue;
        localStorage.setItem(TOPIC_LIST_NAME, JSON.stringify(items));
    }
    console.log(items, 'the items')
    return (dispatch) => {
        dispatch(updateTopicList(items));
    }
}

// 取项目列表信息
export const GET_TOPIC_LIST = 'GET_TOPIC_LIST';
export function getTopicList() {
    let items = JSON.parse(localStorage.getItem(TOPIC_LIST_NAME)) || [];

    return (dispatch) => {
        dispatch(updateTopicList(items));
    };
}

// 删除单个主题
export const DELETE_SINGLE_LIST = 'DELETE_SINGLE_LIST';
export function deleteSingleList(topicId) {
    let list = JSON.parse(localStorage.getItem(TOPIC_LIST_NAME)) || [];
    let newList = list.filter((item) => {
        return item.id !== topicId;
    });
    localStorage.setItem(TOPIC_LIST_NAME, JSON.stringify(newList));
    return (dispatch) => {
        dispatch(updateTopicList(newList));
    };
}

// 新增 Topic 标题
export const ADD_TOPIC_TITLE = 'ADD_TOPIC_TITLE';
export function addTopicTitle(title, topicId) {
    let list = JSON.parse(localStorage.getItem(TOPIC_LIST_NAME)) || [];

    list.push({
        id: topicId,
        title: title,
        items: []
    });
    localStorage.setItem(TOPIC_LIST_NAME, JSON.stringify(list));
    return (dispatch) => {
        dispatch(updateTopicList(list));
    };
}

// 更新 Topic 标题
export const UPDATE_TOPIC_TITLE = 'UPDATE_TOPIC_TITLE';
export function updateTopicTitle(title, topicId) {
    let list = JSON.parse(localStorage.getItem(TOPIC_LIST_NAME)) || [];

    list.map((item) => {
        if (item.id === topicId) {
            item.title = title;
        }
        return item;
    });
    localStorage.setItem(TOPIC_LIST_NAME, JSON.stringify(list));
    return (dispatch) => {
        dispatch(updateTopicList(list));
    };
}

/**
 * @TODO: 子 item update 是否需要重新分离出来
 */
// 添加单个 item
export const ADD_TOPIC_ITEM = 'ADD_TOPIC_ITEM';
export function addTopicItem(topicId, title, id) {
    let list = JSON.parse(localStorage.getItem(TOPIC_LIST_NAME)) || [];

    list.forEach((item) => {
        if (item.id === topicId) {
            if (!item.items) {
                item.items = [];
            }
            item.items.push({
                name: title,
                value: id
            });
        }
    });
    localStorage.setItem(TOPIC_LIST_NAME, JSON.stringify(list));

    return (dispatch) => {
        dispatch(updateTopicList(list));
    };
}

// 修改单个 Item
export const UPDATE_TOPIC_ITEM = 'UPDATE_TOPIC_ITEM';
export function updateTopicItem(topicId, name, id) {
    let list = JSON.parse(localStorage.getItem(TOPIC_LIST_NAME)) || [];

    list.forEach((item) => {
        if (item.id === topicId) {
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
    localStorage.setItem(TOPIC_LIST_NAME, JSON.stringify(list));

    return (dispatch) => {
        dispatch(updateTopicList(list));
    };
}

// 删除单个 Item
export const DELETE_TOPIC_ITEM = 'DELETE_TOPIC_ITEM';
export function deleteTopicItem(topicId, id) {
    let list = JSON.parse(localStorage.getItem(TOPIC_LIST_NAME)) || [];

    list.forEach((item) => {
        if (item.id === topicId) {
            if (!item.items) {
                item.items = [];
            }
            item.items = item.items.filter((item) => {
                return item.value !== id;
            });
        }
    });
    localStorage.setItem(TOPIC_LIST_NAME, JSON.stringify(list));

    return (dispatch) => {
        dispatch(updateTopicList(list));
    };
}
