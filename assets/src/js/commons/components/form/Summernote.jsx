import React, { useRef, useEffect } from 'react';
import $ from 'jQuery';
import sanitizeHtml from 'sanitize-html';

import 'summernote/dist/summernote-lite.css';
import 'summernote/dist/summernote-lite';

import useUniqKey from '../../hooks/useUniqKey';

const sanitize = (html) => sanitizeHtml(html, {
  allowedAttributes: {
    '*': ['style'],
    a: ['href', 'name', 'target'],
    img: ['src'],
  },
  allowedStyles: {
    '*': {
      color: [
        /^#(0x)?[0-9a-f]+$/i,
        /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
      ],
      'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
    },
  },
});

const FormEditor = ({
  initValue = '',
  onChange = () => {},
  onBlur = () => {},
  essentials = false,
}) => {
  const [id] = useUniqKey();
  const editor = useRef();
  const el = useRef();

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
        onPaste(e) {
          e.preventDefault();

          const clipboard = (
            (e.originalEvent || e).clipboardData || window.clipboardData
          );
          const html = clipboard.getData('text/html');
          const text = clipboard.getData('text');

          if (html) {
            editor.current.summernote('pasteHTML', sanitize(html));
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
