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

        header {
          position: relative;
          width: 100vw;
        }

        @media screen and (min-width: 48em) {
          top: 0;

          header {
            top: 0;
            position: absolute;
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
