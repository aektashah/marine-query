describe("show sidebar by clicking FILTER", function() {
    var spyEvent;
    beforeEach(function() {
        load
    });
    it ("should show the sidebar", function(done) {
        spyEvent = spyOnEvent("#nav-expander", "click");
        $("#nav-expander").trigger("click");
        expect("click").toHaveBeenTriggeredOn("#nav-expander");
        expect(spyEvent).toHaveBeenTriggered();
        done();
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
