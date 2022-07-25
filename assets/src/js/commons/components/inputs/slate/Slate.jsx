import React, { useMemo, useState } from 'react';
import { createEditor } from 'slate';
import {
  Slate as ReactSlate, Editable, withReact,
} from 'slate-react';
import { withHistory } from 'slate-history';

const Slate = ({
  onBlur = () => {},
}) => {
  const [value, setValue] = useState([{
    type: 'paragraph',
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
      onChange={(v) => console.log(v)}
    >
      <Editable
        onBlur={onBlur}
      />
    </ReactSlate>
  );
};

export default Slate;
