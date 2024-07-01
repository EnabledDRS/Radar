document.addEventListener('DOMContentLoaded', async function () {
    const slider = document.getElementById('timeSlider');
    const image = document.getElementById('sliderImage');
    const speedDisplay = document.getElementById('speedDisplayContainer');
    const fasterButton = document.getElementById('fasterButton');
    const slowerButton = document.getElementById('slowerButton');
    const playPauseButton = document.getElementById('playPauseButton');
    const timeDisplay = document.getElementById('timeDisplay');
    const lastRefresh = document.getElementById('lastRefresh');
    const latitudeInput = document.getElementById('latitudeInput');
    const longitudeInput = document.getElementById('longitudeInput');
    const zoomInput = document.getElementById('zoomInput');
    const latUpButton = document.getElementById('latUpButton');
    const latDownButton = document.getElementById('latDownButton');
    const lonUpButton = document.getElementById('lonUpButton');
    const lonDownButton = document.getElementById('lonDownButton');
    const zoomUpButton = document.getElementById('zoomUpButton');
    const zoomDownButton = document.getElementById('zoomDownButton');
    const confirmButton = document.getElementById('confirmButton');
    const centerCheckbox = document.getElementById('centerCheckbox');
    const windVectorCheckbox = document.getElementById('windVectorCheckbox');
    const topographyCheckbox = document.getElementById('topographyCheckbox');

    const baseURL = "https://radar.kma.go.kr/cgi-bin/center/nph-rdr_cmp_img?cmp=HSP&color=C4&qcd=HSO&obs=ECHO&map=HB&size=1000&gis=1&legend=1&aws=1&gov=KMA&gc=T&gc_itv=60&lonlat=0";
    let intervalId;
    let preloadedImages = [];
    let speed = parseInt(localStorage.getItem('speed')) || 500; // Default speed in milliseconds or saved value
    let imageTimes = [];
    let center = localStorage.getItem('center') === '1' ? 1 : 0;
    let windVector = localStorage.getItem('windVector') === '1' ? 1 : 0;
    let topo = localStorage.getItem('topo') === '1' ? 1 : 0;
    let isPlaying = localStorage.getItem('isPlaying') !== 'false'; // Default to true if not set

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
            return `${y}${m}${d}${h}${min}${s}`;
        } else {
            return `${y}년 ${m}월 ${d}일 ${h}시 ${min}분`;
        }
    }

    async function generateImageURLs(lat, lon, zoom) {
        const urls = [];
        const nowKST = await getInternetTime();
        const interval = 5;
        nowKST.setMinutes(Math.floor(nowKST.getMinutes() / interval) * interval);
        nowKST.setSeconds(0);
        nowKST.setMilliseconds(0);

        imageTimes = [];

        for (let i = 0; i < 36; i++) {
            const date = new Date(nowKST.getTime() - i * interval * 60000);
            const formattedDate = formatDate(date);
            urls.push(`${baseURL}&lat=${lat.toFixed(2)}&lon=${lon.toFixed(2)}&zoom=${zoom}&ht=1000&center=${center}&wv=${windVector}&topo=${topo}&tm=${formattedDate}`);
            imageTimes.push(date);
        }
        return urls.reverse();
    }

    async function updateImages(lat, lon, zoom) {
        const images = await generateImageURLs(lat, lon, zoom);
        preloadedImages = images.map((url, index) => {
            const img = new Image();
            img.src = url;
            return { img, time: imageTimes[imageTimes.length - 1 - index] };
        });

        slider.max = 36;
        slider.addEventListener('input', function () {
            const index = slider.value - 1;
            image.src = preloadedImages[index].img.src;
            timeDisplay.textContent = formatDate(preloadedImages[index].time, "display");
        });

        image.src = preloadedImages[0].img.src;
        image.style.width = "100%";
        timeDisplay.textContent = formatDate(preloadedImages[0].time, "display");

        if (isPlaying) {
            startAutoPlay();
        }
    }

    function startAutoPlay() {
        clearInterval(intervalId);
        intervalId = setInterval(() => {
            slider.value = (parseInt(slider.value) % 36) + 1;
            const index = slider.value - 1;
            image.src = preloadedImages[index].img.src;
            timeDisplay.textContent = formatDate(preloadedImages[index].time, "display");
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
        localStorage.setItem('isPlaying', isPlaying);
    });

    fasterButton.addEventListener('click', function () {
        if (speed > 100) {
            speed -= 100;
            speedDisplay.textContent = `${(speed / 1000).toFixed(1)} s/frame`;
            localStorage.setItem('speed', speed);
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
            localStorage.setItem('speed', speed);
            if (isPlaying) {
                clearInterval(intervalId);
                startAutoPlay();
            }
        }
    });

    latUpButton.addEventListener('click', function () {
        latitudeInput.stepUp();
        latitudeInput.value = parseFloat(latitudeInput.value).toFixed(2);
    });

    latDownButton.addEventListener('click', function () {
        latitudeInput.stepDown();
        latitudeInput.value = parseFloat(latitudeInput.value).toFixed(2);
    });

    lonUpButton.addEventListener('click', function () {
        longitudeInput.stepUp();
        longitudeInput.value = parseFloat(longitudeInput.value).toFixed(2);
    });

    lonDownButton.addEventListener('click', function () {
        longitudeInput.stepDown();
        longitudeInput.value = parseFloat(longitudeInput.value).toFixed(2);
    });

    zoomUpButton.addEventListener('click', function () {
        zoomInput.stepUp();
    });

    zoomDownButton.addEventListener('click', function () {
        zoomInput.stepDown();
    });

    confirmButton.addEventListener('click', function () {
        const lat = parseFloat(latitudeInput.value);
        const lon = parseFloat(longitudeInput.value);
        const zoom = parseInt(zoomInput.value);
        updateImages(lat, lon, zoom);
    });

    centerCheckbox.addEventListener('change', function () {
        center = centerCheckbox.checked ? 1 : 0;
        localStorage.setItem('center', center);
        const lat = parseFloat(latitudeInput.value);
        const lon = parseFloat(longitudeInput.value);
        const zoom = parseInt(zoomInput.value);
        updateImages(lat, lon, zoom);
    });

    windVectorCheckbox.addEventListener('change', function () {
        windVector = windVectorCheckbox.checked ? 1 : 0;
        localStorage.setItem('windVector', windVector);
        const lat = parseFloat(latitudeInput.value);
        const lon = parseFloat(longitudeInput.value);
        const zoom = parseInt(zoomInput.value);
        updateImages(lat, lon, zoom);
    });

    topographyCheckbox.addEventListener('change', function () {
        topo = topographyCheckbox.checked ? 1 : 0;
        localStorage.setItem('topo', topo);
        const lat = parseFloat(latitudeInput.value);
        const lon = parseFloat(longitudeInput.value);
        const zoom = parseInt(zoomInput.value);
        updateImages(lat, lon, zoom);
    });

    latitudeInput.value = parseFloat(latitudeInput.value).toFixed(2);
    longitudeInput.value = parseFloat(longitudeInput.value).toFixed(2);

    await updateImages(parseFloat(latitudeInput.value), parseFloat(longitudeInput.value), parseInt(zoomInput.value));

    speedDisplay.textContent = `${(speed / 1000).toFixed(1)} s/frame`;

    lastRefresh.textContent += formatDate(new Date(), "display");

    setInterval(() => {
        location.reload();
    }, 300000);
});
