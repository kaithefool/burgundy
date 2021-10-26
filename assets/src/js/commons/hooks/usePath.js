import { useHistory } from 'react-router-dom';

import helper from '../helpers/path';

export default function usePath() {
  const history = useHistory();
  const path = helper.resolve;

  return {
    path,
    pushPath: (...seg) => history.push(path(...seg)),
    replacePath: (...seg) => history.replace(path(...seg)),
  };
}
