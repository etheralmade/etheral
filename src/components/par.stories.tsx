import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, withKnobs } from '@storybook/addon-knobs'

import Paragraph from './par'

storiesOf('par', module).add('regular', () => <Paragraph text={text('inner text', 'AA')} />)
