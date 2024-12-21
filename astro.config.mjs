import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import pagefind from "astro-pagefind";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import remarkSectionize from "remark-sectionize";
import rehypePluginMoveIdToSection from "./src/rehype-sectionize";

// https://astro.build/config
export default defineConfig({
  site: "https://wiki.vocadb.net/",
  build: {
    format: "file",
  },
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
    mdx({
      remarkPlugins: [remarkSectionize],
      rehypePlugins: [rehypePluginMoveIdToSection],
    }),
    pagefind(),
  ],
  redirects: {
    "/wiki/62": "/docs/guidelines/merging-entries",
    "/wiki/62/merging-entries": "/docs/guidelines/merging-entries",
    "/wiki/85": "/docs/albums/album-entry-creation",
    "/wiki/85/album-entry-creation": "/docs/albums/album-entry-creation",
    "/wiki/86": "/docs/albums/album-entry-editing",
    "/wiki/86/album-entry-editing": "/docs/albums/album-entry-editing",
    "/wiki/87": "/docs/albums/album-entry-page",
    "/wiki/87/album-entry-page": "/docs/albums/album-entry-page",
    "/wiki/12":
      "/docs/albums/album-track-format-strings-for-the-custom-csv-export",
    "/wiki/12/album-track-format-strings-for-the-custom-csv-export":
      "/docs/albums/album-track-format-strings-for-the-custom-csv-export",
    "/wiki/8": "/docs/albums/album-types-and-artist-participation",
    "/wiki/8/album-types-and-artist-participation":
      "/docs/albums/album-types-and-artist-participation",
    "/wiki/55": "/docs/albums",
    "/wiki/55/albums": "/docs/albums",
    "/wiki/82": "/docs/artists/artist-entry-creation",
    "/wiki/82/artist-entry-creation": "/docs/artists/artist-entry-creation",
    "/wiki/83": "/docs/artists/artist-entry-editing",
    "/wiki/83/artist-entry-editing": "/docs/artists/artist-entry-editing",
    "/wiki/84": "/docs/artists/artist-entry-page",
    "/wiki/84/artist-entry-page": "/docs/artists/artist-entry-page",
    "/wiki/21": "/docs/songs/song-entry-editing#tab-artists",
    "/wiki/21/artist-roles": "/docs/songs/song-entry-editing#tab-artists",
    "/wiki/23": "/docs/artists/artist-types",
    "/wiki/23/artist-types": "/docs/artists/artist-types",
    "/wiki/40": "/docs/artists/artist-verification",
    "/wiki/40/artist-verification": "/docs/artist/artist-verification",
    "/wiki/56": "/docs/artists",
    "/wiki/56/artists": "/docs/artists",
    "/wiki/79": "/docs/other-guidelines/choosing-the-correct-voicebank-credit",
    "/wiki/79/choosing-the-correct-voicebank-credit":
      "/docs/other-guidelines/choosing-the-correct-voicebank-credit",
    "/wiki/41": "/docs/artists/choosing-the-main-picture-for-artist-entries",
    "/wiki/41/choosing-the-main-picture-for-artist-entries":
      "/docs/artists/choosing-the-main-picture-for-artist-entries",
    "/wiki/59": "/docs/other-guidelines/content-policy",
    "/wiki/59/content-policy": "/docs/other-guidelines/content-policy",
    "/wiki/54": "/docs/other-guidelines/content-removal-guidelines",
    "/wiki/54/content-removal-guidelines":
      "/docs/other-guidelines/content-removal-guidelines",
    "/wiki/47": "/docs/songs/song-entry-editing#criteria-for-approving-songs",
    "/wiki/47/criteria-for-approving-songs":
      "/docs/songs/song-entry-editing#criteria-for-approving-songs",
    "/wiki/78": "/docs/pinned/discussion-rules",
    "/wiki/78/discussion-rules": "/docs/pinned/discussion-rules",
    "/wiki/81": "/docs/other-guidelines/entry-names-and-aliases",
    "/wiki/81/entry-names-and-aliases":
      "/docs/other-guidelines/entry-names-and-aliases",
    "/wiki/58": "/docs/pinned/entry-reports",
    "/wiki/58/entry-reports": "/docs/pinned/entry-reports",
    "/wiki/36": "/docs/secondary-entry-types/events",
    "/wiki/36/events": "/docs/secondary-entry-types/events",
    "/wiki/5": "/docs/other-guidelines/external-links",
    "/wiki/5/external-links": "/docs/other-guidelines/external-links",
    "/wiki/26": "/docs/artists/forbidden-artists",
    "/wiki/26/forbidden-artists": "/docs/artists/forbidden-artists",
    "/wiki/29": "/docs/footer/license",
    "/wiki/29/license": "/docs/footer/license",
    "/wiki/53": "/docs/other-guidelines/management-guidelines",
    "/wiki/53/management-guidelines-golden-rules":
      "/docs/other-guidelines/management-guidelines",
    "/wiki/31": "/docs/other-guidelines/supported-streaming-services",
    "/wiki/31/media-video-services-supported-by-vocadb":
      "/docs/other-guidelines/supported-streaming-services",
    "/wiki/46": "/docs/other-guidelines/merging-entries",
    "/wiki/46/merging-entries": "/docs/other-guidelines/merging-entries",
    "/wiki/50": "/docs/footer/privacy-and-cookie-policy",
    "/wiki/50/privacy-and-cookie-policy":
      "/docs/footer/privacy-and-cookie-policy",
    "/wiki/32": "/docs/songs/song-entry-editing#pv-types",
    "/wiki/32/pv-types": "/docs/songs/song-entry-editing#pv-types",
    "/wiki/60": "/docs/pinned/quick-guide-for-new-editors",
    "/wiki/60/quick-guide-for-new-editors":
      "/docs/pinned/quick-guide-for-new-editors",
    "/wiki/1": "/docs/other-guidelines/romanization-guidelines",
    "/wiki/1/romanization-guidelines":
      "/docs/other-guideliness/romanization-guidelines",
    "/wiki/20": "/docs/other-guidelines/romanization-walkthrough",
    "/wiki/20/romanization-walkthrough":
      "/docs/other-guidelines/romanization-walkthrough",
    "/wiki/91": "/docs/pinned/rule-changelog",
    "/wiki/91/ruleguideline-changelog": "/docs/pinned/rule-changelog",
    "/wiki/67": "/docs/documentation/search-terms-cheat-sheet",
    "/wiki/67/search": "/docs/documentation/search-terms-cheat-sheet",
    "/wiki/33": "/docs/documentation/search-terms-cheat-sheet",
    "/wiki/33/search-terms-cheat-sheet":
      "/docs/documentation/search-terms-cheat-sheet",
    "/wiki/37": "/docs/documentation/services-that-make-use-of-vocadb-apis",
    "/wiki/37/services-that-make-use-of-vocadb-apis":
      "/docs/documentation/services-that-make-use-of-vocadb-apis",
    "/wiki/88": "/docs/songs/song-entry-creation",
    "/wiki/88/song-entry-creation": "/docs/songs/song-entry-creation",
    "/wiki/89": "/docs/songs/song-entry-editing",
    "/wiki/89/song-entry-editing": "/docs/songs/song-entry-editing",
    "/wiki/90": "/docs/songs/song-entry-page",
    "/wiki/90/song-entry-page": "/docs/songs/song-entry-page",
    "/wiki/24": "/docs/secondary-entry-types/song-lists",
    "/wiki/24/song-lists": "/docs/secondary-entry-types/song-lists",
    "/wiki/6": "/docs/songs/song-entry-editing/#song-type",
    "/wiki/6/song-types": "/docs/songs/song-entry-editing/#song-type",
    "/wiki/57": "/docs/songs",
    "/wiki/57/songs": "/docs/songs",
    "/wiki/44": "/docs/footer/staff-roles",
    "/wiki/44/staff-roles": "/docs/footer/staff-roles",
    "/wiki/28": "/docs/secondary-entry-types/tags",
    "/wiki/28/tags": "/docs/secondary-entry-types/tags",
    "/wiki/52": "/docs/footer/terms-of-service",
    "/wiki/52/terms-of-service": "/docs/footer/terms-of-service",
    "/wiki/49": "/docs/touhoudb/touhoudb---general-guidelines",
    "/wiki/49/touhoudb-general-guidelines":
      "/docs/touhoudb/touhoudb---general-guidelines",
    "/wiki/48": "/docs/touhoudb/touhoudb-what-is-it-for",
    "/wiki/48/touhoudb-what-is-it-for":
      "/docs/touhoudb/touhoudb-what-is-it-for",
    "/wiki/10": "/docs/documentation/translating-vocadb",
    "/wiki/10/translating-vocadb": "/docs/documentation/translating-vocadb",
    "/wiki/35": "/docs/documentation/trusted-users",
    "/wiki/35/trusted-users": "/docs/documentation/trusted-users",
    "/wiki/9": "/docs/other/tutorial-for-5sing",
    "/wiki/9/tutorial-for-5sing": "/docs/other/tutorial-for-5sing",
    "/wiki/11": "/docs/other/useful-related-informational-sites",
    "/wiki/11/useful-related-informational-sites":
      "/docs/other/useful-related-informational-sites",
    "/wiki/27": "/docs/documentation/user-groups",
    "/wiki/27/user-groups": "/docs/documentation/user-groups",
    "/wiki/16": "/docs/utaitedb/utaitedb-albums",
    "/wiki/16/utaitedb-albums": "/docs/utaitedb/utaitedb-albums",
    "/wiki/15": "/docs/utaitedb/utaitedb-artists",
    "/wiki/15/utaitedb-artists": "/docs/utaitedb/utaitedb-artists",
    "/wiki/14": "/docs/utaitedb/utaitedb-general-guidelines",
    "/wiki/14/utaitedb-general-guidelines":
      "/docs/utaitedb/utaitedb-general-guidelines",
    "/wiki/17": "/docs/utaitedb/utaitedb-songs",
    "/wiki/17/utaitedb-songs": "/docs/utaitedb/utaitedb-songs",
    "/wiki/76": "/docs/utaitedb/utaitedb-what-is-it-for",
    "/wiki/76/utaitedb-what-is-it-for":
      "/docs/utaitedb/utaitedb-what-is-it-for",
    "/wiki/34": "/docs/pinned/vocadb-how-to-help",
    "/wiki/34/vocadb-how-to-help": "/docs/pinned/vocadb-how-to-help",
    "/wiki/13": "/docs/footer/vocadb-what-is-it-for",
    "/wiki/13/vocadb-what-is-it-for": "/docs/footer/vocadb-what-is-it-for",
    "/wiki/3": "/docs/documentation/vocadb-api-and-embeds",
    "/wiki/3/vocadb-api-and-embeds":
      "/docs/documentation/vocadb-api-and-embeds",
    "/wiki/77": "/docs/documentation/vocadb-changelog",
    "/wiki/77/vocadb-changelog": "/docs/documentation/vocadb-changelog",
    "/wiki/22": "/docs/documentation/vocadb-domains-and-login-process",
    "/wiki/22/vocadb-domains-login-process":
      "/docs/documentation/vocadb-domains-and-login-process",
    "/wiki/39": "/docs/pinned/vocadb-editing-faq",
    "/wiki/39/vocadb-editing-faq": "/docs/pinned/vocadb-editing-faq",
    "/wiki/51": "/docs/documentation/vocadb-feature-requests",
    "/wiki/51/vocadb-feature-requests":
      "/docs/documentation/vocadb-feature-requests",
    "/wiki/25": "/docs/documentation/vocadb-features",
    "/wiki/25/vocadb-features": "/docs/documentation/vocadb-features",
    "/wiki/63": "/docs/chinese/vocadb-guidelines-chinese",
    "/wiki/63/vocadb-guidelines-中文chinese-translation":
      "/docs/chinese/vocadb-guidelines-chinese",
    "/wiki/65": "/docs/documentation/vocadb-partner-websites",
    "/wiki/65/vocadb-partner-websites":
      "/docs/documentation/vocadb-partner-websites",
    "/wiki/2": "/docs/starting/vocadb-wiki",
    "/wiki/2/vocadb-wiki": "/docs/starting/vocadb-wiki",
    "/wiki/74": "/docs/chinese/vocadb-wiki-chinese",
    "/wiki/74/vocadb-wiki-中文": "/docs/chinese/vocadb-wiki-chinese",
    "/wiki/61": "/docs/japanese/vocadb-wiki-japanese",
    "/wiki/61/vocadb-wiki-日本語": "/docs/japanese/vocadb-wiki-japanese",
    "/wiki/30": "/docs/documentation/vocadbs-history",
    "/wiki/30/vocadbs-history": "/docs/documentation/vocadbs-history",
    "/wiki/72": "/docs/documentation/vocadbs-history-in-pictures",
    "/wiki/72/vocadbs-history-in-pictures":
      "/docs/documentation/vocadbs-history-in-pictures",
    "/wiki/73": "/docs/japanese/artist-verification-japanese",
    "/wiki/73/アーティストの本人確認":
      "/docs/japanese/artist-verification-japanese",
    "/wiki/75": "/docs/chinese/artist-verification-chinese",
    "/wiki/75/艺术家验证": "/docs/chinese/artist-verification-chinese",
    "/docs/documentation/vocadb-help-wanted": "/docs/pinned/vocadb-how-to-help"
  },
});
