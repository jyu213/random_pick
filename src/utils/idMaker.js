import md5 from 'js-md5';

// console.log(md5);

/**
 * ID 生成器
 * 生成规则： md5(title + $$ + Date.now)
 * @param {String} title 标题文字
 * @return {String} title 对应 ID
 */
let makerID = function (title) {
    let currentTime = (new Date()).getTime();
    return md5(title + currentTime);
};

export default makerID;