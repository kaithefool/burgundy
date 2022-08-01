import React from 'react';

const SlateLeaf = ({
  attributes,
  children,
  leaf,
}) => {
  let out = children;

  if (leaf.bold) {
    out = <strong>{out}</strong>;
  }
  if (leaf.code) {
    out = <code>{out}</code>;
  }
  if (leaf.italic) {
    out = <em>{out}</em>;
  }
  if (leaf.underline) {
    out = <u>{out}</u>;
  }
  if (leaf.strikethrough) {
    out = <s>{out}</s>;
  }

  return <span {...attributes}>{out}</span>;
};

export default SlateLeaf;
