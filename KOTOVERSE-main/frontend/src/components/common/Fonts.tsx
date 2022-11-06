import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
      /* regular nomal */
      @font-face {
        font-family: 'PT Serif';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('./fonts/PTSerif-Regular.ttf') format('ttf');
      }
      /* regular italic */
      @font-face {
        font-family: 'PT Serif';
        font-style: italic;
        font-weight: 400;
        font-display: swap;
        src: url('./fonts/PTSerif-Italic.ttf') format('ttf');
      }
      /* bold normal */
      @font-face {
        font-family: 'PT Serif';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('./fonts/PTSerif-Bold.ttf') format('ttf');
      }
      /* bold italic */
      @font-face {
        font-family: 'PT Serif';
        font-style: italic;
        font-weight: 700;
        font-display: swap;
        src: url('./fonts/PTSerif-BoldItalic.ttf') format('ttf');
      }
      `}
  />
);

export default Fonts;
