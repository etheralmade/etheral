import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      max-width: 100vw;
      overflow-x: hidden;

      main {
        position: relative;
        top: 8vh;

        header {
          top: -8vh;
        }

        @media screen and (min-width: 27em) {

          --padding-top: calc(8vh + 32px);

          top: var(--padding-top);

          header {
            top: calc(-1 * var(--padding-top));
          }
        }

        @media screen and (min-width: 48em) {
          top: 0;

          header {
            top: 0;
          }
        }

        @media screen and (min-width: 64em) {
          header {
            top: 0;
          }
        }
      }

      .top {

        @media screen and (min-width: 64em) {
          position: relative;
          top: 10vh;
        }
        
      }
    }
`;

export { GlobalStyles };
