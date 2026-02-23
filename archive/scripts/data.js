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
        const CId = "carousel" + this.index;
        let cardDiv = $(`<div></div>`).addClass("card insta-card");
        let cSlide = $(`<div></div>`).addClass("carousel slide").attr("id", CId);
        cardDiv.append(cSlide);
        let carouselI = $(`<div></div>`).addClass("carousel-indicators");
        let carouselInner = $(`<div></div>`).addClass("carousel-inner");
        cSlide.append(carouselI, carouselInner);
        let quant = fileData[this.index].count;
        let urls = fileData[this.index].value; 
        for(let i = quant; i > 0; i--) {
            carouselI.append($(`<button></button>`).attr({
                "type": "button",
                "data-bs-target": "#" + CId,
                "data-bs-slide-to": i,
                "aria-label": "Slide " + (i + 1)
            }))
            
            // create button to append
            // create img to append
        }
        carouselI.children().last().addClass("active").attr("aria-current", "true");

        

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
            }
            console.log(iPostSet);
        },
        header: true
    }
)
