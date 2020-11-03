import React from 'react';
import { PageProps, graphql } from 'gatsby';

import Thankyou, { Props } from 'templates/thankyou';
import { Layout } from 'components/layout';

const ThankyouPage = (props: PageProps) => {
    console.log(props);

    const { state } = props.location;

    if (state) {
        return (
            <Layout>
                <Thankyou {...(state as Props)} />
            </Layout>
        );
    } else {
        return <></>;
    }

    // handle messages if: va, alfa, cstore usw.
};

export const query = graphql`
    query {
        mobile: file(
            absolutePath: {
                eq: "/mnt/c/Users/louis/Documents/dev/etheral/src/images/thx-mobile.png"
            }
        ) {
            childImageSharp {
                fluid {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        desktop: file(
            absolutePath: {
                eq: "/mnt/c/Users/louis/Documents/dev/etheral/src/images/thx.png"
            }
        ) {
            childImageSharp {
                fluid {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`;

export default ThankyouPage;
