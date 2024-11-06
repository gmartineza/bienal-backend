const servicesUrls= [
    process.env.SERVICE_GESTION_ESCULTORES_URL,
    process.env.SERVICE_GESTION_ESCULTURAS_URL,
    process.env.SERVICE_GESTION_EVENTOS_URL,
    process.env.SERVICE_AUTENTICACION_URL,
    process.env.SERVICE_REGISTRO_VOTOS_URL,
    process.env.SERVICE_GENERADOR_QR_URL,
    process.env.API_GATEWAY_URL
]
console.log('Services to wake up:');
servicesUrls.forEach(url => console.log(url));

/**
 * function that "slaps" the services so that Render doesnt shut down the services by inactivity
 * by fetching to every service Render´s url
 * 
 * If not used, services will take up to 1 minute to activate again
 * @param {Array<string>} servicesUrls Array with every url to fetch
 */
function slapServices(servicesUrls) {
    servicesUrls.forEach(url => {
        fetch(url)
        .then(() => console.log(`Slapped succesfully: ${url}`))
        .catch(() => console.error(`Error slapping: ${url}`))
    });
}

/**
 * Slaps all the sevices in intervals set by the parameters
 * @param {number} intervalsMinutes Interval in minutes where it will execute
 * @param {number} intervalVariationMinutes Variation in minutes that will randomly change between this value and 0
 */
function activateInterval(intervalsMinutes, intervalVariationMinutes) {
    const minutesMilis= 60 * 1000;
    setInterval(() => setTimeout(slapServices
            ,minutesMilis * (Math.random() * intervalVariationMinutes * 2))
        , minutesMilis * intervalsMinutes - intervalVariationMinutes,
        servicesUrls) // parameter for slapServices   
}

module.exports= activateInterval