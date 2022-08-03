import React from 'react';
import { useSlate } from 'slate-react';

import { faBold } from '@fortawesome/free-solid-svg-icons/faBold';
import { faItalic } from '@fortawesome/free-solid-svg-icons/faItalic';
import { faUnderline } from '@fortawesome/free-solid-svg-icons/faUnderline';
import { faStrikethrough } from '@fortawesome/free-solid-svg-icons/faStrikethrough';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons/faAlignLeft';
import { faAlignRight } from '@fortawesome/free-solid-svg-icons/faAlignRight';
import { faAlignCenter } from '@fortawesome/free-solid-svg-icons/faAlignCenter';
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons/faAlignJustify';
import { faParagraph } from '@fortawesome/free-solid-svg-icons/faParagraph';
import { faHeading } from '@fortawesome/free-solid-svg-icons/faHeading';
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons/faQuoteRight';
import { faListOl } from '@fortawesome/free-solid-svg-icons/faListOl';
import { faListUl } from '@fortawesome/free-solid-svg-icons/faListUl';
import { faFont } from '@fortawesome/free-solid-svg-icons/faFont';
import { faHighlighter } from '@fortawesome/free-solid-svg-icons/faHighlighter';

import SlateBtn from './SlateBtn';
import {
  isBlockActive, isMarkActive, toggleBlock, toggleMark,
} from './helpers';
import SlateSelect from './SlateSelect';
import SlateColorPicker from './SlateColorPicker';

const SlateToolbar = () => {
  const editor = useSlate();

  return (
    <div>
      <SlateBtn
        icon={faBold}
        active={isMarkActive(editor, 'bold')}
        onMouseDown={() => toggleMark(editor, 'bold')}
      />
      <SlateBtn
        icon={faItalic}
        active={isMarkActive(editor, 'italic')}
        onMouseDown={() => toggleMark(editor, 'italic')}
      />
      <SlateBtn
        icon={faUnderline}
        active={isMarkActive(editor, 'underline')}
        onMouseDown={() => toggleMark(editor, 'underline')}
      />
      <SlateBtn
        icon={faStrikethrough}
        active={isMarkActive(editor, 'strikethrough')}
        onMouseDown={() => toggleMark(editor, 'strikethrough')}
      />
      <SlateSelect
        isActive={(f) => isBlockActive(editor, f)}
        onMouseDown={(f) => toggleBlock(editor, f)}
      >
        {[
          { format: 'left', icon: faAlignLeft },
          { format: 'center', icon: faAlignCenter },
          { format: 'right', icon: faAlignRight },
          { format: 'justify', icon: faAlignJustify },
        ]}
      </SlateSelect>
      <SlateSelect
        isActive={(f) => isBlockActive(editor, f)}
        onMouseDown={(f) => toggleBlock(editor, f)}
      >
        {[
          { format: 'p', icon: faParagraph },
          { format: 'blockquote', icon: faQuoteRight },
          { format: 'h1', icon: faHeading },
        ]}
      </SlateSelect>
      <SlateSelect
        isActive={(f) => isBlockActive(editor, f)}
        onMouseDown={(f) => toggleBlock(editor, f)}
      >
        {[
          { format: 'ol', icon: faListOl },
          { format: 'ul', icon: faListUl },
        ]}
      </SlateSelect>
      <SlateColorPicker
        icon={faFont}
      />
    </div>
  );
};

export default SlateToolbar;
