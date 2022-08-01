import React from 'react';
import { useSlate } from 'slate-react';

import { faBold } from '@fortawesome/free-solid-svg-icons/faBold';
import { faItalic } from '@fortawesome/free-solid-svg-icons/faItalic';
import { faUnderline } from '@fortawesome/free-solid-svg-icons/faUnderline';
import { faStrikethrough } from '@fortawesome/free-solid-svg-icons/faStrikethrough';

import SlateBtn from './SlateBtn';
import { isMarkActive, toggleMark } from './helpers';

const SlateToolbar = () => {
  const editor = useSlate();

  return (
    <div>
      <SlateBtn
        icon={faBold}
        active={isMarkActive(editor, 'bold')}
        onClick={() => toggleMark(editor, 'bold')}
      />
      <SlateBtn
        icon={faItalic}
        active={isMarkActive(editor, 'italic')}
        onClick={() => toggleMark(editor, 'italic')}
      />
      <SlateBtn
        icon={faUnderline}
        active={isMarkActive(editor, 'underline')}
        onClick={() => toggleMark(editor, 'underline')}
      />
      <SlateBtn
        icon={faStrikethrough}
        active={isMarkActive(editor, 'strikethrough')}
        onClick={() => toggleMark(editor, 'strikethrough')}
      />
    </div>
  );
};

export default SlateToolbar;
