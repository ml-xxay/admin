import { request } from "./request";

//获取试卷列表 
export const getExamList = query => request({ url: '/admin/getExamList', params: query })
    // 添加试卷
export const addExam = exam => request({ method: 'POST', url: '/admin/addExam', data: exam })
    // 修改试卷信息
export const editExamInfo = form => request({ method: 'POST', url: '/admin/editExamInfo', data: form })
    // 查看试卷详情
export const getExamInfo = id => request({ url: '/admin/getExamInfo', params: { id } })
    // 添加试卷题目
export const addExamTitle = exam_title => request({ url: '/admin/addExamTitle', method: 'POST', data: exam_title })