import { useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { Blog } from 'helper/schema/blog';

const useAllBlogs = () => {
    const [allBlogs, setAllBlogs] = useState<Blog[]>([]);

    const data = useStaticQuery(graphql`
        query {
            allBlog {
                edges {
                    node {
                        date
                        summary
                        title
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

    return {
        allBlogs,
        sort,
    };
};

export { useAllBlogs };
