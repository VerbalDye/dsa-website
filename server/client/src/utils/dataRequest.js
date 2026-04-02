let isJSON = function (text) {
    if (typeof text !== "string") {
        return false;
    }
    try {
        JSON.parse(text);
        return true;
    } catch (error) {
        return false;
    }
}

let dataRequest = async function (url, method, body, options) {
    let fetchOptions = { method: method };
    if (body) {
        if (isJSON(body)) {
            fetchOptions.body = body;
            fetchOptions.headers = { "Content-Type": "application/json" }
        } else {
            fetchOptions.body = body;
            fetchOptions.headers = { "Content-Type": "multipart/form-data" }
        }
    }
    return fetch(url, fetchOptions)
        .then(response => {
            if (response.redirected) {
                window.location.assign(response.url);
                return
            }
            if (options && options.statusOnly) {
                return { status: response.status };
            } else {
                if (response.ok) {
                    if (response.status == 200) {
                        return response.json()
                            .then(data => {
                                return data;
                            })
                    } else {
                        return response;
                    }
                } else {
                    // Error Handling
                    let html = "Error Code: " + response.status + "\n" + response.responseText;
                    window.alert(html);
                    return;
                }
            }
        }).catch(function (error) {
            // Informs user of failure
            let html = "We appear to be having trouble reaching the Database. Check your connection and try again. \n" + error;
            window.alert(html);
            return;
        });
}

export default dataRequest;