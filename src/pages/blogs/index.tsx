import React from 'react';
import { PageProps, graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';

import { Layout } from 'components/layout';
import AllBlogs from 'templates/all-blogs';
import { Blog } from 'helper/schema';

//  all blogs page
const AllBlogsPage = (props: PageProps) => {
    const { data } = props as any;

    if (data) {
        const {
            blogs: blogsQuery,
            imgS: imgSQuery,
            imgM: imgMQuery,
            imgL: imgLQuery,
            imgXL: imgXLQuery,
        } = data as any;

        const getImgs = (
            index: number, // inddex of the img requested => no need to find index as it is already sorted (in query)
            headline: boolean // additional identifier => bigger size imgs for every first blog preview of an image.
        ): { sources: FluidObject[] } => {
            // search for all imgs => safety if the query result is not in order.image.url === url

            if (index !== -1) {
                const imgS = imgSQuery.edges[index].node.image;
                const imgM = imgMQuery.edges[index].node.image;

                if (!headline) {
                    return {
                        sources: [
                            {
                                ...imgS.childImageSharp.fluid,
                                media: '(max-width: 800px)',
                            } as FluidObject,
                            // {
                            //     ...imgM.childImageSharp.fluid,
                            //     media: '(max-width: 800px)',
                            // } as FluidObject,
                            // imgL.childImageSharp.fluid as FluidObject,
                            imgM.childImageSharp.fluid as FluidObject,
                        ],
                    };
                } else {
                    const imgL = imgLQuery.edges[index].node.image;
                    const imgXL = imgXLQuery.edges[index].node.image;

                    return {
                        sources: [
                            {
                                ...imgS.childImageSharp.fluid,
                                media: '(max-width: 400px)',
                            } as FluidObject,
                            {
                                ...imgM.childImageSharp.fluid,
                                media: '(max-width: 800px)',
                            } as FluidObject,
                            {
                                ...imgL.childImageSharp.fluid,
                                media: '(max-width: 1440px)',
                            } as FluidObject,
                            // imgXLQuery.imgs[indexXL].childImageSharp
                            //     .fluid as FluidObject,
                            imgXL.childImageSharp.fluid as FluidObject,
                        ],
                    };
                }
            } else {
                return { sources: [] };
            }
        };

        const blogs: Blog[] = blogsQuery.edges.map((edge: any, i: number) => ({
            ...edge.node,
            date: new Date(Date.parse(edge.node.date)),
            image: {
                childImageSharp: {
                    fluid: getImgs(i, i % 5 === 0 ? true : false),
                },
            },
        }));

        return (
            <Layout>
                <AllBlogs blogs={blogs} />
            </Layout>
        );
    } else {
        return null;
    }
};

export default AllBlogsPage;

export const query = graphql`
    query {
        blogs: allBlog(sort: { fields: date, order: DESC }) {
            edges {
                node {
                    slug
                    summary
                    title
                    date
                }
            }
        }
        imgS: allBlog(sort: { fields: date, order: DESC }) {
            edges {
                node {
                    image {
                        childImageSharp {
                            fluid(maxWidth: 400, quality: 100) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
            }
        }
        imgM: allBlog(sort: { fields: date, order: DESC }) {
            edges {
                node {
                    image {
                        childImageSharp {
                            fluid(maxWidth: 600, quality: 100) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
            }
        }
        imgL: allBlog(sort: { fields: date, order: DESC }) {
            edges {
                node {
                    image {
                        childImageSharp {
                            fluid(maxWidth: 1440, quality: 100) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
            }
        }
        imgXL: allBlog(sort: { fields: date, order: DESC }) {
            edges {
                node {
                    image {
                        childImageSharp {
                            fluid(maxWidth: 1920, quality: 100) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
            }
        }
    }
`;
