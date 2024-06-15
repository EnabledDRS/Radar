/* Reset margins and padding for the body */
body {
    margin: 0;
    padding: 0;
    background-color: #222; /* Dark background for the body */
    color: #fff; /* Light text color */
    font-family: Arial, sans-serif;
}

/* General container styles */
.container {
    width: 100%;
    max-width: 900px; /* Limit maximum width to 900px */
    margin: auto;
    text-align: center;
    background-color: #333; /* Dark background */
    color: #fff; /* Light text color */
    padding: 20px; /* Padding around the container */
    border-radius: 10px; /* Rounded corners */
    box-sizing: border-box;
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
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 0; /* Remove top margin */
}

/* Slider container styles */
.slider-container {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%; /* Adjust width to desired size */
    margin: 0 10px; /* Add margin to avoid text overlap */
}

/* Time slider styles */
#timeSlider {
    width: 100%; /* Make slider fill the container */
}

/* Speed controls styles */
.speed-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    margin-top: 20px; /* Add some space above the speed controls */
}

/* Speed display styles */
#speedDisplayContainer {
    width: 100px; /* Fixed width for the speed display */
    text-align: center;
    border: 1px solid #ccc; /* Light grey border */
    padding: 5px; /* Padding for the speed display */
    font-size: 14px; /* Font size for the speed display */
    border-radius: 5px;
    background-color: #444; /* Dark grey background */
    color: #fff; /* Light text color */
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

button:active {
    transform: scale(0.95);
}

button:focus {
    outline: none;
    background-color: #007bff; /* Reset the background color */
}

/* Dropdown styles */
select {
    padding: 5px;
    font-size: 14px;
    background-color: #444; /* Dark grey background */
    color: white; /* Light text color */
    border: none;
    border-radius: 5px;
    height: 36px; /* Match the height of other controls */
}

select option {
    background-color: #333; /* Darker option background */
    color: white; /* Light text color */
}

/* Label styles */
label {
    color: #fff; /* Light text color */
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

/* Region and refresh container styles */
.region-refresh-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px; /* Add some space above the container */
}

/* Refresh time display styles */
.refresh-container {
    text-align: right;
    font-size: 12px;
    color: gray;
}

/* Slider label styles */
.slider-label {
    font-size: 14px;
    color: #fff;
    width: 30px; /* Adjust width to bring closer to the slider */
}

.slider-label.left {
    margin-right: 5px; /* Adjust margin to bring label closer */
}

.slider-label.right {
    margin-left: 5px; /* Adjust margin to bring label closer */
}

/* Responsive styles for mobile devices */
@media (max-width: 768px) {
    body {
        padding-top: 60px; /* Keep top padding for spacing */
    }

    .container {
        width: 100%;
        padding: 10px 0; /* Add top and bottom padding for spacing */
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

    .region-refresh-container {
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }

    .refresh-container {
        text-align: center;
        margin-top: 10px;
    }
}
