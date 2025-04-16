export default class SaarathiBazaar {

    static async getCoordinates(id, referenceName) {

        const response = await fetch(`https://prod-vrt.saarathi.ai/execution-sync-engine/config/fetch/all/config?appId=77101171015502295635048&deploymentId=6169`, {
            method: "GET",
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI0MGIwOTM0ZC0zM2IyLTQ1MmItOGFmNi00MmM3MDc3ZmFmNWEiLCJzdWIiOiJvMTR4ZURYWG0vTEFhNlEzY2h2TUQ5cVVVT1FzVGc3ODZnTkRqSHJ3VTQyU1NzeVVtckxYU0k3aWpOMGgwdlp6MENHcHI0RDZoNkRpTjBpZW1lZ2M3QTg3c3ViU1BvajFITFRpamFJampmVXBhaDJOOVVvdkpGMzdMVzkyWmh4b2xvQXBHaGhTK2ptK0dVUlZUZ3I2Z1ZwbzZtdkdMV3QxblR6aFdVcXhPa3YvSVJkcjIvbUZocFp1bEt5R3NUaGciLCJpYXQiOjE3NDIyNTM4NDQsImV4cCI6MTc0MjM0MDI0NH0.zAB0uDbJyyrBOvlPCLrF68lTy6vMM9IhdLF9YM-SF9oVvZU1uwDVm14XvIO_IEd1-lSZJXDGxujZjYWQ8d9enQ",
                Requestid: "220051687502638467541017710117101550229563504899df28bd1a--83818032025210819612",
                Clientid: "22005168750263846754101~77101171015502295635048",
                "Content-Type": "application/json; charset=utf-8",
                "security-version": "2"
            },
        });

        const parsedData = await response.json();
        let pages = parsedData.response.Page;
        let elements;
        let x = 0;
        let y = 0;
        let config;
        for (let i = 0; i < pages.length; i++) {
            if (pages[i].id == id) {
                config = JSON.parse(pages[i].config);
                elements = config.children;
                for (let o = 0; o < elements.length; o++) {
                    if (elements[o].subType == "Row") {
                        for (let n = 0; n < elements[o].children.length; n++) {
                            if (elements[o].children[n].properties.referenceName == referenceName) {
                                x = elements[o].children[n].x;
                                y = elements[o].children[n].y;
                            }
                        }
                    }
                    console.log(elements[o].properties.referenceName)
                    if (elements[o].properties.referenceName == referenceName) {
                        x = elements[o].x;
                        y = elements[o].y;
                    }
                }
            }
        }
        console.log(`${referenceName} - x: ${x}, y: ${y}`)
        return { "x": x, "y": y };
    }

}