
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

function loadContent(user, page) {
    Papa.parse(`https://docs.google.com/spreadsheets/d/e/2PACX-1vR4PmOLTAzRY1Vp-hpUXwFY0LVrLze68gNYJZYI27aNLzglQGgReVV76gqmYoFxLnPQX9X3Wxvxu_gU/pub?gid=0&single=true&output=csv`, {
        download: true,
        header: true,
        complete: function(results) {
            thisPage = results.data;
            displayContent(page);
        }
    });
}

function displayContent(page) {
    if(page == "toc") {
        console.log(thisPage);
        let form = $("<form></form>").attr({
            "id" : "tocform",
            "method": "GET"
        });
        for(let i = 0; i < thisPage.length; i++) {
            let totle = thisPage[i].title.replace(/[^\w\d]/g, '-')
            form.append(`<input type="radio" class="tocItem" id="${totle}" name="contents" value="${totle}">
                <label for="${totle}">${thisPage[i].title}</label><br>`)
        }
        $("#imported-content").append(form);
    } else {
        let html = converter.makeHtml(thisPage);
        $("#imported-content").append(html);
        console.log("displayed");
    }
    
}
