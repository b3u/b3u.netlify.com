/**
 * JSON feed for https://binyam.in/micro
 * @see https://jsonfeed.org/version/1.1 (docs)
 */

// Note: If necessary (size>=1mb), implement pagination

class Feed {
    data() {
        return {
            permalink: "/feeds/micro.json",
            eleventyExcludeFromCollections: true
        }
    }

    render(data) {
        return JSON.stringify({
            version: "https://jsonfeed.org/version/1.1",
            title: "Binyamin Green (microblog)",
            home_page_url: "https://binyam.in/c/micro",
            feed_url: "https://binyam.in/feeds/micro.json",
            description: data.meta.desc,
            icon: "https://binyam.in/assets/logo.png",
            favicon: "https://binyam.in/assets/logo.png",
            language: "en-US",
            authors: [
                {
                    name: data.meta.author.name,
                    url: data.meta.baseUrl,
                    avatar: "https://binyam.in/assets/img/profile/profile@128.jpeg"
                }
            ],
            items: data.collections.micro.map(p => ({
                id: this.absolute_url(p.url),
                url: this.absolute_url(p.url),
                title: p.data.title,
                content_html: this.escape_once(p.templateContent),
                date_published: p.data.date
            }))
        }, null, 4);
    }
}



module.exports = Feed;
