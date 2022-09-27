import { get, post } from '../utils/request'
const login = (data:any) => {
  return post('/api/admin/login', data)
}
// 访客列表
const fklist = (data:any) => {
  return get('/api/visituser/list', data)
}

// 访客单删
const fkdel = (data:any) => {
  return get('/api/visituser/del', data)
}

// 访客查询
const fkshow = (data:any) => {
  return get('/api/visituser/show', data)
}
 
// 访客添加
const fkadd = (data:any) => {
  return post('/visituser/add', data)
}

// 访客修改
const
 fkedit = (data:any) => {
  return post('/api/visituser/edit', data)
}

// 核销人列表
const cancelist = (data:any) => {
  return get('/api/reviewer/list', data)
}
// 核销人单删 批删
const canceldel = (data:any) => {
  return get('/api/reviewer/del', data)
}

// 核销人详情
const cancelshow = (data:any) => {
  return get('/api/reviewer/show', data)
}

// 是否启用核销人
const cancelstatus = (data:any) => {
  return post('/api/reviewer/changestatus', data)
}

// 添加核销人
const canceladd = (data:any) => {
  return post('/api/reviewer/add', data)
}

// 修改核销人
const canceledit = (data:any) => {
  return post('/api/reviewer/edit', data)
}

// 校园动态列表
const schoolist = (data:any) => {
  return get('/api/news/list', data)
}

// 校园动态删除
const schooldel = (data:any) => {
  return get('/api/news/del', data)
}

// 校园动态添加
const schooladd = (data:any) => {
  return post('/api/news/add', data)
}

// 校园动态详情
const schoolshow = (data:any) => {
  return get('/api/news/show', data)
}

// 校园动态修改
const schooledit = (data:any) => {
  return get('/api/news/edit', data)
}

// 审核日志列表
const checklist = (data:any) => {
  return get('/api/auditlog/list', data)
}

// 审核日志详情
const checkshow = (data:any) => {
  return get('/api/auditlog/show', data)
}

// 核销日志列表     
const chargelog = (data:any) => {
  return get('/api/reviewer/log', data)
}

// 点位管理列表
const pointlist = (data:any) => {
  return get('/api/address/list', data)
}

// 点位管理删除
const pointdel = (data:any) => {
  return get('/api/address/edit', data)
}

// 点位管理添加
const pointadd = (data:any) => {
  return post('/api/address/add', data)
}

// 点位管理修改
const pointedit = (data:any) => {
  return post('/api/address/edit', data)
}

// 管理员管理列表
const adminlist = (data:any) => {
  return get('/api/visit/admin/list', data)
}

// 管理员管理添加
const adminadd = (data:any) => {
  return post('/api/visit/admin/add', data)
}

// 管理员管理删除
const admindel = (data:any) => {
  return get('/api/visit/admin/del', data)
}

// 管理员管理详情
const adminedit = (data:any) => {
  return get('/api/visit/admin/edit', data)
}

// 管理员管理启用
const adminstatus = (data:any) => {
  return post('/api/visit/admin/changestatus', data)
}

// 管理员管理查询
const adminshow = (data:any) => {
  return get('/api/visit/admin/show', data)
}
export {
  login,
  fklist,
  fkdel,
  fkadd,
  fkshow,
  cancelist,
  canceldel,
  cancelshow,
  cancelstatus,
  canceladd,
  canceledit,
  schoolist,
  schooldel,
  schooladd,
  schoolshow,
  checklist,
  checkshow,
  chargelog,
  pointlist,
  pointdel,
  pointadd,
  pointedit,
  adminlist,
  admindel,
  adminadd,
  adminedit,
  adminstatus,
  adminshow
}
