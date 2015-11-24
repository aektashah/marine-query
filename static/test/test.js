describe("show sidebar by clicking FILTER", function() {
    var spyEvent;
    var fixture;
    beforeEach(function() {
        loadFixtures("../../../index.html");
        fixture = $("#nav-expander");//[0].outerHTML;
        console.log(fixture);
    });
    it ("should show the sidebar", function() {
        spyEvent = spyOnEvent("#nav-expander", "click");
        $("#nav-expander")[0].click();
        expect("click").toHaveBeenTriggeredOn("#nav-expander");
        expect(spyEvent).toHaveBeenTriggered();
    });
});
/*
describe("sidebar remove", function() {
    var spyEvent;
    
    it("should remove sidebar class", function() {
        $(".sidebar .nav-close").trigger("click");
        expect(".sidebar")
    });
    
}*/
/*
describe("toggle width and margine-length", function() {
    beforeEach(function() {
        $("#nav-expander").trigger("click");
    });
    it ("should set width to 97%", function() {
        console.log($(".bottombar-expanded > nav"));
        expect($('.bottombar-expanded > nav')).toHaveCss({width: '97%'});
    });
});
*/
