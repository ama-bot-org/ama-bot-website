// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max'
import { BotRequestType, BotResult, BotSubDomainRequestType, BotValid } from './models/bot'

async function checkBotValid(id: string): Promise<BotValid> {
  const res: any = await request('/api/app/user/idCheck', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { id },
    getResponse: true,
  })
  return res
}

async function fetchBotInfo(bot_id: string): Promise<BotResult> {
  const res = await request('/api/app/user/botInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { bot_id },
    getResponse: true,
  })
  return res.data
}

async function updateBotInfo(params: BotRequestType): Promise<BotResult> {
  const res = await request('/api/app/user/botInfoUpdate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token') || '',
    },
    data: { ...params },
    getResponse: true,
  })
  return res.data
}

async function updateBotSubDomain(params: BotSubDomainRequestType): Promise<BotResult> {
  const res = await request('/api/app/user/updateUrl', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token') || '',
    },
    data: { ...params },
    getResponse: true,
  })
  return res.data
}

async function getBotIdBySubDomain(subDomain: string): Promise<BotResult> {
  const res = await request('/api/app/user/getBotIdBySubDomain', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { html_url: subDomain },
    getResponse: true,
  })
  return res.data
}

export default {
  checkBotValid,
  fetchBotInfo,
  updateBotInfo,
  updateBotSubDomain,
  getBotIdBySubDomain,
}
