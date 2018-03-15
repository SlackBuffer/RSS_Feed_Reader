/* 
 * DOM 准备好后执行. $()
 */
$(function() {
    /* 
     * 测试 rss 源 
     */
    describe('RSS Feeds', function() {
        /* 
         * allFeeds 数组已定义且长度不为 0
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* 
         * feed.url 已定义且长度不为 0
         */
        it('URLs are valid', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* 
         * feed.name 已定义且长度不为 0
         */
        it('feed names are valid', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* 
     * 测试菜单
     */
    describe('The menu', function() {
        // 默认不显示菜单
        it('is hidden by default', function() {
            expect($('.menu-hidden')).not.toBe(null);
        });
    });
}());
