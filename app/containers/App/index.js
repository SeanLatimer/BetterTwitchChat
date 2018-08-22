// @flow strict

import * as React from 'react';
import { Classes, Colors } from '@blueprintjs/core';

function installTheme() {
  // $FlowIssue
  document.body.classList.add(Classes.DARK);
  // $FlowIssue
  document.body.style.backgroundColor = Colors.DARK_GRAY3;
}

type Props = {||};

class App extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    installTheme();
  }

  render() {
    return <div />;
  }
}

export default App;
