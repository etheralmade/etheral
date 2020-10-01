import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    /* fixed border radius safari */
    input {
      border-radius: 0;
    }

    /* fixed border radius safari */
    input[type="search"], input[type="text"], input[type="email"] {
      -webkit-appearance: none;
    }

    body {
      max-width: 100vw;
      overflow-x: hidden;

      header {
        
      }

      main {
        position: relative;
        z-index: 1;

        & > header:first-child {
          position: absolute;
          width: 100vw;
          top: 0;
        }

        @media screen and (min-width: 48em) {
          top: 0;

        }
      }

      .content {

        position: relative;
        z-index: 1;

        padding-top: 3vh;

        @media screen and (min-width: 27em) {
          padding-top: 5vh;
        }

        @media screen and (min-width: 48em) {
          padding-top: 12vh;
        }

        @media screen and (min-width: 48em) and (orientation: landscape) {
          padding-top: 15vh;
        }

        @media screen and (min-width: 48em) and (max-height: 500px) and (orientation: landscape) {
          padding-top: 30vh;
        }

        &.blog {
          @media screen and (min-width: 48em) {
            padding-top: 14vh;
          }

          @media screen and (min-width: 48em) and (orientation: landscape) {
            padding-top: 20vh;
          }

          @media screen and (min-width: 48em) and (max-height: 500px) and (orientation: landscape) {
            padding-top: 35vh;
          }
        }

      }

      .custom-scrollbar {
        overflow-y: scroll;

                &::-webkit-scrollbar {
                    width: 6px;
                }

                /* Track */
                &::-webkit-scrollbar-track {
                }

                /* Handle */
                &::-webkit-scrollbar-thumb {
                    background: #222;
                }
      }
    }
`;

export { GlobalStyles };
