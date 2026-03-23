let allDat;
let thisPage;

class Page {
    constructor(data, tags, user, page) {
        this.page = page;
        this.data = data;
        this.tags = tags;
        this.user = user;
    }
}

function loadContent(user) {
    thisPage = Papa.parse(`https://docs.google.com/spreadsheets/d/e/2PACX-1vR4PmOLTAzRY1Vp-hpUXwFY0LVrLze68gNYJZYI27aNLzglQGgReVV76gqmYoFxLnPQX9X3Wxvxu_gU/pub?gid=1436726988&single=true&output=csv`, {
        download: true
    });
}

function displayContent(page) {
    
}