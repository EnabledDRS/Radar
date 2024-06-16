document.addEventListener('DOMContentLoaded', async function () {
    const slider = document.getElementById('timeSlider');
    const image = document.getElementById('sliderImage');
    const speedDisplay = document.getElementById('speedDisplayContainer');
    const fasterButton = document.getElementById('fasterButton');
    const slowerButton = document.getElementById('slowerButton');
    const playPauseButton = document.getElementById('playPauseButton');
    const lastRefresh = document.getElementById('lastRefresh');
    const latitudeInput = document.getElementById('latitude');
    const longitudeInput = document.getElementById('longitude');
    const submitButton = document.getElementById('submitButton');

    let baseURL = "https://radar.kma.go.kr/cgi-bin/center/nph-rdr_cmp_img?cmp=HSP&color=C2&qcd=HSO&obs=ECHO&map=HB&size=1100&lat=35.13&lon=129.10&ht=500&color&gis=1&sms=&legend=1&aws=1&gov=KMA&zoom=11.5&typ=1&color=C4&topo=1&wv=0&ht=800&gc=T&gc_itv=50&lonlat=0&center=1&tm=";

    let intervalId;
    let isPlaying = true;
    let preloadedImages = [];
    let speed = parseInt(localStorage.getItem('speed')) || 500; // Default speed in milliseconds or saved value

    latitudeInput.placeholder = '위도(OO.xx)';
    longitudeInput.placeholder = '경도(OOO.xx)';

    async function getInternetTime() {
        const response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Seoul');
        const data = await response.json();
        return new Date(data.datetime);
    }

    function formatDate(date, type = "url") {
        const y = date.getFullYear();
        const m = ('0' + (date.getMonth() + 1)).slice(-2);
        const d = ('0' + date.getDate()).slice(-2);
        const h = ('0' + date.getHours()).slice(-2);
        const min = ('0' + date.getMinutes()).slice(-2);
        const s = ('0' + date.getSeconds()).slice(-2);
        if (type === "url") {
            return `${y}${m}${d}${h}${min}`;
        } else {
            return `${y}.${m}.${d} ${h}:${min}:${s}`;
        }
    }

    async function generateImageURLs() {
        const urls = [];
        const nowKST = await getInternetTime();

        nowKST.setMinutes(Math.floor(nowKST.getMinutes() / 5) * 5);
        nowKST.setSeconds(0);
        nowKST.setMilliseconds(0);

        for (let i = 0; i < 24; i++) {
            const date = new Date(nowKST.getTime() - i * 5 * 60000);
            const formattedDate = formatDate(date);
            urls.push(baseURL + formattedDate);
        }
        return urls.reverse();
    }

    async function updateImages() {
        const images = await generateImageURLs();
        preloadedImages = images.map(url => {
            const img = new Image();
            img.src = url;
            return img;
        });

        // Update the image source based on slider value
        slider.addEventListener('input', function () {
            const index = slider.value - 1;
            image.src = preloadedImages[index].src;
        });

        // Initialize the first image
        image.src = preloadedImages[0].src;

        // Set up the automatic slide show
        startAutoPlay();
    }

    function startAutoPlay() {
        clearInterval(intervalId);
        intervalId = setInterval(() => {
            slider.value = (parseInt(slider.value) % 24) + 1;
            const index = slider.value - 1;
            image.src = preloadedImages[index].src;
        }, speed);
    }

    playPauseButton.addEventListener('click', function () {
        if (isPlaying) {
            clearInterval(intervalId);
            playPauseButton.textContent = '재생';
        } else {
            startAutoPlay();
            playPauseButton.textContent = '정지';
        }
        isPlaying = !isPlaying;
    });

    fasterButton.addEventListener('click', function () {
        if (speed > 100) {
            speed -= 100;
            speedDisplay.textContent = `${(speed / 1000).toFixed(1)} s/frame`;
            localStorage.setItem('speed', speed); // Save speed to localStorage
            if (isPlaying) {
                clearInterval(intervalId);
                startAutoPlay();
            }
        }
    });

    slowerButton.addEventListener('click', function () {
        if (speed < 2000) {
            speed += 100;
            speedDisplay.textContent = `${(speed / 1000).toFixed(1)} s/frame`;
            localStorage.setItem('speed', speed); // Save speed to localStorage
            if (isPlaying) {
                clearInterval(intervalId);
                startAutoPlay();
            }
        }
    });

    submitButton.addEventListener('click', function () {
        const latitude = latitudeInput.value;
        const longitude = longitudeInput.value;

        if (latitude && longitude) {
            baseURL = `https://radar.kma.go.kr/cgi-bin/center/nph-rdr_cmp_img?cmp=HSP&color=C2&qcd=HSO&obs=ECHO&map=HB&size=1100&lat=${latitude}&lon=${longitude}&ht=500&color&gis=1&sms=&legend=1&aws=1&gov=KMA&zoom=11.5&typ=1&color=C4&topo=1&wv=0&ht=800&gc=T&gc_itv=50&lonlat=0&center=1&tm=`;
            localStorage.setItem('latitude', latitude);
            localStorage.setItem('longitude', longitude);
            location.reload();
        } else {
            alert('위도와 경도를 입력하세요.');
        }
    });

    // Load latitude and longitude from localStorage if available
    const savedLatitude = localStorage.getItem('latitude');
    const savedLongitude = localStorage.getItem('longitude');
    if (savedLatitude && savedLongitude) {
        baseURL = `https://radar.kma.go.kr/cgi-bin/center/nph-rdr_cmp_img?cmp=HSP&color=C2&qcd=HSO&obs=ECHO&map=HB&size=1100&lat=${savedLatitude}&lon=${savedLongitude}&ht=500&color&gis=1&sms=&legend=1&aws=1&gov=KMA&zoom=11.5&typ=1&color=C4&topo=1&wv=0&ht=800&gc=T&gc_itv=50&lonlat=0&center=1&tm=`;
    }

    // Initial load
    await updateImages();

    // Display the correct speed on page load
    speedDisplay.textContent = `${(speed / 1000).toFixed(1)} s/frame`;

    // Update last refresh time
    lastRefresh.textContent += formatDate(new Date(), "display");

    // Auto refresh every 5 minutes (300,000 milliseconds)
    setInterval(() => {
        location.reload();
    }, 300000);
});
