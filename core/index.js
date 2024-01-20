import welcome from "./welcome.js";
import runner from "./runner.js";
import detect from "./detect.js";


const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

export {
    welcome,
    runner,
    detect,
    sleep
}