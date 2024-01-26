function isValidUrl(url) {
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    return urlRegex.test(url)
}

async function isReachable(url) {
    try {
        const response = await fetch(url)
        return response.ok // Returns true if status code is 200-299
    } catch (error) {
        return false // URL is not reachable or fetch failed
    }
}

export default async function validateUrl(url) {
    if (!isValidUrl(url)) {
        //console.log("Invalid URL format.")
        return false;
    }

    if (!await isReachable(url)) {
        //console.log("URL is not reachable.")
        return false;
    }

    //console.log("URL is valid and reachable.")
    return true;
}