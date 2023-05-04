import { useState } from 'react'
import ThemeTable from './ThemeTable'
import { CorpusAPI } from '@/services/ant-design-pro/corpusAPI'
import ThemeEditor from './ThemeEditor'
import EmptyTheme from './EmptyTheme'

const CorpusFromManual = () => {
  const [currentTheme, setCurrentTheme] = useState<CorpusAPI.FileInfo>()
  const [tableReFresh, setTableReFresh] = useState<number>(0)

  return (
    <>
      <div className={`w-full fcs-center md:flex-row md:items-start overflow-hidden ${currentTheme?.doc_name ? '' : 'hidden'}`}>
        <ThemeTable setCurrentTheme={setCurrentTheme} currentTheme={currentTheme} tableReFresh={tableReFresh} />
        <ThemeEditor currentTheme={currentTheme} setTableReFresh={setTableReFresh} />
      </div>
      {!currentTheme?.doc_name && <EmptyTheme setCurrentTheme={setCurrentTheme} />}
    </>
  )
}

export default CorpusFromManual
