//Utils

export async function get(Url) {
    try {
        console.log("URL" + Url);
        let response = await fetch(Url);
        let json = await response.json();
        console.log("Details " + JSON.stringify(json.title))
        return json;
    } catch (error) {
        console.error(error);
        Alert.alert("Some thing went wrong. Please try again later.");
        Alert.alert(error.message);
    }

}
// For post RAW data use header in application/json
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
        console.log("Details " + JSON.stringify(json.title))
        return json;
    } catch (error) {
        console.error(JSON.stringify(error));
        //Alert.alert("Some thing went wrong. Please try again later.");
        //Alert.alert(error.message);
    }

}

// For form data use header multipart/form-data
export async function postFormData(Url, formData) {
    try {
        console.log("URL" + Url);
        let response = await fetch(
            Url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                body: formData                
            }
        );
        let json = await response.json();
        console.log("Details " + JSON.stringify(json.title))
        return json;
    } catch (error) {
        console.error(error);
        Alert.alert("Some thing went wrong. Please try again later.");
        Alert.alert(error.message);
    }

}
