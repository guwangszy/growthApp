

var config = {
  service: {
    downloadApk: `/download/apk`, // 下载apk
    login: `/user/login`, // 登录
    verifyCode: `/user/verifyCode`, // 获取验证码
    upgrade:`/user/upgrade`, // 获取当前最新APP版本
    logout:`/user/logout`,// 登出
    handPwd: `/user/handPwd`, // 设置手势密码
    proposal: `/user/proposal`, // 提交反馈意见
    uncheckCount:`/msg/uncheckCount`,//审核工单角标数量
    suspectAlarmCount:`/msg/suspectAlarmCount`,//稽核工单角标数量
    voiceList: `/voice/voiceList`,//获取专线列表
    voiceInfo: `/voice/voiceInfo`,//获取专线详情
    voiceDel:'/voice/voiceDel',//删除专线
    voiceSub:'/voice/voiceSub',//下发专线
    voiceSubmitCheck:'/voice/voiceSubmitCheck',//专线提交审核
    getFrequency:`/rule/getFrequency`,//频次规则
    getRecord: `/rule/getRecord`, // 获取录音规则列表
    submitCheck: `/company/submitCheck`,//.企业专线信息审核
    whiteRuleList: `/whiteRule/list`, // 获取白名单模糊列表
    whiteRuleModify: `/whiteRule/modify`,// 白名单模糊匹配下发/删除
    whiteRuleSubmit:'/whiteRule/submit',//白名单模糊匹配提交审核
    provcode: `/user/provcode`, //省份节点
    issuedConfig: `/user/getIssuedConfig`, //传输渠道
    flowRuleList: `/rule/getFlow`, // 流量规则
    oneBellList: `/rule/getOneBell`, // 一声响铃
    exceptionCallList: `/rule/getExceptionCall`, // 异常通话
    interCallList: `/rule/getIntercall`, // 国际盗打
    sendRules: `/rule/send`, // 规则下发
    openClosed:'/rule/openClosed',//规定停用和启用
    operOneBell:'/rule/operOneBell',//新增修改一声响铃
    voiceCos:`/voice/voiceCos`,// 获取计费号码列表
    companyRule:`/company/companyRule`,// 获取企业列表
    companyInfo:`/company/companyInfo`,//获取企业详情
    newFlowSeve:`/rule/operFlow`,//新增流量规则保存
    operFrequency:`/rule/operFrequency`,//频次规则
    companyList:'/company/companyList',//企业列表
    companySend:'/company/comSub',//企业下发
    companyDelAndLok:'/company/comDelAndLok',//企业删除 锁定 解锁
    WhiteList: '/white/whiNumList',//白名单列表
    whiNumDetail:'/white/whiNumDetail',//白名单列表详情
    WhiteAdd:'/white/whiNumAdd',//新增白名单
    whiNumDel:'/white/whiNumDel',//删除白名单
    WhiteInfo:'/white/list',//白名单详情
    whiNumLock:'/white/whiNumLock',//锁定解锁白名单
    whiNumSub:'/white/whiNumSub',//提交审核白名单
    whiNumSend:'/white/whiNumSend',//下发白名单
    getCheckUser: '/company/getCheckUser',//获取审核人列表
    operExceptionCall:`/rule/operExceptionCall`,//异常通话保存
    recordRule:`/rule/operRecord`,//新增录音规则保存
    operIntercall:`/rule/operIntercall`,//新增国际盗打保存
    whiteRole: `/whiteRule/add`,//新增白名单模糊匹配
    voiceChe: `/voice/voiceChe`,//语音专线通过/拒绝审核
    companyChe: `/company/companyChe`,//企业信息通过/拒绝审核
    whiNumChe:`/white/whiNumChe`,//白名单通过/拒绝审核
    whiNumRulChe: `/whiteRule/whiNumRulChe`,//白名单模糊匹配通过/拒绝审核
    selectAlarmList: `/suspect/selectAlarmList`,//获取疑似告警记录审核列表
    statistics: `/form/comForm`,//统计获取数值
    interception: `/form/interception`,//呼叫量统计
    formAlarm: `/form/alarm`,//近30天疑似告警
    formRecord: `/form/record`,//呼叫量统计
    formTodayRecord: `/form/todayRecord`,//呼叫量统计
    formTodayAlarm: `/form/todayAlarm`,//呼叫量统计
    updateAlarmState: `/suspect/updateAlarmState`,//稽核工单审核
    queryNoticeUser: `/suspect/queryNoticeUser`,//派发人列表
    distribute: `/suspect/distribute`, //派发接口
    alarmDetail: `/suspect/alarmDetail` ,//稽核工单详情
    getMsgPageInfo:`/msg/getMsgPageInfo`, // 获取消息页面信息
    getInfoDetail:`/msg/getInfoDetail`, // 获取消息提醒列表
    selectTeamInfomation:`/msg/selectTeamInfomation`, // 获取语音管控团队列表
  }

};
export default config