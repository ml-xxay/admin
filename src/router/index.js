import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'login',
        component: () =>
            import ('@/views/login/Login')
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('@/views/login/Login')
    },
    {
        path: '/home',
        name: 'Home',
        component: () =>
            import ('@/views/home/Home')
    },
    {
        path: '/courseinfo',
        name: 'courseinfo',
        component: () =>
            import ('@/views/course/CourseInfo')
    },
    {
        path: '/coursevideo',
        name: 'coursevideo',
        component: () =>
            import ('@/views/course/CourseVideo')
    },
    {
        path: '/myinfo',
        name: 'myinfo',
        component: () =>
            import ('@/views/my/Myinfo')
    },
    {
        path: '/backstage',
        name: 'backstage',
        redirect: '/welcome',
        component: () =>
            import ('@/views/backstage/Backstage'),
        children: [{
                path: '/welcome',
                component: () =>
                    import ('@/views/backstage/Welcome')
            },
            {
                path: '/uploadvideo',
                component: () =>
                    import ('@/views/backstage/curriculum/UploadVideo')
            },
            {
                path: '/coursemanagement',
                component: () =>
                    import ('@/views/backstage/curriculum/CourseManagement')
            },
            {
                path: '/addCourse',
                component: () =>
                    import ('@/views/backstage/curriculum/childercomps/AddCourse')
            },
            {
                path: '/editcourse',
                component: () =>
                    import ('@/views/backstage/curriculum/childercomps/EditCourse')
            },
            {
                path: '/testpaperlist',
                component: () =>
                    import ('@/views/backstage/testpaper/TestPaperList')
            },
            {
                path: '/testpapercenter',
                component: () =>
                    import ('@/views/backstage/testpaper/TestPaperCenter')
            },
            {
                path: '/addtextpaper',
                component: () =>
                    import ('@/views/backstage/testpaper/children/AddTextPaper')
            },
            {
                path: '/textpaperinfo',
                component: () =>
                    import ('@/views/backstage/testpaper/children/TextPaperInfo')
            }


        ]
    },




]

const router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes
    })
    // ?????????   ???token?????????  ??????????????????????????????
router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next()
    const token = window.sessionStorage.getItem('token')
    if (!token) return next('/login')
    next()
})
export default router