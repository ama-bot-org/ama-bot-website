export enum VERSION_TYPE {
  free = 0, // 免费版
  standard = 1, // 标准版
  business = 2, // 商务版
  enterprise = 3, // 企业版
  custom = 4, // 定制版
}

export type CONFIG_ITEM_TYPE = {
  version: VERSION_TYPE
  name: string // 版本名称
  price: number // 价格，x RMB/年
  standard_total: number // 标准问答库容量
  corpus_total: number // 语料库容量
  answer_total: number // ai回答次数
  customizable: boolean // 是否可商务定制
  after_sales: string // 售后
}

export const CONFIG: CONFIG_ITEM_TYPE[] = [
  {
    version: VERSION_TYPE.free,
    name: '免费试用版',
    price: 0,
    standard_total: 30,
    corpus_total: 10000,
    answer_total: 100,
    customizable: false,
    after_sales: '',
  },
  {
    version: VERSION_TYPE.standard,
    name: '标准版',
    price: 860,
    standard_total: 1000,
    corpus_total: 50000,
    answer_total: 1000,
    customizable: false,
    after_sales: '官方社群答疑',
  },
  {
    version: VERSION_TYPE.business,
    name: '商务版',
    price: 8600,
    standard_total: Infinity,
    corpus_total: 300000,
    answer_total: 20000,
    customizable: false,
    after_sales: '官方社群答疑',
  },
  {
    version: VERSION_TYPE.enterprise,
    name: '企业版',
    price: 18600,
    standard_total: Infinity,
    corpus_total: 1000000,
    answer_total: 80000,
    customizable: false,
    after_sales: '售后一个月内提供1v1 VIP售后对接',
  },
  {
    version: VERSION_TYPE.custom,
    name: '定制版',
    price: 98600,
    standard_total: Infinity,
    corpus_total: Infinity,
    answer_total: 800000,
    customizable: true,
    after_sales: '售后一个月内提供1v1 VIP售后对接',
  },
]
// hideUnitWhenSmall 当小于10000时，是否隐藏单位
export function formatNum(num: number, unit: string = '', hideUnitWhenSmall = false) {
  if (Object.is(num, Infinity)) {
    return '不限量'
  } else if (num < 10000) {
    return hideUnitWhenSmall ? num : `${num}${unit}`
  } else {
    num = num / 10000
    return `${num}万${unit}`
  }
}
