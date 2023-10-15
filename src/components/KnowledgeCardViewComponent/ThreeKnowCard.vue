<script>
/**
 * 此组件存在bug，在card-box添加一个 p/div，再次进入该组件时，
 * js css文件虽然能重新加载，但是不能拖动（？）
 */
export default {
    async mounted() {
        /**
         * 每次都重新import，执行一遍代码
         * 解决办法：在路径后加入时间戳，使得浏览器不能从缓存中获取文件，而是强制重新获取。
         */
        const js = await import('../../utils/three_konwCard.js?refresh=' + Date.now());
        const css = await import('../../assets/knowCard.css?refresh=' + Date.now());
        // JS CSS文件导入完成后的回调函数
        // js | css 为 module文件
        console.log('JS CSS文件已导入');
        // 在这里可以使用导入的 JS 文件中的功能
    },
};
</script>

<template>
    <div id="card-box">
        <div id="container" style="width: 100%;height: 100%;position: relative;"></div>
        <div id="menu">
            <button id="sphere">SPHERE</button>
            <button id="helix">HELIX</button>
        </div>
    </div>
</template>

<style scoped>
#card-box {
    width: 100%;
    overflow-y: hidden;
    background-color: #000000;
    position: relative;
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;
    flex: 1;
}

#menu {
    position: absolute;
    bottom: 0;
    height: 10%;
    width: 100%;
    /* background-color: antiquewhite; */
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

button {
    color: rgba(127, 255, 255, 0.75);
    background: transparent;
    outline: 1px solid rgba(127, 255, 255, 0.75);
    border: 0px;
    padding: 5px 10px;
    cursor: pointer;
    position: relative;
    height: 100%;
    width: 100px;
}

button:hover {
    background-color: rgba(0, 255, 255, 0.5);
}

button:active {
    color: #000000;
    background-color: rgba(0, 255, 255, 0.75);
}
</style>