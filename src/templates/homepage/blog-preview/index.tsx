import React from 'react';

import { useAllBlogs } from 'helper/use-all-blogs';
import { BlogPreview as BlogPreviewEl } from './blog-preview';

const BlogPreview: React.FC<{}> = () => {
    const { sort } = useAllBlogs();

    const sorted = sort();

    // render preview if there's at least one blog post.
    if (sorted.length > 0) {
        const newest = sorted[sorted.length - 1];
        return <BlogPreviewEl blog={newest} />;
    } else {
        return <></>;
    }
};

export default BlogPreview;
