export default {
    // 目录数据
    ADDSECTION(state, data) {
        state.courseSection = data
        console.log(data);
        sessionStorage.setItem('courseSections', JSON.stringify(state.courseSection))
    },
    // 保存token
    SETTOKEN(state, token) {
        console.log(state);
        sessionStorage.setItem('token', `bearer ${token}`)
    },

}