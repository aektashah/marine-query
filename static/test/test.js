/**
* Unit test for front end
* go to http://159.203.111.95:5000/test.html to see results
**/
describe("Filter button sidebar toggle", function() {
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

/*sidebarCollapse?*/

describe("removeSidebar()", function() {
    var fixture;
    beforeEach(function() {
	loadFixtures("../../../index.html");
    });
    it ("should remove the sidebar", function() {
	toggleSidebar();
	removeSidebar();
	expect($(".sidebar")).not.toHaveClass("sidebar-expanded");
    });
});


describe("bottombarCollapse()", function() {
    var fixture;
    beforeEach(function() {
	loadFixtures("../../../index.html");
    });
    it ("should remove the bottom bar", function() {
	toggleSidebar();
	generate();
	bottombarCollapse();
	expect($(".bottombar")).not.toHaveClass("bottombar-expanded");
    });
});

describe("generate()", function() {
    var fixture;
    beforeEach(function() {
        loadFixtures("../../../index.html");
    });
    it ("should add class bottombar-expanded", function() {
        generate();
        expect($(".bottombar")).toHaveClass("bottombar-expanded");
    });
});

/*initNavgoco*/

describe("bottombarContent()", function() {
    var fixture;
    beforeEach(function() {
	loadFixtures("../../../index.html");
    });
    it ("should toggle between graph and data", function() { 
	expect($('.data')).toHaveCss({display: "inline"});
	bottombarContent();
	expect($('.data')).toHaveCss({display: "none"});
	expect($('.graphs')).toHaveCss({display: "inline"});
	bottombarContent();
	expect($('.data')).toHaveCss({display: "inline"});
	expect($('.graphs')).toHaveCss({display: "none"});
    });
});
