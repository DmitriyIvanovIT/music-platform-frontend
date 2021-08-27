import React, {MutableRefObject, PropsWithChildren, useRef} from 'react';
import styles from './FileUpload.module.scss';

type FileUploadProps = {
  setFile: Function;
  accept: 'image/*' | 'audio/*';
  children: PropsWithChildren<JSX.Element>;
};

const FileUpload: React.FC<FileUploadProps> = ({ setFile, accept, children}): JSX.Element => {
  const ref = useRef() as MutableRefObject<HTMLInputElement>;

  const handledInputFile = () => {
    if (ref !== null) {
      ref.current.click();
    }
  };

  const handledUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files && e.target.files[0]);
  }

  return (
    <div onClick={handledInputFile}>
      <input
        type='file'
        accept={accept}
        ref={ref}
        className={styles.file__input}
        onChange={handledUploadFile}
      />
      {children}
    </div>
  );
};

export default FileUpload;