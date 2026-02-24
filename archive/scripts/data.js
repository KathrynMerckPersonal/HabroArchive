
let fileData;
$.getJSON("scripts/insta.json",
    function (data) {
        console.log(data);
        fileData = data;
    }
);

class iPost {
    constructor(i, folder, desc, accessed, posted) {
        this.index = i;
        this.folder = folder;
        this.desc = desc;
        this.accessed = accessed;
        this.posted = posted;
        this.pDate = new Date(posted);
        this.chron = this.pDate.valueOf();
    }

    createCard(){
        const pattern = /mp4$/;
        const CId = "carousel" + this.folder;
        let cardDiv = $(`<div></div>`).addClass("card insta-card");
        
        let quant = fileData[this.index].Count;
        let urls = fileData[this.index].value; 
        if(quant == 1 ) {
            cardDiv.append($("<img>").attr("src", ".." + urls[0]).addClass("card-img-top"));
        } else {
            let cSlide = $(`<div></div>`).addClass("carousel slide card-img-top").attr("id", CId);
            cardDiv.append(cSlide);
            let carouselI = $(`<div></div>`).addClass("carousel-indicators");
            let carouselInner = $(`<div></div>`).addClass("carousel-inner");
            cSlide.append(carouselI, carouselInner);
            for(let i = 0; i < quant; i++) {
                carouselI.append($(`<button></button>`).attr({
                    "type": "button",
                    "data-bs-target": "#" + CId,
                    "data-bs-slide-to": i,
                    "aria-label": "Slide " + (i + 1)
                }));
                let ci = $('<div></div>').addClass("carousel-item");
                if(pattern.test(urls[i])) {
                    ci.append($("<video></video>").attr({
                        "src": ".." + urls[i],
                        "controls": ""
                    }).addClass("d-block w-100 card-img-top"));
                } else {
                    ci.append($("<img>").attr("src", ".." + urls[i]).addClass("d-block w-100 card-img-top"));
                }
                console.log(this.index, this.desc, ".." + urls[i]);
                carouselInner.append(ci);
                // create button to append
                // create img to append
            }
            carouselI.children().first().addClass("active").attr("aria-current", "true");
            carouselInner.children().first().addClass("active");
            cSlide.append($("<button></button>").addClass("carousel-control-prev").attr({
                "type": "button",
                "data-bs-target": "#" + CId,
                "data-bs-slide": "prev"
            }).append($("<span></span>").addClass("carousel-control-prev-icon").attr("aria-hidden", "true"), 
            $("<span></span>").addClass("visually-hidden").append("Previous")),
                $("<button></button>").addClass("carousel-control-next").attr({
                "type": "button",
                "data-bs-target": "#" + CId,
                "data-bs-slide": "next"
            }).append($("<span></span>").addClass("carousel-control-next-icon").attr("aria-hidden", "true"), 
            $("<span></span>").addClass("visually-hidden").append("Next")));
        }
        //end carousel
        let cbody = $("<div></div>").addClass("card-body").append($("<p></p>").addClass("card-text").append(this.desc));
        cardDiv.append(cbody);        
        let wrapper = $("<div></div>").addClass("col").append(cardDiv);
        return wrapper;
        // return cSlide;
    }
}

const iPostSet = [];


Papa.parse(
    `https://docs.google.com/spreadsheets/d/e/2PACX-1vSXzA9ZHAVXMEjfUTS_JBtk5iz7X1i4auwWJHwErdmDYsuYeEcuL8h78sXxxiFvgtYWBWRt8wx8RHl2/pub?gid=0&single=true&output=csv`,
    {
        download: true,
        complete: function(results) {
	        console.log("Parsing complete:", results);
            for(result of results.data) {
                const postItem = new iPost(Number(result.index), result.index, result.desc, result.accessed, result.posted);
                iPostSet.push(postItem);
                $("#post-container").prepend(postItem.createCard());
            }
            console.log(iPostSet);
        },
        header: true
    }
)
