import { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const useAllFiles = () => {
    const [allFiles, setAllFiles] = useState([]);

    const result = useStaticQuery(graphql`
        query {
            allFile {
                edges {
                    node {
                        absolutePath
                        childImageSharp {
                            fixed {
                                ...GatsbyImageSharpFixed
                            }
                        }
                    }
                }
            }
        }
    `);

    useEffect(() => {
        if (result) {
            const data = result.allFile.edges.map(({ node }: any) => ({
                absolutePath: node.absolutePath,
                childImageSharp: node.childImageSharp,
            }));

            setAllFiles(data);
            console.log(result);
        }
    }, []);

    return allFiles;
};

export default useAllFiles;
