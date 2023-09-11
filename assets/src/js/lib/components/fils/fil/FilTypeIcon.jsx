import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons/faFileAlt';
import { faFileWord } from '@fortawesome/free-solid-svg-icons/faFileWord';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons/faFileExcel';
import {
  faFilePowerpoint,
} from '@fortawesome/free-solid-svg-icons/faFilePowerpoint';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons/faFilePdf';
import { faCode } from '@fortawesome/free-solid-svg-icons/faCode';
import { faFileCsv } from '@fortawesome/free-solid-svg-icons/faFileCsv';
import { faFileArchive } from '@fortawesome/free-solid-svg-icons/faFileArchive';
import { faImage } from '@fortawesome/free-solid-svg-icons/faImage';
import { faVideo } from '@fortawesome/free-solid-svg-icons/faVideo';
import { faMusic } from '@fortawesome/free-solid-svg-icons/faMusic';

import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube';
import { faVimeo } from '@fortawesome/free-brands-svg-icons/faVimeo';

import useFil from './useFil';

const mimes = [
  {
    icon: faFileWord,
    mimes: [
      'application/msword',
      'application/vnd.ms-word',
      'application/vnd.oasis.opendocument.text',
      'application/vnd.openxmlformats-officedocument.wordprocessingml',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },
  {
    icon: faFileExcel,
    mimes: [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml',
      'application/vnd.oasis.opendocument.spreadsheet',
    ],
  },
  {
    icon: faFilePowerpoint,
    mimes: [
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml',
      'application/vnd.oasis.opendocument.presentation',
    ],
  },
  { icon: faFilePdf, mimes: ['application/pdf'] },
  { icon: faFileAlt, mimes: ['text/plain'] },
  { icon: faFileCsv, mimes: ['text/csv'] },
  {
    icon: faCode,
    mimes: [
      'text/html',
      'application/json',
    ],
  },
  {
    icon: faFileArchive,
    mimes: [
      'application/zip',
      'application/gzip',
    ],
  },
  {
    icon: faYoutube,
    mimes: ['cloud/youtube'],
  },
  {
    icon: faVimeo,
    mimes: ['cloud/vimeo'],
  },
];

const mimeToIcon = (mime) => {
  const [type] = mime.split('/');

  // media icons
  const media = {
    image: faImage,
    audio: faMusic,
    video: faVideo,
  }[type];

  if (media) return media;

  const others = mimes.find((m) => m.mimes.includes(mime));

  if (others) return others.icon;

  // default
  return faFile;
};

const FilTypeIcon = (props) => {
  const { file } = useFil();

  return <FA icon={mimeToIcon(file.type)} {...props} />;
};

export default FilTypeIcon;
