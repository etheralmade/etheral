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

        header:first-child {
          position: relative;
          width: 100vw;
        }

        @media screen and (min-width: 48em) {
          top: 0;

          header:first-child {
            top: 0;
            position: absolute;
          }
        }

        @media screen and (min-width: 64em) {
           heade:first-childr {
            top: 0;
          }
        }
      }

      .top {

        @media screen and (min-width: 48em) {
          padding-top: 14vh;
        }

        @media screen and (min-width: 48em) and (orientation: landscape) {
          padding-top: 20vh;
        }
        
        /* @media screen and (min-width: 64em) {
          padding-top: 12vh;
        } */

      }
    }
`;

export { GlobalStyles };
