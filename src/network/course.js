import { request } from "./request";
// 获取课程数据
export function getcourses() {
    return request({
        url: '/user/getCourseList'
    })
}
// export const courseInfo = (course_id) => request({ url: '/user/getCourseInfo', params: { course_id } })
// 拿到课程数据id  获取合成详情
export function getCourseInfo(course_id) {
    return request({
        url: '/user/getCourseInfo',
        params: { course_id }
    })
}
// 修改课程信息
export const etidCourse = (course) => request({
        url: '/admin/editCourseInfo',
        method: 'post',
        data: course
    })
    // export function etidCourse(course) {
    //     return request({
    //         url: '/admin/editCourseInfo',
    //         method: 'post',
    //         params: { course }
    //     })
    // }

// 添加课程
export const addCourse = (addcourse) => request({
    url: '/admin/addCourse',
    method: 'post',
    data: addcourse
})

// 获取一级分类
export const getClassify = () => request({ url: '/admin/getClassify' })

// 获取二级分类
export const getClassifyName = (classifyName) => request({ url: '/admin/getClassifyName', params: { classifyName } })

// 修改章--节
export const editSection = (section) => request({ url: '/admin/editSection', method: 'post', data: section })

// 添加章节
export const addCourseSection = (section) => request({ url: '/admin/addCourseSection', method: 'post', data: section })
    // 获取七牛token
export function getqiniu() {
    return request({
        url: '/admin/getQiniuToken'
    })
}