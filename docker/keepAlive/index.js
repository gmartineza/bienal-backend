const services= [
    {serviceName: "votaciones",url:"https://bienal-backend-votaciones.onrender.com/"},
    {serviceName: undefined,url:undefined},
]

async function main() {
    const callback= () => {
        console.log("awakening services");
        
        services.forEach(service => {
            fetch(service.url).catch((error) => {
                console.error(`error while fetching service ${service.serviceName} on url ${service.url}`);
            })
        });
        console.log("Services awakened:"
            + new Date().toLocaleString(
                "en-US", 
                { timeZone: "America/Argentina/Buenos_Aires" }));
    }
    callback()
    setInterval(callback, 1000*60*5)
}

main()