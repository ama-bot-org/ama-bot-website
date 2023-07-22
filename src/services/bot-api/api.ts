// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max'
import { TestQueryParams, TestQueryResult, UpdateQueryParams, UpdateQueryResult } from './models/bot'

/** 测试接口 POST /botapi/testQuery */
async function testQuery(body: TestQueryParams): Promise<TestQueryResult> {
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
async function updateQuery(body: UpdateQueryParams): Promise<UpdateQueryResult> {
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
