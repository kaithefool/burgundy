import { Editor, Element, Transforms } from 'slate';

const TEXT_ALIGN_TYPES = [
  'left', 'center', 'right', 'justify',
];
const LIST_TYPES = ['ul', 'ol'];

export function isMarkActive(editor, format) {
  const marks = Editor.marks(editor);

  return marks?.[format] === true;
}

export function isBlockActive(editor, format) {
  const { selection } = editor;

  if (!selection) return false;

  const blockType = TEXT_ALIGN_TYPES.includes(format)
    ? 'align' : 'type';

  const [match] = Array.from(
    Editor.nodes(
      editor,
      {
        at: Editor.unhangRange(editor, selection),
        match: (n) => (
          !Editor.isEditor(n)
          && Element.isElement(n)
          && n[blockType] === format
        ),
      },
    ),
  );

  return !!match;
}

export function toggleMark(editor, format) {
  if (isMarkActive(editor, format)) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
}

export function toggleBlock(editor, format) {
  const isAlign = TEXT_ALIGN_TYPES.includes(format);
  const isList = LIST_TYPES.includes(format);
  const isActive = isBlockActive(editor, format);

  if (!isAlign) {
    // split element from list
    Transforms.unwrapNodes(
      editor,
      {
        split: true,
        match: (n) => (
          !Editor.isEditor(n)
          && Element.isElement(n)
          && LIST_TYPES.includes(n.type)
        ),
      },
    );
  }

  const newProps = {};

  if (isAlign) {
    newProps.align = isActive ? undefined : format;
  } else if (isActive) {
    newProps.type = 'p';
  } else {
    newProps.type = isList ? 'li' : format;
  }

  Transforms.setNodes(editor, newProps);

  if (!isActive && isList) {
    // wrap with list
    Transforms.wrapNodes(editor, {
      type: format, children: [],
    });
  }
}
