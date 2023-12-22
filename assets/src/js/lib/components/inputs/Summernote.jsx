import React, { useRef, useEffect } from 'react';
import $ from 'jQuery';

import 'summernote/dist/summernote-lite.css';
import 'summernote/dist/summernote-lite';

import { sanitizeHtml } from '../../helpers';
import useUniqKey from '../../hooks/useUniqKey';
import useHttp from '../../hooks/useHttp';
import useAlert from '../alert/useAlert';

const FormEditor = ({
  initValue = '',
  onChange = () => {},
  onBlur = () => {},
  essentials = false,
  fileApi = { url: '/api/files' },
}) => {
  const [id] = useUniqKey();
  const editor = useRef();
  const el = useRef();
  const fileHttp = useHttp();

  useAlert(fileHttp?.res, { success: false });

  const toolbar = [
    !essentials && ['style', ['style']],
    ['font', [
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'superscript',
      'subscript',
      'color',
      'clear',
    ]],
    !essentials && ['para', ['ul', 'ol', 'paragraph']],
    !essentials && ['table', ['table']],
    !essentials && ['insert', ['hr', 'link', 'picture', 'video']],
    !essentials && ['view', ['codeview', 'undo', 'redo']],
  ].filter((a) => a);

  useEffect(() => {
    el.current.innerHTML = initValue;

    editor.current = $(`#${id}`).summernote({
      toolbar,
      disableDragAndDrop: true,
      dialogsInBody: true,
      styleTags: ['p', 'blockquote', 'h2', 'h3', 'h4', 'h5', 'h6'],
      callbacks: {
        onChange(v) {
          onChange(editor.current.summernote('isEmpty') ? '' : v);
        },
        onBlur,
        async onImageUpload(files) {
          const {
            data: { path, name },
          } = await fileHttp.req({ ...fileApi, file: files[0] });

          editor.current.summernote(
            'insertImage',
            `/uploads/${path}`,
            name,
          );
        },
        onPaste(e) {
          e.preventDefault();

          const clipboard = (
            (e.originalEvent || e).clipboardData || window.clipboardData
          );
          const html = clipboard.getData('text/html');
          const text = clipboard.getData('text');

          if (html) {
            editor.current.summernote('pasteHTML', sanitizeHtml(html));
          } else {
            editor.current.summernote('insertText', text);
          }
        },
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
