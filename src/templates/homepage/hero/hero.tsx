import React from 'react';
import { FluidObject } from 'gatsby-image';
import {
    CarouselProvider,
    Slider,
    Slide,
    ButtonBack,
    ButtonNext,
    DotGroup,
} from 'pure-react-carousel';

import { Box } from 'rebass';
import { Icon } from '@iconify/react';
import arrowRightSLine from '@iconify/icons-ri/arrow-right-s-line';
import arrowLeftSLine from '@iconify/icons-ri/arrow-left-s-line';

import HeroImage from './hero-img';

import 'pure-react-carousel/dist/react-carousel.es.css';
import './hero.scss';

export type HeroData = {
    img: {
        sources: FluidObject | FluidObject[];
    };
    url: string;
    buttonLink: string;
    buttonText: string;
};

export type Props = {
    heroData: HeroData[];
};

const Hero: React.FC<Props> = ({ heroData }) => {
    // add responsive height here on mobile devices.
    return (
        <Box height={'fit-content'} width="100vw">
            <CarouselProvider
                naturalSlideHeight={1280}
                naturalSlideWidth={1920}
                totalSlides={heroData.length}
                isPlaying={true}
                interval={5000}
                dragEnabled={false}
                infinite={true}
                className="carousel"
            >
                <Slider className="carousel-slide">
                    {heroData.map((data, i) => (
                        <Slide index={i} key={i}>
                            <HeroImage {...data} />
                        </Slide>
                    ))}
                </Slider>
                <ButtonBack className="carousel-button carousel-back">
                    <Icon icon={arrowLeftSLine} color="#f0f0f0" />
                </ButtonBack>
                <ButtonNext className="carousel-button carousel-next">
                    <Icon icon={arrowRightSLine} color="#f0f0f0" />
                </ButtonNext>
                <DotGroup className="carousel-dot" />
            </CarouselProvider>
        </Box>
    );
};

export { Hero };
