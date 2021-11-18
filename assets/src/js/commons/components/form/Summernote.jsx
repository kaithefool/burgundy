import React, { useRef, useEffect } from 'react';
import 'summernote/dist/summernote-lite.css';
import 'summernote/dist/summernote-lite';

import useUniqKey from '../../hooks/useUniqKey';

const FormEditor = ({
  initValue = '',
  onChange = () => {},
  onBlur = () => {},
}) => {
  const [id] = useUniqKey();
  const editor = useRef();
  const el = useRef();

  useEffect(() => {
    el.current.innerHTML = initValue;

    editor.current = $(`#${id}`).summernote({
      callbacks: {
        onChange,
        onBlur,
      },
    });

    return () => {
      editor.current.summernote('destroy');
    };
  }, []);

  return (
    <div id={id} ref={el} />
  );
};

export default FormEditor;
