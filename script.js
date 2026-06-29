// =========================
// ELEMENTS
// =========================

const historyList =
document.getElementById("historyList");

const responseBox =
document.getElementById("response");

const statusText =
document.getElementById("status");

const timeText =
document.getElementById("time");

// =========================
// INIT
// =========================

loadHistory();

// =========================
// TABS
// =========================

function showTab(tabName){

    document
        .querySelectorAll(".tab")
        .forEach(tab=>{
            tab.classList.remove("active");
        });

    document
        .querySelectorAll(".tab-content")
        .forEach(tab=>{
            tab.classList.remove("active");
        });

    if(tabName === "headers"){

        document
            .querySelectorAll(".tab")[0]
            .classList.add("active");

        document
            .getElementById("headers-tab")
            .classList.add("active");
    }

    if(tabName === "body"){

        document
            .querySelectorAll(".tab")[1]
            .classList.add("active");

        document
            .getElementById("body-tab")
            .classList.add("active");
    }
}

// =========================
// SEND REQUEST
// =========================

async function sendRequest(){

    const method =
    document
        .getElementById("method")
        .value;

    const url =
    document
        .getElementById("url")
        .value
        .trim();

    if(!url){

        alert("Please enter API URL");

        return;
    }

    let headers = {};

    try{

        const headerText =
        document
            .getElementById("headers")
            .value
            .trim();

        headers =
        headerText
            ? JSON.parse(headerText)
            : {};

    }
    catch{

        alert("Invalid Headers JSON");

        return;
    }

    const options = {
        method,
        headers
    };

    const body =
    document
        .getElementById("body")
        .value
        .trim();

    if(
        method !== "GET" &&
        method !== "DELETE" &&
        body
    ){
        options.body = body;
    }

    responseBox.textContent =
        "Sending request...";

    const start =
        performance.now();

    try{

        const response =
            await fetch(url, options);

        const end =
            performance.now();

        statusText.textContent =
            `Status: ${response.status}`;

        timeText.textContent =
            `Time: ${Math.round(end - start)} ms`;

        const text =
            await response.text();

        try{

            const json =
                JSON.parse(text);

            responseBox.textContent =
                JSON.stringify(
                    json,
                    null,
                    2
                );

        }
        catch{

            responseBox.textContent =
                text;

        }

        saveHistory(
            method,
            url
        );

    }
    catch(error){

        statusText.textContent =
            "Status: Error";

        responseBox.textContent =
            `Request Failed

${error.message}

Possible reason:

• API blocks browser requests (CORS)
• Invalid URL
• Server unavailable
`;
    }
}

// =========================
// COPY RESPONSE
// =========================

function copyResponse(){

    navigator.clipboard.writeText(
        responseBox.textContent
    );

    alert(
        "Response copied"
    );
}

// =========================
// DOWNLOAD RESPONSE
// =========================

function downloadResponse(){

    const blob =
        new Blob(
            [
                responseBox.textContent
            ],
            {
                type:"application/json"
            }
        );

    const a =
        document.createElement("a");

    a.href =
        URL.createObjectURL(blob);

    a.download =
        "response.json";

    document.body.appendChild(a);

    a.click();

    a.remove();
}

// =========================
// HISTORY
// =========================

function saveHistory(
    method,
    url
){

    let history =
        JSON.parse(
            localStorage.getItem(
                "api_history"
            ) || "[]"
        );

    history.unshift({
        method,
        url
    });

    history =
        history.slice(
            0,
            20
        );

    localStorage.setItem(
        "api_history",
        JSON.stringify(
            history
        )
    );

    loadHistory();
}

function loadHistory(){

    const history =
        JSON.parse(
            localStorage.getItem(
                "api_history"
            ) || "[]"
        );

    historyList.innerHTML =
        "";

    history.forEach(item=>{

        const li =
            document.createElement(
                "li"
            );

        li.textContent =
            `${item.method} ${item.url}`;

        li.onclick =
        ()=>{

            document
                .getElementById(
                    "method"
                )
                .value =
                item.method;

            document
                .getElementById(
                    "url"
                )
                .value =
                item.url;
        };

        historyList.appendChild(
            li
        );
    });
}

// =========================
// IMPORT CURL
// =========================

function importCurl(){

    document
        .getElementById(
            "curlDrawer"
        )
        .classList
        .add("open");
}

function closeCurlDrawer(){

    document
        .getElementById(
            "curlDrawer"
        )
        .classList
        .remove("open");
}

function parseCurl(){

    const curl =
        document
            .getElementById(
                "curlInput"
            )
            .value
            .trim();

    if(!curl){

        alert(
            "Paste a cURL command"
        );

        return;
    }

    // METHOD

    const methodMatch =
        curl.match(
            /-X\s+(\w+)/i
        );

    if(methodMatch){

        document
            .getElementById(
                "method"
            )
            .value =
            methodMatch[1]
            .toUpperCase();
    }

    // URL

    const urlMatch =
        curl.match(
            /https?:\/\/[^\s"']+/i
        );

    if(urlMatch){

        document
            .getElementById(
                "url"
            )
            .value =
            urlMatch[0];
    }

    // HEADERS

    const headers = {};

    const headerMatches =
        [
            ...curl.matchAll(
                /-H\s+["']([^"']+)["']/g
            )
        ];

    headerMatches.forEach(
        match=>{

        const line =
            match[1];

        const idx =
            line.indexOf(":");

        if(idx > -1){

            const key =
                line
                .substring(
                    0,
                    idx
                )
                .trim();

            const value =
                line
                .substring(
                    idx + 1
                )
                .trim();

            headers[key] =
                value;
        }

    });

    document
        .getElementById(
            "headers"
        )
        .value =
        JSON.stringify(
            headers,
            null,
            2
        );

    // BODY

    const bodyMatch =
        curl.match(
            /-d\s+['"]([\s\S]*?)['"]/
        );

    if(bodyMatch){

        document
            .getElementById(
                "body"
            )
            .value =
            bodyMatch[1];
    }

    closeCurlDrawer();

    alert(
        "cURL imported"
    );
}

// =========================
// EXPORT CURL
// =========================

function exportCurl(){

    const method =
        document
            .getElementById(
                "method"
            )
            .value;

    const url =
        document
            .getElementById(
                "url"
            )
            .value;

    let curl =
        `curl -X ${method} "${url}"`;

    try{

        const headers =
            JSON.parse(
                document
                .getElementById(
                    "headers"
                )
                .value || "{}"
            );

        Object
            .entries(
                headers
            )
            .forEach(
            ([k,v])=>{

            curl +=
`\ 
-H "${k}: ${v}"`;

        });

    }catch{}

    const body =
        document
            .getElementById(
                "body"
            )
            .value
            .trim();

    if(body){

        curl +=
`\ 
-d '${body}'`;
    }

    navigator
        .clipboard
        .writeText(
            curl
        );

    alert(
        "cURL copied to clipboard"
    );
}