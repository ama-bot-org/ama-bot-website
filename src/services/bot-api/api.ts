// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max'

/** 测试接口 POST /botapi/testQuery */
async function testQuery(body: BOTAPI.TestQueryParams): Promise<BOTAPI.TestQueryResult> {
  const res = await request('/botapi/testQuery', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    getResponse: true,
  })
  return res.data
}

/** 更新接口 POST /botapi/updateQuery */
async function updateQuery(body: BOTAPI.UpdateQueryParams): Promise<BOTAPI.UpdateQueryResult> {
  const res = await request('/botapi/updateQuery', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    getResponse: true,
  })
  return res.data
}

export default {
  testQuery,
  updateQuery,
}
