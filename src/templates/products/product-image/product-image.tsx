import React, { useState } from 'react';
import Img, { FluidObject } from 'gatsby-image';
import {
    CarouselProvider,
    Slider,
    Slide,
    ButtonBack,
    ButtonNext,
    Dot,
} from 'pure-react-carousel';

import { Box, Flex } from 'rebass';
import { Icon } from '@iconify/react';
import arrowRightSLine from '@iconify/icons-ri/arrow-right-s-line';
import arrowLeftSLine from '@iconify/icons-ri/arrow-left-s-line';

import './styles.scss';

export type ImgProps = { sources: FluidObject[] }[];

type Props = {
    images: ImgProps;
    productName: string;
};

const ProductImage: React.FC<Props> = ({ images, productName }) => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const zoom = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        i: number
    ) => {
        const el = document.getElementById(`img-${i}`);
        if (el) {
            const { height, width, left, top } = el.getBoundingClientRect();

            const { clientX, clientY } = event;

            // calculate where mouse is in comparison to the actual image.
            // minus the actual img position from the left side of the screen
            const eventX = clientX - left;
            const eventY = clientY - top;

            // convert comparison to percentage
            const transformX = Math.ceil((eventX / width) * 100); // in decimal
            const transformY = Math.ceil((eventY / height) * 100);

            setX(transformX);
            setY(transformY);
        }
    };

    return (
        <Box
            height="fit-content"
            width={['100%', '50%']}
            maxWidth={[280, 320, 400, 600]}
            my={[5, 5, 7]}
        >
            <CarouselProvider
                naturalSlideHeight={600}
                naturalSlideWidth={600}
                totalSlides={images.length}
                dragEnabled={false}
                infinite={true}
                className="product-carousel"
            >
                <Slider className="carousel-slide">
                    {/* add zoom on hover */}
                    {images.map((img, i) => {
                        return (
                            <Slide index={i} key={i} innerClassName="slide">
                                <Box
                                    width="100%"
                                    height="100%"
                                    sx={{
                                        transition: '0.2s',
                                        transformOrigin: `${x}% ${y}%`,
                                        cursor: 'crosshair',
                                        '&:hover': {
                                            transform: `scale(2)`,
                                        },
                                    }}
                                    onMouseMove={e => {
                                        zoom(e, i);
                                    }}
                                    id={`img-${i}`}
                                >
                                    <Img
                                        fluid={img.sources}
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                        }}
                                        imgStyle={{
                                            objectPosition: 'center',
                                        }}
                                        alt={`${productName} image ${i}`}
                                        className="product-page-img"
                                    />
                                </Box>
                            </Slide>
                        );
                    })}
                </Slider>
                <Flex justifyContent="center" my={[3, 3, 5]}>
                    {images.map((img, i) => (
                        <Dot slide={i} key={i}>
                            <Box width="100%" height="100%">
                                <Img
                                    fluid={img.sources}
                                    style={{ height: '100%', width: '100%' }}
                                    imgStyle={{ objectPosition: 'center' }}
                                    alt={`${productName} image ${i}`}
                                />
                            </Box>
                        </Dot>
                    ))}
                </Flex>
                <ButtonBack className="carousel-button carousel-back">
                    <Icon icon={arrowLeftSLine} color="#f0f0f0" />
                </ButtonBack>
                <ButtonNext className="carousel-button carousel-next">
                    <Icon icon={arrowRightSLine} color="#f0f0f0" />
                </ButtonNext>
            </CarouselProvider>
        </Box>
    );
};

export { ProductImage };

// imgS: product(slug: { eq: $slug }) {
//             productImages {
//                 childImageSharp {
//                     fluid(maxWidth: 280, quality: 100) {
//                         ...GatsbyImageSharpFluid
//                     }
//                 }
//             }
//         }
//         imgM: product(slug: { eq: $slug }) {
//             productImages {
//                 childImageSharp {
//                     fluid(maxWidth: 320, quality: 100) {
//                         ...GatsbyImageSharpFluid
//                     }
//                 }
//             }
//         }
//         imgL: product(slug: { eq: $slug }) {
//             productImages {
//                 childImageSharp {
//                     fluid(maxWidth: 400, quality: 100) {
//                         ...GatsbyImageSharpFluid
//                     }
//                 }
//             }
//         }
//         imgXL: product(slug: { eq: $slug }) {
//             productImages {
//                 childImageSharp {
//                     fluid(maxWidth: 600, quality: 100) {
//                         ...GatsbyImageSharpFluid
//                     }
//                 }
//             }
//         }
