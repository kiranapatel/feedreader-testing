/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* this tests to make sure that in allfeed object, 
         * url has been defined and it is not empty.
         */
        it('has URL', function() {
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe("");
            })
        });

        /* this tests to make sure that in allfeed object, 
         * name has been defined and it is not empty.
         */
        it('has name', function() {
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe("");
            })
        });
    });


    /* test suite named "The menu" */

    describe('The Menu', function() {

        /* this test ensures that the menu element is
         * hidden by default. jquery's hasClass() method 
         * use to grab class name for test.
         */

        it('hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });        

        /* this test ensures that the menu element change its
         * visibility on click event. true on menu-hidden class or 
         * false on no menu-hidden class in body tag.
        */

        it('change visibility', function(){
           $('.menu-icon-link').click();
                expect($('body').hasClass('menu-hidden')).toBe(false);
           $('.menu-icon-link').click();
                expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    /* test suite named "Initial Entries" */

    describe('Initial Entries', function() {

        /* test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         beforeEach(function(done) {
            loadFeed(0, function(){
                done();
            });    
         });

         // test .entry length to be grater than 0.
         it('should have atleast one entry', function(){
            expect($('.feed.entry').length).toBeGreaterThan(0);
         });

    });

    /* test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* to ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed() is asynchronous. so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         var oldContent;

         beforeEach(function(done) {
            //oldContent
            loadFeed(0, function() {
                //assign contents at index 0 to oldContent
                oldContent = $('.feed').contents();
                //newContent
                loadFeed(1, function(){
                    done();
                });    
            });
        });

        it('content changes when new feed loaded', function(){
            //expectation new content not equal to old content
            expect($('.feed')).not.toEqual(oldContent);
        });
    });
}());
