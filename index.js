const dotenv = require("dotenv");
dotenv.config();
var CronJob = require("cron").CronJob;
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const publicIp = require("public-ip");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let url = "https://api.cloudflare.com/client/v4/zones/";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Authorization"] = "Bearer " + process.env.AUTH;

async function Main() {
    let oldIp = "";
    let newIp = await publicIp.v4({ onlyHttps: true });
    let zones = [];
    await axios
        .get(url)
        .then((res) => {
            for (let i = 0; i < res.data.result.length; i++) {
                zones.push(res.data.result[i].id);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    for (let i = 0; i < zones.length; i++) {
        await axios.get(url + zones[i] + "/dns_records").then((res) => {
            oldIp = res.data.result[0].content;
            if (newIp === oldIp) {
                console.log("IPs has not changed.");
                return;
            } else {
                for (let j = 0; j < res.data.result.length; j++) {
                    if (res.data.result[j].type === "A") {
                        axios.put(
                            url +
                                zones[i] +
                                "/dns_records/" +
                                res.data.result[j].id,
                            {
                                type: "A",
                                name: res.data.result[j].name,
                                content: newIp,
                                ttl: 1,
                                proxied: res.data.result[j].proxied,
                            }
                        );
                    }
                }
            }
        });
    }
}

var job = new CronJob(
    "0 */1 * * * *",
    function () {
        Main();
    },
    null,
    true,
    "America/Vancouver"
);
job.start();
