//RestAPIHandler

export async function post(Url, bodyParams) {
    try {
        console.log("URL" + Url);
        let response = await fetch(
            Url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: bodyParams
        }
        );
        let json = await response.json();
        console.log("Details " + JSON.stringify(json))
        return json;
    } catch (error) {
        console.error(JSON.stringify(error));
    }
}

export async function get(Url) {
    try {
        console.log("URL" + Url);
        let response = await fetch(Url);
        let json = await response.json();
        console.log("Details--> " + JSON.stringify(json))
        return json;
    } catch (error) {
        console.error(error);
        Alert.alert("Some thing went wrong. Please try again later.");
        Alert.alert(error.message);
    }

}

function createProperResponse(response) {
    console.log("CREATE PROPER RESPONSE--> " + JSON.stringify(response));
    //console.log(response+"---");

    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]).then(res => ({
        statusCode: res[0],
        data: res[1]
    }));
}


export async function sendPostFormDataRequest(url, body) {
    console.log(url);
    console.log(body);
    let responses = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: body,
    }).then((response) => { return createProperResponse(response) })
        .then((responseJson) => {
            console.log("aurl", responseJson);
            return responseJson;
        })
        .catch((error) => {
            console.log("CATCH ERROR..  -> " + JSON.stringify(error));
            console.error("CATCH ERROR..  -> " + error);
            return error;
        });
    return responses;
}

/*export async function postFormData1(Url, formData) {
    try {
        console.log("URL" + Url);
        let response = await fetch(
            Url, {
            method: 'POST',
            headers: {
                //Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        });
        let json = await response.json();
        console.log("Details " + JSON.stringify(json))
        return json;
    } catch (error) {
        console.error(error);
        Alert.alert("Some thing went wrong. Please try again later.");
        Alert.alert(error.message);
    }
}

    export async function postFormData(url, body) {
        console.log(url);
        console.log(body);
        let responses = await fetch(url, {
            method: 'POST',
            headers: {
                //'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: body,
        }).then((response) => response.json()).then((responseJson) => {
            console.log("aurl", responseJson);
            return responseJson;
        })
            .catch((error) => {
                console.error(error);
                return error;
            });
        return responses;
    }*/




