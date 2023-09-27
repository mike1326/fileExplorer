import React, { useState } from 'react'

import { IFile } from 'services/filesRetriever'
import { useFileDisplayer } from 'hooks/useFileDisplayer'

import styles from './style.module.scss'

interface IFileExplorerProps {
	files?: IFile[]
	iconClassName?: string
}

export const FileExplorer: React.FC<IFileExplorerProps> = ({ files }) => {
	const { toggleFolderFiles, toggledFiles } = useFileDisplayer()
	const [displayFiles, setDisplayFiles] = useState(files)

	const onClickHandler = (id: string) => {
		if (files && files.length > 0) {
			if (toggledFiles)
				setDisplayFiles(toggleFolderFiles(toggledFiles, id))
			else setDisplayFiles(toggleFolderFiles(files, id))
		}
	}

	const getIconStyle = (file: IFile) => {
		let iconStyle = styles['close']
		let fileStyle = styles['file']
		if (file) {
			if (file.isFolder) {
				fileStyle = styles['folder']
				if (file.isShowFiles) iconStyle = styles['open']
			}
		}

		return { iconStyle, fileStyle }
	}

	return (
		<>
			{displayFiles &&
				displayFiles.length > 0 &&
				displayFiles.map((file) => {
					const { iconStyle, fileStyle } = getIconStyle(file)
					return (
						<div className={fileStyle}>
							{file && file.isFolder === false && (
								<div
									aria-label={file.name}
									className={fileStyle}
								>
									{file.name}
								</div>
							)}
							{file && file.isFolder && (
								<>
									<span
										className={iconStyle}
										onClick={() => onClickHandler(file.id)}
									/>
									<span
										aria-label={file.name}
										className={fileStyle}
									>
										{file.name}
										{file.isShowFiles && (
											<FileExplorer
												iconClassName={iconStyle}
												files={file.children}
											/>
										)}
									</span>
								</>
							)}
						</div>
					)
				})}
		</>
	)
}
