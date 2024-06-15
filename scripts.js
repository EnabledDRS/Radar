document.addEventListener('DOMContentLoaded', async function () {
    const regionSelect = document.getElementById('regionSelect');
    const slider = document.getElementById('timeSlider');
    const image = document.getElementById('sliderImage');
    const speedSlider = document.getElementById('speedSlider');
    const speedDisplay = document.getElementById('speedDisplay');
    const playPauseButton = document.getElementById('playPauseButton');

    const regionURLs = {
        nationwide: "https://radar.kma.go.kr/cgi-bin/center/nph-rdr_cmp_img?cmp=HSP&color=C2&qcd=HSO&obs=ECHO&map=HB&size=1000&xp=720&yp=614&ht=700&zoom=2&lonlat=1&gis=1&legend=1&aws=1&gov=KMA&color=C4&wv=1&ht=800&topo=1&gc=T&gc_itv=60&tm=",
        seoul: "https://radar.kma.go.kr/cgi-bin/center/nph-rdr_cmp_img?cmp=HSP&color=C2&qcd=HSO&obs=ECHO&map=HB&size=1000&xp=630&yp=790&ht=700&zoom=4.9&lonlat=1&gis=1&legend=1&aws=1&gov=KMA&color=C4&wv=1&ht=2000&topo=1&gc=T&gc_itv=60&tm=",
        chungcheong: "https://radar.kma.go.kr/cgi-bin/center/nph-rdr_cmp_img?cmp=HSP&color=C2&qcd=HSO&obs=ECHO&map=HB&size=1000&xp=675&yp=680&ht=700&zoom=4.9&lonlat=1&gis=1&legend=1&aws=1&gov=KMA&color=C4&wv=1&ht=2000&topo=1&gc=T&gc_itv=60&tm=",
        honam: "https://radar.kma.go.kr/cgi-bin/center/nph-rdr_cmp_img?cmp=HSP&color=C2&qcd=HSO&obs=ECHO&map=HB&size=1000&xp=630&yp=528&ht=700&zoom=4.9&lonlat=1&gis=1&legend=1&aws=1&gov=KMA&color=C4&wv=1&ht=2000&topo=1&gc=T&gc_itv=60&tm=",
        gyeongnam: "https://radar.kma.go.kr/cgi-bin/center/nph-rdr_cmp_img?cmp=HSP&color=C2&qcd=HSO&obs=ECHO&map=HB&size=1000&xp=790&yp=550&ht=700&zoom=4.9&lonlat=1&gis=1&legend=1&aws=1&gov=KMA&color=C4&wv=1&ht=2000&topo=1&gc=T&gc_itv=60&tm=",
        gyeongbuk: "https://radar.kma.go.kr/cgi-bin/center/nph-rdr_cmp_img?cmp=HSP&color=C2&qcd=HSO&obs=ECHO&map=HB&size=1000&xp=800&yp=660&ht=700&zoom=4.9&lonlat=1&gis=1&legend=1&aws=1&gov=KMA&color=C4&wv=1&ht=2000&topo=1&gc=T&gc_itv=60&tm=",
        gangwon: "https://radar.kma.go.kr/cgi-bin/center/nph-rdr_cmp_img?cmp=HSP&color=C2&qcd=HSO&obs=ECHO&map=HB&size=1000&xp=760&yp=820&ht=700&zoom=4.9&lonlat=1&gis=1&legend=1&aws=1&gov=KMA&color=C4&wv=1&ht=2000&topo=1&gc=T&gc_itv=60&tm=",
        jeju: "https://radar.kma.go.kr/cgi-bin/center/nph-rdr_cmp_img?cmp=HSP&color=C2&qcd=HSO&obs=ECHO&map=HB&size=1000&xp=610&yp=340&ht=700&zoom=4.9&lonlat=1&gis=1&legend=1&aws=1&gov=KMA&color=C4&wv=1&ht=2000&topo=1&gc=T&gc_itv=60&tm="
    };

    let baseURL = regionURLs['nationwide'];
    let intervalId;
    let isPlaying = true;
    let preloadedImages = [];

    async function getInternetTime() {
        const response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Seoul');
        const data = await response.json();
        return new Date(data.datetime);
    }

    function formatDate(date) {
        const y = date.getFullYear();
        const m = ('0' + (date.getMonth() + 1)).slice(-2);
        const d = ('0' + date.getDate()).slice(-2);
        const h = ('0' + date.getHours()).slice(-2);
        const min = ('0' + date.getMinutes()).slice(-2);
        return `${y}${m}${d}${h}${min}`;
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
        const speed = speedSlider.value;
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
            playPauseButton.textContent = 'Play';
        } else {
            startAutoPlay();
            playPauseButton.textContent = 'Pause';
        }
        isPlaying = !isPlaying;
    });

    speedSlider.addEventListener('input', function () {
        const speed = speedSlider.value;
        speedDisplay.textContent = `${(speed / 1000).toFixed(1)} s/frame`;
        if (isPlaying) {
            clearInterval(intervalId);
            startAutoPlay();
        }
    });

    regionSelect.addEventListener('change', function () {
        baseURL = regionURLs[regionSelect.value];
        updateImages();
    });

    // Initial load
    await updateImages();
});
