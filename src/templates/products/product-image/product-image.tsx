import React from 'react';
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
                className="carousel"
            >
                <Slider className="carousel-slide">
                    {/* add zoom on hover */}
                    {images.map((img, i) => (
                        <Slide index={i} key={i} innerClassName="slide">
                            <Box width="100%" height="100%">
                                <Img
                                    fluid={img.sources}
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                    }}
                                    imgStyle={{ objectPosition: 'center' }}
                                    alt={`${productName} image ${i}`}
                                    className="product-img"
                                />
                            </Box>
                        </Slide>
                    ))}
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
