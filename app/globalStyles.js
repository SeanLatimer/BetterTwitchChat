import { injectGlobal } from 'styled-components';

export default () => {
  injectGlobal`
    html,
    body,
    .root {
      height: 100%;
      overflow-y: hidden;
      font-family: 'Lato', 'Helvetica Neue', sans-serif;
    }
  `;
};
