import React, { useMemo, useState } from 'react';
import { createEditor } from 'slate';
import {
  Slate as ReactSlate, Editable, withReact,
} from 'slate-react';
import { withHistory } from 'slate-history';

import SlateLeaf from './SlateLeaf';
import SlateElement from './SlateElement';
import SlateToolbar from './SlateToolbar';

const Slate = ({
  onBlur = () => {},
}) => {
  const [value, setValue] = useState([{
    type: 'p',
    children: [{ text: 'meh' }],
  }]);
  const editor = useMemo(
    () => withReact(withHistory(createEditor())),
    [],
  );

  return (
    <ReactSlate
      editor={editor}
      value={value}
      // onChange={(v) => console.log(v)}
    >
      <SlateToolbar />
      <Editable
        onBlur={onBlur}
        renderElement={SlateElement}
        renderLeaf={SlateLeaf}
      />
    </ReactSlate>
  );
};

export default Slate;
