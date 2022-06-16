import router from '@/router'
import store from '@/store'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/login', '/404']

router.beforeEach(async function (to, from, next) {
    Nprogress.start()
    if (store.getters.token) {
        console.log(to);
        if (to.path === '/login') {
            next('/')
        } else {
            if (!store.state.user.userInfo.userId) {
                await store.dispatch('user/getUserInfo')
            }
            next()
        }
    } else {
        if (whiteList.indexOf(to.path) > -1) {
            next()
        } else {
            next('/login')
        }
    }
    Nprogress.done()
})

router.afterEach(function (to, from) {
    Nprogress.done()
})