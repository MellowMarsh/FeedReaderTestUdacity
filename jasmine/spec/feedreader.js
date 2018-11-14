/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /*  This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* Test to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /*  Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each feed has a url that is defined and the url is not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });
        /*  Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('feed name is defined and not empty ', function(){
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });
    /*  Test suite named "The menu" */
      describe('The Menu', function () {
        /* Test that ensures the menu element is
         * hidden by default.
         */
         it('Menu element is hidden by default', function() {
               expect($('body').hasClass('menu-hidden')).toBe(true);
           });
        /*  Test that ensures the menu changes
         * visibility when the menu icon is clicked.
         */
         it('Menu element changes when icon is clicked', function() {
               $('.menu-icon-link').click();
               //visible
               expect($('body').hasClass('menu-hidden')).toBe(false);
               //hidden
               $('.menu-icon-link').click();
               expect($('body').hasClass('menu-hidden')).toBe(true);
           });
         });
    // Test suite named "Initial Entries" */
    describe('Initial Entries', function() {
      /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container. */
         beforeEach(function(done) {
             loadFeed(0, function(){
                  done();
              });
          });
           it('feed container has at least one entry', function(){
             var numEntry = document.querySelector(".feed").getElementsByClassName("entry").length;
             expect(numEntry).toBeGreaterThan(0);
           });
         });
    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var firstFeedSel;
        beforeEach(function (done) {
            loadFeed(1,function(){
                firstFeedSel = document.querySelector(".feed").innerHTML;
                loadFeed(2, function() {
                    done();
                });
            });
        });
        it('the content changes by loadFeed()', function () {
            var newFeedSel = document.querySelector(".feed").innerHTML;
            expect(firstFeedSel).toBeDefined();
            expect(newFeedSel).toBeDefined();
            expect(firstFeedSel).not.toBe(newFeedSel);
        });

    });

}());
