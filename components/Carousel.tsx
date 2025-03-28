import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const images = [
        '/assets/images/portfolio/Egypte/image2.jpg',
        '/assets/images/portfolio/Indonesie/image1.jpg',
        '/assets/images/portfolio/Japon/image1.jpg',
        '/assets/images/portfolio/Bresil/image1.jpg'
    ];

    const updateSlide = useCallback(() => {
        setCurrentSlide((currentSlide + 1) % images.length);
    }, [currentSlide, images.length]);

    useEffect(() => {
        const intervalId = setInterval(updateSlide, 5000);
        return () => clearInterval(intervalId);
    }, [updateSlide]);

    const handlePrevSlide = useCallback(() => {
        setCurrentSlide((currentSlide - 1 + images.length) % images.length);
    }, [currentSlide, images.length]);

    const handleNextSlide = useCallback(() => {
        setCurrentSlide((currentSlide + 1) % images.length);
    }, [currentSlide, images.length]);

    return (
        <div className="carousel w-full h-1/5">
            <div className="carousel-item relative w-full">
                <Image
                    src={images[currentSlide]}
                    alt={`Slide ${currentSlide + 1}`}
                    className="w-full"
                    width={1920}
                    height={1080}
                    layout="responsive"
                    priority
                />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <button onClick={handlePrevSlide} className="btn btn-circle">
                        ❮
                    </button>
                    <button onClick={handleNextSlide} className="btn btn-circle">
                        ❯
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Carousel;