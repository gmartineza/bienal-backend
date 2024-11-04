const url = process.env.SERVICE_RENDER_URL; // Render URL to be set
const interval = 1000 * 60 * process.env.RENDER_RELOAD_INTERVAL_MINUTES; // Interval to be set in minutes

//Reloader Function
function reloadWebsite() {
  fetch(url)
    .then(response => {
      console.log(`Reloaded at 
        ${new Date().toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" })}
        : Status Code ${response.status}`);
    })
    .catch(error => {
      console.error(`Error reloading at 
        ${new Date().toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" })}
        :`, error.message);
    });
}

setInterval(reloadWebsite, interval);