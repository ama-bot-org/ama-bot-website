import { useState } from 'react'
import ThemeTable from './ThemeTable'
import { CorpusAPI } from '@/services/ant-design-pro/corpusAPI'
import ThemeEditor from './ThemeEditor'
import EmptyTheme from './EmptyTheme'

const CorpusFromManual = () => {
  const [currentTheme, setCurrentTheme] = useState<CorpusAPI.FileInfo>()
  const [tableReFresh, setTableReFresh] = useState<number>(0)

  return currentTheme?.doc_name ? (
    <div className="w-full frs-center">
      <ThemeTable setCurrentTheme={setCurrentTheme} currentTheme={currentTheme} tableReFresh={tableReFresh} />
      <ThemeEditor currentTheme={currentTheme} setTableReFresh={setTableReFresh} />
    </div>
  ) : (
    <EmptyTheme setCurrentTheme={setCurrentTheme} />
  )
}

export default CorpusFromManual
