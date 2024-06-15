/* General container styles */
.container {
    width: 90%;
    max-width: 900px; /* Limit maximum width to 900px */
    margin: auto;
    text-align: center;
    font-family: Arial, sans-serif;
}

/* Controls container styles */
.controls-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    padding: 0 20px; /* Add some padding to the left and right */
    box-sizing: border-box; /* Ensure padding is included in the width */
}

/* Slider wrapper styles */
.slider-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    flex-grow: 1; /* Allow the slider-wrapper to grow */
    width: 100%;
}

/* Slider container styles */
.slider-container {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    justify-content: center;
}

/* Time slider styles */
#timeSlider {
    width: 70%; /* Adjust width to prevent line break */
}

/* Speed controls styles */
.speed-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
}

/* Speed display styles */
#speedDisplayContainer {
    width: 100px; /* Fixed width for the speed display */
    text-align: center;
    border: 1px solid #ccc; /* Light grey border */
    padding: 5px; /* Padding for the speed display */
    font-size: 14px; /* Font size for the speed display */
    border-radius: 5px;
    background-color: #f9f9f9; /* Light grey background */
    height: 36px; /* Fixed height for consistency with buttons */
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Button styles */
button {
    padding: 5px 10px;
    font-size: 14px;
    background-color: #007bff; /* Blue background */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    height: 36px; /* Match the height of speedDisplayContainer */
}

button:hover {
    background-color: #0056b3; /* Darker blue on hover */
}

/* Image container styles */
.image-container {
    text-align: center;
    max-width: 100%; /* Ensure container doesn't exceed 100% of viewport width */
    overflow: hidden; /* Ensure no overflow */
    padding: 0; /* Remove any padding */
    margin: 0; /* Remove any margin */
}

/* Image styles */
#sliderImage {
    width: 100%;
    height: auto;
    max-width: 100%;
    max-height: 80vh; /* Ensure image doesn't exceed 80% of viewport height */
    object-fit: contain; /* Ensure image scales while maintaining aspect ratio */
    padding: 0; /* Remove any padding */
    margin: 0; /* Remove any margin */
}

/* Region select container styles */
.region-container {
    display: flex;
    justify-content: center; /* Center align the region select */
    margin-top: 20px; /* Add some space above the region select */
}

/* Refresh time display styles */
.refresh-container {
    text-align: center;
    margin-top: 20px;
    font-size: 12px;
    color: gray;
}

/* Responsive styles for mobile devices */
@media (max-width: 768px) {
    .container {
        width: 100%;
        padding: 0;
    }

    .controls-container {
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 0; /* Remove padding for smaller screens */
    }

    .image-container {
        padding: 0;
        margin: 0;
    }

    #sliderImage {
        max-height: 60vh; /* Adjust max-height for smaller screens */
    }

    .slider-wrapper {
        max-width: 100%; /* Remove width restriction for mobile */
    }
}
