/*
 * @Author: your name
 * @Date: 2021-09-15 19:53:32
 * @LastEditTime: 2021-09-16 01:55:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.0_music\vue.config.js
 */
const registerRouter = require('./backend/router')

module.exports = {
    lintOnSave: false,
    css: {
        loaderOptions: {
            sass: {
                // 全局引入变量和 mixin
                prependData: `@import "@/assets/scss/variable.scss";
                @import "@/assets/scss/mixin.scss";`,
            }
        }
    },
    devServer: {
        before(app) {
            registerRouter(app)
        }
    }
}
