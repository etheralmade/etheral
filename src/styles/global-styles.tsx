import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    
    /* fix button(s) on far bottom size not working on mobile safari */
    @media screen and (max-width: 600px) {

      /* am not sure if this line(s) of codes do target specifically on safari */
      @media not all and (min-resolution:.001dpcm) { 
        @supports (-webkit-appearance:none) {
          body { 
            /* force the bottom bar to always show. */
            
            height: 100%;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
          }
        }
      }

    } 

    /* fixed border radius safari */
    input {
      border-radius: 0;
    }

    html {
      overflow-x: hidden;
    }

    /* fixed border radius safari */
    input[type="search"], input[type="text"], input[type="email"] {
      -webkit-appearance: none;
    }

    body {
      max-width: 100vw;
      overflow-x: hidden;

      @media screen and (max-width: 600px) {
        height: 100%;
        overflow-y: scroll;
      }

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

        padding-top: 12vh;

        @media screen and (min-width: 27em) and (orientation: landscape) {
          padding-top: 22vh;
        }

        @media screen and (min-width: 48em) {
          padding-top: 14vh;
        }

        @media screen and (min-width: 48em) and (orientation: landscape) {
          padding-top: 15vh;
        }

        @media screen and (min-width: 48em) and (max-height: 500px) and (orientation: landscape) {
          padding-top: 30vh;
        }

        /* @media screen and (min-width: 64em) {
          padding-top: 18vh;
        }  */

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
