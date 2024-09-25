import React, { useState } from 'react';

export default function Home() {
    const [dots, setDots] = useState([]);
    const [radius, setRadius] = useState('');

    function distance(point1, point2) {
        const x1 = point1.x;
        const y1 = point1.y;
        const x2 = point2.x;
        const y2 = point2.y;

        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    const handleElementClick = (e) => {
        const clientX = e.clientX;
        const clientY = e.clientY;

        // if (!radius) return; // Prevent adding dots if radius is not set

        const dot = { x: clientX, y: clientY };
        let isValid = true;

        dots.forEach((item) => {
            const gap = distance(item, dot);
            if (gap < 2 * radius) {
                isValid = false;

                // Check if the clicked dot is within the bounds of the existing dot
                // if (
                //     (dot.x >= item.x - radius && dot.x <= item.x + radius) &&
                //     (dot.y >= item.y - radius && dot.y <= item.y + radius)
                // ) {
                //     const index = dots.indexOf(item);
                //     if (index !== -1) {
                //         // Remove the dot and update state
                //         dots.splice(index, 1);
                //         setDots([...dots]);
                //     }
                // }
            }
        })

        if (isValid) {
           setDots((prevDots) => [...prevDots, dot]);
            if(!radius) {
                alert('Enter the Radius of Circle');
                dots.splice(-1, 1);
                setDots([...dots]);
            }
        } 
    };

    const handleRadiusChange = (e) => {
        setRadius(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        if (radius) {
            setRadius(Number(radius)); // Ensure radius is a number
        }
    };

    return (
        <div className='h-screen relative'>
            <div className='flex justify-center'>
                <div className='flex p-4' onSubmit={handleSubmit}>
                    <p className='text-xl'>Enter the Radius of Circle</p>
                    <input
                        type="number"
                        value={radius}
                        placeholder='Enter Radius'
                        className='input-no-spinner border mx-2 px-2'
                        onChange={handleRadiusChange}
                    />
                </div>
            </div>
            <div className='h-[90vh] bg-gray-300 ' onClick={handleElementClick}>
                {dots.map((dot, index) => (
                    <div
                        key={index}
                        className='absolute bg-red-500 rounded-full'
                        style={{
                            height: `${2 * radius}px`,
                            width: `${2 * radius}px`,
                            top: `${dot.y - radius}px`,
                            left: `${dot.x - radius}px`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
