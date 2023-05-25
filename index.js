const axios = require("axios")
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let cookie = null;
let json = null;

function logStart() {
    axios.get("https://apis.roblox.com/token-metadata-service/v1/sessions?nextCursor=&desiredLimit=10000", {"headers": {"Cookie": ".ROBLOSECURITY=" + cookie,"User-Agent": "Mozilla/5.0 (X11; Linux i686; rv:102.0) Gecko/20100101 Goanna/5.2 Firefox/102.0 PaleMoon/31.4.2"}})
    .then((res) => {
        if (json !== null) {
            for (var i = 0; i < json.length; i++) {
                if (json[i].lastAccessedIp != res.data.sessions[i].lastAccessedIp && res.data.sessions[i].isCurrentSession !== true) {
                    console.log("LOGGED IP!\nIP: " + res.data.sessions[i].lastAccessedIp)
                }
            }
        }
        json = res.data.sessions
    }).catch((err) => {
        console.log("Cookie is now invalid, exiting.")
        process.exit()
    })

}

rl.question('Input your cookie: ', (answer) => {
    cookie = answer
    console.clear();
    rl.close();
    console.log("Started listening for logins.")
    setInterval(() => {
        logStart()
    }, 2000);
});
