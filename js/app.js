/* 
 * rss2json API 抓取 RSS feeds 得到 JSON 对象
 * Handlebars templating library
 * jQuery
 */

var allFeeds = [{
    name: 'CSS Tricks',
    url: 'http://feeds.feedburner.com/CssTricks'
}, {
    name: 'Codrops',
    url: 'http://feeds2.feedburner.com/tympanus'
}, {
    name: 'UsabilityGeek',
    url: 'http://feeds.feedburner.com/usabilitygeek'
}, {
    name: 'I Love Typography',
    url: 'http://feeds.feedburner.com/ILoveTypography'
}, {
    name: 'Linear Digressions',
    url: 'http://feeds.feedburner.com/udacity-linear-digressions'
}, {
    name: '456 Berea Street',
    url: 'http://feeds.feedburner.com/456bereastreet'
}, {
    name: 'HTML5 doctor',
    url: 'http://feeds2.feedburner.com/html5doctor'
}];

var status;

function init(cb) {
    // 初始化时加载第一个 rss 源
    status = false;
    loadFeed(0, cb);
}

// 加载 rss 源
function loadFeed(id, cb) {
    var feedUrl = allFeeds[id].url;
    var feedName = allFeeds[id].name;

    $.ajax({
        method: "GET",
        url: 'https://api.rss2json.com/v1/api.json',
        data: {
            rss_url: feedUrl
        },
        contentType: "application/json",
        success: function (result, status) {
            var container = $('.feed');
            var title = $('.header-title');

            console.log('ajax result\n', result);
            var entries = result.items;
            var entryTemplate = Handlebars.compile($('.tpl-entry').html());

            // 设置 rss title
            title.html(feedName);
            // 清空之前的条目
            container.empty();
            entries.forEach(function (entry) {
                container.append(entryTemplate(entry));
            });
            status = true;
            if (cb) {
                cb();
            }
        },
        error: function (result, status, err) {
            //run only the callback without attempting to parse result due to error
            if (cb) {
                cb();
            }
        },
        dataType: "json"
    });
}

// $() 函数确保 DOM 构建完成后再执行代码
$(function () {
    init();
    var feedList = $('.feed-list');
    var feedItemTemplate = Handlebars.compile($('.tpl-feed-list-item').html());
    var feedId = 0;

    allFeeds.forEach(function (feed) {
        feed.id = feedId;
        feedList.append(feedItemTemplate(feed));
        feedId++;
    });

    // 点击 feedlist 里的链接后，隐藏菜单，加载 feed 并防止默认的跳转（每个链接都是 <a> 节点，默认行为会跳转）
    feedList.on('click', 'a', function () {
        var item = $(this);
        console.log('item.data(): ', item.data());
        // 给父节点 body 加上 menu-hidden class, 子节点 <div class="slide-menu"> 隐藏生效
        $('body').addClass('menu-hidden');
        loadFeed(item.data('id'));
        return false;
    });

    var menuIcon = $('.menu-icon-link');

    // 菜单开关
    menuIcon.on('click', function () {
        $('body').toggleClass('menu-hidden');
    });
}());