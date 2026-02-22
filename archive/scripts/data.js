class iPost {
    constructor(i, desc, accessed, posted) {
        this.i = i;
        this.desc = desc;
        this.accessed = accessed;
        this.posted = posted;
        this.pDate = new Date(posted);
        this.chron = this.pDate.valueOf();
    }
}


Papa.parse(
    `https://docs.google.com/spreadsheets/d/e/2PACX-1vSXzA9ZHAVXMEjfUTS_JBtk5iz7X1i4auwWJHwErdmDYsuYeEcuL8h78sXxxiFvgtYWBWRt8wx8RHl2/pub?gid=0&single=true&output=csv`,
    {
        download: true,
        complete: function(results) {
	        console.log("Parsing complete:", results);
        },
        header: true
    }
)