import React, { useEffect, useState } from 'react'

import styles from './style.module.scss'

import { IFile, fetchData } from 'services/filesRetriever'
import { FileExplorer } from 'components/FileExplorer'
import { useFileDisplayer } from 'hooks/useFileDisplayer'

const App: React.FC = () => {
	const { formatData } = useFileDisplayer()
	const [files, setFiles] = useState<IFile[]>([])

	useEffect(() => {
		fetchData().then((data) => {
			if (data) setFiles(formatData(data))
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<main className={styles.main}>
			{files && files.length > 0 && <FileExplorer files={files} />}
		</main>
	)
}

export default App
