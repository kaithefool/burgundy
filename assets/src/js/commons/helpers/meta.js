import isEqual from 'lodash/isEqual';

import env from '../config/env';

const titleTag = document.querySelector('title');
const { dataLayer } = window;

const getTitle = () => {
  const [, title = ''] = titleTag.innerHTML.match(
    new RegExp(`(.*?) | ${env.meta.title}$`),
  ) || [];

  return title;
};
const getPath = () => {
  const { pathname, search } = window.location;

  return `${pathname}${search}`;
};

let current = {
  title: getTitle(),
  path: getPath(),
};

export default function meta(m) {
  const draft = {
    ...m,
    path: getPath(),
  };

  if (!isEqual(draft, current)) {
    const { title, path } = draft;

    // set current
    current = draft;

    // set title
    titleTag.innerHTML = title
      ? `${title} | ${env.meta.title}`
      : env.meta.title;

    // google analytics
    if (dataLayer) {
      dataLayer.push({
        event: 'pageview',
        pagePath: path,
        pageTitle: title,
      });
    }
  }
}
