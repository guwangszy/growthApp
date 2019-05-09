

var config = {
  service: {
    login: `/app/login`, // 登录
    logout: `/app/appUpdate/logout`, // 登出
    regedit:`/app/register`, // 注册
    updatePassword:`/app/appUpdate/updatePassword`, // 注册
    update:`app/appUpdate/update`, // 注册
    classList:`/classes/list`,// 班级列表
    classDetail:`/app/appGrade/list`,// 班级详情
    growthList:`/app/growUp/list`,// 成长册列表.
    growthAdd:`/app/growUp/save`,//新增成长册
    growthFiles:`/app//growUp/fileList`,//新增成长册
    circleList:`app/appAdvice/gradeCycleList`,// 班级圈
    addReply:`/app/appAdvice/saveComment`,// 添加评论
    dianzan:`/app/appAdvice/saveComment`,//点赞
    tasklist:`/app/appAdvice/list`,//任务列表
    finishtask:`/app/appAdvice/saveIssue`,//任务列表
    filelist:`/app/appFile/list`,//文件列表
    fileDetail:`/app/appFile/getFile`,//文件详情
    addNotices:`/app/appAdvice/save`,//文件详情
  }

};
export default config