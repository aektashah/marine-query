/**
* Unit test for front end
**/
describe("show sidebar by clicking FILTER", function() {
    var spyEvent;
    var fixture;
    beforeEach(function() {
        loadFixtures("../../../index.html");
    });
    it ("should not have a sidebar-expanded class", function() {
        expect($('.sidebar')).not.toHaveClass("sidebar-expanded");
    });
    it ("should show the sidebar", function() {
        spyEvent = spyOnEvent("#nav-expander", "click");
        fixture = $("#nav-expander");//[0].outerHTML;
        var filterButton = $("#nav-expander")[0];
        filterButton.click();
        expect("click").toHaveBeenTriggeredOn("#nav-expander");
        expect(spyEvent).toHaveBeenTriggered();
        expect($('.sidebar')).toHaveClass("sidebar-expanded");
    });
});
