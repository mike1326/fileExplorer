import { useState } from 'react'

import { IFile } from 'services/filesRetriever'

export const useFileDisplayer = () => {
	const [toggledFiles, setToggledFiles] = useState<IFile[]>()

	const formatData = (files: IFile[]): IFile[] => {
		return files.map((file) => {
			if (file.children && file.children.length > 0)
				return {
					name: file.name,
					id: file.id,
					children: [...formatData(file.children)],
					isFolder: true
				}
			else return { ...file, isFolder: false }
		}) as IFile[]
	}

	const toggleShowFiles = (file: IFile, id?: string) => {
		if (file.id === id) {
			if (file.isShowFiles === undefined) return true
			else {
				return !file.isShowFiles
			}
		}
		return file?.isShowFiles
	}

	const toggleFolderFiles = (files: IFile[], id?: string): IFile[] => {
		const filesToggled = files.map((file) => {
			if (file && file.isFolder) {
				if (file.children && file.children.length > 0) {
					return {
						...file,
						children: [...toggleFolderFiles(file.children)],
						isShowFiles: toggleShowFiles(file, id)
					}
				}
				return {
					...file,
					isShowFiles: toggleShowFiles(file, id)
				}
			}
			return { ...file }
		})

		setToggledFiles(filesToggled)
		return filesToggled
	}

	return {
		toggledFiles,
		toggleFolderFiles,
		formatData
	}
}
