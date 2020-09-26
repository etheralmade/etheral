import React from 'react';

import { Box } from 'rebass';

import { html as htmlMain } from './html';
import { html as htmlCMS } from './cms/html';

import './styles.scss';
import './cms/styles.scss';
import './initial-styles.scss';

const cmsNotionExportedSrc =
    'Content%20Management%20System%201319dd58faca4f6eba879a2d34f0db3c';

const templateMain = { __html: htmlMain };
const templateCMS = { __html: htmlCMS.replace(cmsNotionExportedSrc, '') };

const NotionExport: React.FC<{}> = () => (
    <Box className="exported" sx={{ '& header': { position: 'relative' } }}>
        <div id="main" dangerouslySetInnerHTML={templateMain} />
        <div id="cms" dangerouslySetInnerHTML={templateCMS} />
    </Box>
);

export default NotionExport;
