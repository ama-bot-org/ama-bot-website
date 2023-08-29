import Button from 'antd/es/button'
import cls from 'classnames'
import React, { ReactNode, useMemo } from 'react'
import { CONFIG, CONFIG_ITEM_TYPE, formatNum, VERSION_TYPE } from '../../config'
import styles from './style.less'

type Iprops = {
  version: VERSION_TYPE
  onUpgrade: React.MouseEventHandler<HTMLElement>
}

type ColumnType = {
  title: string
  dataIndex: keyof CONFIG_ITEM_TYPE
  render?: (v: any, record: CONFIG_ITEM_TYPE) => ReactNode
  align?: 'left' | 'right' | 'center'
}

const data = CONFIG.filter(item => item.version !== VERSION_TYPE.free)
const defaultRender = (field: any) => field
const rowKey = 'version'

// 与普通表格不一致，这个表格时横向的，
export default ({ version: currentVersion, onUpgrade }: Iprops) => {
  const columns = useMemo(() => {
    const _columns: ColumnType[] = [
      {
        title: '',
        dataIndex: 'version',
        align: 'center',
        render(v, { name, price, version }) {
          return (
            <div className={cls('fcc-center', styles.version_cell)}>
              <span className={styles.name}>{name}</span>
              <div className={styles.price}>
                <span>{price}</span> <span>RMB/年</span>
              </div>
              {version > currentVersion ? (
                <Button type="primary" onClick={onUpgrade}>
                  升级
                </Button>
              ) : version === currentVersion ? (
                <div className={styles.curVBtn}>当前版本</div>
              ) : null}
            </div>
          )
        },
      },
      {
        title: '标准问答库容量',
        dataIndex: 'standard_total',
        align: 'center',
        render(v) {
          return formatNum(v, '条')
        },
      },
      {
        title: '语料库容量',
        dataIndex: 'corpus_total',
        align: 'center',
        render(v) {
          return formatNum(v, '字')
        },
      },
      {
        title: 'AI回答次数',
        dataIndex: 'answer_total',
        align: 'center',
        render(v) {
          return formatNum(v, '次')
        },
      },
      {
        title: '品牌定制能力',
        dataIndex: 'customizable',
        align: 'center',
        render(v) {
          return v ? '有' : '无'
        },
      },
      { title: '售后服务', dataIndex: 'after_sales', align: 'center' },
    ]
    return _columns
  }, [currentVersion])
  return (
    <div className={styles.wrap}>
      <div className={styles.table}>
        {columns.map((column) => {
          const { dataIndex, title, render = defaultRender, align } = column
          return (
            <div className={styles.trow} key={dataIndex}>
              <div className={styles.tcell}>{title}</div>
              {data.map(record => {
                const value = record[dataIndex]
                return (
                  <div key={record[rowKey]} className={cls(styles.tcell, `text-${align}`)}>
                    {render(value, record)}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
