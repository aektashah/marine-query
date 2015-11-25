/**
* Unit test for front end
* go to http://159.203.111.95:5000/test.html to see results
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
    });
});

describe("toggleSidebar()", function() {
    var fixture;
    beforeEach(function() {
        loadFixtures("../../../index.html");
    });
    it ("should toggle", function() {
        toggleSidebar();
        expect($(".sidebar")).toHaveClass("sidebar-expanded");
    });
});
describe("generate()", function() {
    var fixture;
    beforeEach(function() {
        loadFixtures("../../../index.html");
    });
    it ("should addclass bottombar-expanded", function() {
        generate();
        expect($(".bottombar")).toHaveClass("bottombar-expanded");
    });
});

describe("sidebarCollapsed()", function() {
    var fixture;
    beforeEach(function() {
        loadFixtures("../../../index.html");
    });
    it ("should set width to 97%", function() { //aka 692 px
        toggleSidebar();
        generate();
        var initWidth = $(".bottombar-expanded > nav").width();
        var newWidth = initWidth * 0.97;
        sidebarCollapse();
        expect($(".bottombar-expanded > nav")).toHaveCss({width: newWidth + "px"});
    });
});
