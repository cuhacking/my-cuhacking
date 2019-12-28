import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import styles from './dropbox.module.css'

const Dropbox = ({ file, storeFile, name, children }) => {
  const onDrop = useCallback(
    acceptedFiles => {
      storeFile(acceptedFiles[0])
    },
    [storeFile]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'application/pdf'
  })

  if (!file) {
    return (
      <div {...getRootProps({ className: styles.emptyBox })}>
        <input {...getInputProps({ name: name })} />
        <FontAwesomeIcon icon={faCloudUploadAlt} size='5x' />
        {children}
      </div>
    )
  } else {
    return (
      <div className={styles.fullBox} onClick={() => storeFile(undefined)}>
        <FontAwesomeIcon icon={faFileAlt} size='5x' />
        <p className={styles.file}>
          <i>{file.path}</i>
        </p>
      </div>
    )
  }
}

export default Dropbox
