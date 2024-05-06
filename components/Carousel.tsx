import React, { useState, useEffect } from 'react';

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const images = [
        'assets/images/portfolio/Egypte/image2.jpg',
        'assets/images/portfolio/Indonesie/image1.jpg',
        'assets/images/portfolio/Japon/image1.jpg',
        'assets/images/portfolio/Bresil/image1.jpg'
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentSlide((currentSlide + 1) % images.length);
        }, 5000);

        return () => clearInterval(intervalId);
    }, [currentSlide, images.length]);

    const handlePrevSlide = () => {
        setCurrentSlide((currentSlide - 1 + images.length) % images.length);
    };

    const handleNextSlide = () => {
        setCurrentSlide((currentSlide + 1) % images.length);
    };

    return (
        <div className="carousel w-full h-1/5">
            <div className="carousel-item relative w-full">
                <img src={images[currentSlide]} alt={`Slide ${currentSlide + 1}`} className="w-full" />
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