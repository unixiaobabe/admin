import request from '@/utils/request'

export function getEmployeeList(params){
  return request({
    url:'/sys/user',
    params
  })
}

export function addEmployee(data){
  return request({
    url:'/sys/user',
    method:'post',
    data
  })
}

export function importEmployee(data){
  return request({
    url:'/sys/user/batch',
    method:'post',
    data
  })
}

export function saveUserDetailById(data){
  return request({
    url:`/sys/user/${data.id}`,
    method:'put',
    data
  })
}

export function getPersonalDetail(id){
  return request({
    url:`/employees/${id}/personalInfo`
  })
}

export function updatePersonal(data){
  return request({
    url:`/employees/${data.userId}/personalInfo`,
    method:'put',
    data
  })
}

export function getJobDetail(id){
  return request({
    url:`/employees/${id}/jobs`
  })
}

export function updateJob(data){
  return request({
    url:`/employees/${data.userId}/jobs`,
    method:'put',
    data
  })
}

export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

export function assignRoles(data) {
  return request({
    url: '/sys/user/assignRoles',
    data,
    method:'put'
  })
}