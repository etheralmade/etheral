import { useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import { findIndex } from 'lodash';

import { Blog } from 'helper/schema/blog';

const useAllBlogs = () => {
    const [allBlogs, setAllBlogs] = useState<Blog[]>([]);

    const data = useStaticQuery(graphql`
        query {
            allBlog: allBlog {
                edges {
                    node {
                        date
                        summary
                        title
                        slug
                        image {
                            childImageSharp {
                                fluid {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
            queryImgS: allBlog {
                edges {
                    node {
                        slug
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
            queryImgM: allBlog {
                edges {
                    node {
                        slug
                        image {
                            childImageSharp {
                                fluid(maxWidth: 700, quality: 100) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
            queryImgL: allBlog {
                edges {
                    node {
                        slug
                        image {
                            childImageSharp {
                                fluid(maxWidth: 900, quality: 100) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        }
    `);

    // avoid mutating original array.
    const sort = () =>
        [...allBlogs].sort((a, b) => a.date.getTime() - b.date.getTime());

    useEffect(() => {
        if (data) {
            // map all edges.
            const {
                allBlog: { edges },
            } = data;
            const blogDatas: any = edges.map((edge: any) => edge.node);

            // set all data to blog type and parse the date string passed from query
            const allBlogsData: Blog[] = blogDatas.map((blogData: any) => ({
                ...blogData,
                date: new Date(Date.parse(blogData.date)),
            }));

            setAllBlogs(allBlogsData);
        }
    }, []);

    const getQueryImgs = (blog: Blog) => {
        const { queryImgS, queryImgM, queryImgL } = data as any;

        // map through object and extract nodes.
        const imgSData = queryImgS.edges.map((edge: any) => edge.node);
        const imgMData = queryImgM.edges.map((edge: any) => edge.node);
        const imgLData = queryImgL.edges.map((edge: any) => edge.node);

        // find targeted blog obj by finding its index.
        const imgSIndex = findIndex(imgSData, (o: any) => o.slug === blog.slug);
        if (imgSIndex !== -1 && allBlogs) {
            // extract all preview imgs based on slug.
            const imgMIndex = findIndex(
                imgSData,
                (o: any) => o.slug === blog.slug
            );
            const imgLIndex = findIndex(
                imgSData,
                (o: any) => o.slug === blog.slug
            );

            const sources = [
                {
                    ...imgSData[imgSIndex].image.childImageSharp.fluid,
                    media: 'max-width: 48em',
                } as FluidObject,
                {
                    ...imgMData[imgMIndex].image.childImageSharp.fluid,
                    media: 'max-width: 90em',
                } as FluidObject,
                imgLData[imgLIndex].image.childImageSharp.fluid as FluidObject,
            ];

            return {
                childImageSharp: {
                    fluid: sources,
                },
            };
        } else {
            return blog.image;
        }
    };

    return {
        allBlogs,
        sort,
        getQueryImgs,
    };
};

export { useAllBlogs };
