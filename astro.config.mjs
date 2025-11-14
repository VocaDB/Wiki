import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import pagefind from "astro-pagefind";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import remarkSectionize from "remark-sectionize";
import rehypePluginMoveIdToSection from "./src/rehype-sectionize";
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic';

// https://astro.build/config
export default defineConfig({
  site: "https://wiki.vocadb.net/",
  build: {
    format: "file",
  },
  experimental: {
    contentIntellisense: true,
  },
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
    mdx({
      remarkPlugins: [remarkSectionize],
      rehypePlugins: [rehypeHeadingIds,
        [rehypeAutolinkHeadings, {
          behavior: 'wrap',
          content: /** @type {Array<ElementContent>} */ (
            fromHtmlIsomorphic(
              '<svg class="inline-block h-4 w-4 opacity-0 group-hover:opacity-100 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',
              { fragment: true }
            ).children
          ),
          properties: {
            class: 'color-[unset] font-unset no-underline group'
          }
        }],
        rehypePluginMoveIdToSection
      ],
    }),
    pagefind(),
  ],
  redirects: {

    "/rules/corresponding-primary-name": "/rules/matching-primary-name",

    "/rules/matching-language": "/rules/matching-song-language",

    "/rules/link-categories.mdx": "rules/correct-link-category",
    "/docs/mentioned-tags": "/rules/table",

    "/rules/song-content-policy-song-source-required": "/rules/song-source-required",
    "/rules/song-content-policy-no-wips": "/rules/no-wips",
    "/rules/song-content-policy-no-ai-generated-songs": "/rules/no-ai-generated-songs",
    "/rules/song-content-policy-no-out-of-scope-song-entries": "/rules/no-out-of-scope-song-entries",
    "/rules/song-content-policy-no-song-entries-by-forbidden-artists": "/rules/no-song-entries-by-forbidden-artists",
    "/rules/song-content-policy-song-source-required": "/rules/song-source-required",

    "/docs/rule-reference": "/rules",
    "/docs/pinned/rule-reference": "/rules",

    "/docs/documentation/vocadb-changelog": "/docs/website-changelog",
    "/docs/documentation/website-changelog": "/docs/website-changelog",

    "/docs/documentation/vocadb-help-wanted": "/docs/vocadb-how-to-help",
    "/docs/pinned/vocadb-how-to-help": "/docs/vocadb-how-to-help",

    "/docs/guidelines/merging-entries": "/docs/merging-entries",

    "/docs/development/development-environment-linux": "/docs/development-environment-linux",
    "/docs/development/development-environment-windows": "/docs/development-environment-windows",
    "/docs/development/front-end-only-development-environment": "/docs/front-end-only-development-environment",

    "/docs/development/public-api": "/docs/public-api",
    "/docs/development/repository-structure": "/docs/repository-structure",

    "/docs/required-entry-fields": "/rules",

    "/wiki/1": "/docs/romanization-guidelines",
    "/wiki/1/romanization-guidelines": "/docs/romanization-guidelines",
    "/docs/other-guidelines/romanization-guidelines": "/docs/romanization-guidelines",

    "/wiki/2": "/",
    "/wiki/2/vocadb-wiki": "/",
    "/docs/starting/vocadb-wiki": "/",

    "/wiki/3": "/docs/vocadb-api-and-embeds",
    "/wiki/3/vocadb-api-and-embeds": "/docs/vocadb-api-and-embeds",
    "/docs/documentation/vocadb-api-and-embeds": "/docs/vocadb-api-and-embeds",

    "/wiki/5": "/docs/external-links",
    "/wiki/5/external-links": "/docs/external-links",
    "/docs/other-guidelines/external-links": "/docs/external-links",

    "/wiki/6": "/docs/songs#song-type",
    "/wiki/6/song-types": "/docs/songs#song-type",

    "/wiki/8": "/docs/album-types-and-artist-participation",
    "/wiki/8/album-types-and-artist-participation": "/docs/album-types-and-artist-participation",
    "/docs/albums/album-types-and-artist-participation": "/docs/album-types-and-artist-participation",

    "/wiki/9": "/docs/tutorial-for-5sing",
    "/wiki/9/tutorial-for-5sing": "/docs/tutorial-for-5sing",
    "/docs/other/tutorial-for-5sing": "/docs/tutorial-for-5sing",

    "/wiki/10": "/docs/translating-vocadb",
    "/wiki/10/translating-vocadb": "/docs/translating-vocadb",
    "/docs/documentation/translating-vocadb": "/docs/translating-vocadb",

    "/wiki/11": "/docs/useful-related-informational-sites",
    "/wiki/11/useful-related-informational-sites": "/docs/useful-related-informational-sites",
    "/docs/other/useful-related-informational-sites": "/docs/useful-related-informational-sites",

    "/wiki/12": "/docs/album-track-format-strings-for-the-custom-csv-export",
    "/wiki/12/album-track-format-strings-for-the-custom-csv-export": "/docs/album-track-format-strings-for-the-custom-csv-export",
    "/docs/albums/album-track-format-strings-for-the-custom-csv-export": "/docs/album-track-format-strings-for-the-custom-csv-export",

    "/wiki/13": "/docs/vocadb-what-is-it-for",
    "/wiki/13/vocadb-what-is-it-for": "/docs/vocadb-what-is-it-for",
    "/docs/footer/vocadb-what-is-it-for": "/docs/vocadb-what-is-it-for",

    "/wiki/14": "/docs/utaitedb-general-guidelines",
    "/wiki/14/utaitedb-general-guidelines": "/docs/utaitedb-general-guidelines",
    "/docs/utaitedb/utaitedb-general-guidelines": "/docs/utaitedb-general-guidelines",

    "/wiki/15": "/docs/utaitedb-artists",
    "/wiki/15/utaitedb-artists": "/docs/utaitedb-artists",
    "/docs/utaitedb/utaitedb-artists": "/docs/utaitedb-artists",

    "/wiki/16": "/docs/utaitedb-albums",
    "/wiki/16/utaitedb-albums": "/docs/utaitedb-albums",
    "/docs/utaitedb/utaitedb-albums": "/docs/utaitedb-albums",

    "/wiki/17": "/docs/utaitedb-songs",
    "/wiki/17/utaitedb-songs": "/docs/utaitedb-songs",
    "/docs/utaitedb/utaitedb-songs": "/docs/utaitedb-songs",

    "/wiki/20": "/docs/romanization-walkthrough",
    "/wiki/20/romanization-walkthrough": "/docs/romanization-walkthrough",
    "/docs/other-guidelines/romanization-walkthrough": "/docs/romanization-walkthrough",

    "/wiki/21": "/docs/song-entry-editing#tab-artists",
    "/wiki/21/artist-roles": "/docs/song-entry-editing#tab-artists",

    "/wiki/22": "/docs/vocadb-domains-and-login-process",
    "/wiki/22/vocadb-domains-login-process": "/docs/vocadb-domains-and-login-process",
    "/docs/documentation/vocadb-domains-and-login-process": "/docs/vocadb-domains-and-login-process",

    "/wiki/23": "/docs/artist-types",
    "/wiki/23/artist-types": "/docs/artist-types",
    "/docs/artists/artist-types": "/docs/artist-types",

    "/wiki/24": "/docs/song-lists",
    "/wiki/24/song-lists": "/docs/song-lists",
    "/docs/secondary-entry-types/song-lists": "/docs/song-lists",

    "/wiki/25": "/docs/vocadb-features",
    "/wiki/25/vocadb-features": "/docs/vocadb-features",
    "/docs/documentation/vocadb-features": "/docs/vocadb-features",

    "/wiki/26": "/docs/forbidden-artists",
    "/wiki/26/forbidden-artists": "/docs/forbidden-artists",
    "/docs/artists/forbidden-artists": "/docs/forbidden-artists",

    "/wiki/27": "/docs/user-groups",
    "/wiki/27/user-groups": "/docs/user-groups",
    "/docs/documentation/user-groups": "/docs/user-groups",

    "/wiki/28": "/docs/tags",
    "/wiki/28/tags": "/docs/tags",
    "/docs/secondary-entry-types/tags": "/docs/tags",

    "/wiki/29": "/docs/license",
    "/wiki/29/license": "/docs/license",
    "/docs/footer/license": "/docs/license",

    "/wiki/30": "/docs/vocadbs-history",
    "/wiki/30/vocadbs-history": "/docs/vocadbs-history",
    "/docs/documentation/vocadbs-history": "/docs/vocadbs-history",

    "/wiki/31": "/docs/supported-streaming-services",
    "/wiki/31/media-video-services-supported-by-vocadb": "/docs/supported-streaming-services",
    "/docs/other-guidelines/supported-streaming-services": "/docs/supported-streaming-services",

    "/wiki/32": "/docs/song-entry-editing#pv-types",
    "/wiki/32/pv-types": "/docs/song-entry-editing#pv-types",

    "/wiki/33": "/docs/search-terms-cheat-sheet",
    "/wiki/33/search-terms-cheat-sheet": "/docs/search-terms-cheat-sheet",
    "/docs/documentation/search-terms-cheat-sheet": "/docs/search-terms-cheat-sheet",

    "/wiki/34": "/docs/vocadb-how-to-help",
    "/wiki/34/vocadb-how-to-help": "/docs/vocadb-how-to-help",
    "/docs/pinned/vocadb-how-to-help": "/docs/vocadb-how-to-help",

    "/wiki/35": "/docs/trusted-users",
    "/wiki/35/trusted-users": "/docs/trusted-users",
    "/docs/documentation/trusted-users": "/docs/trusted-users",

    "/wiki/36": "/docs/events",
    "/wiki/36/events": "/docs/events",
    "/docs/secondary-entry-types/events": "/docs/events",

    "/wiki/37": "/docs/services-that-make-use-of-vocadb-apis",
    "/wiki/37/services-that-make-use-of-vocadb-apis": "/docs/services-that-make-use-of-vocadb-apis",
    "/docs/documentation/services-that-make-use-of-vocadb-apis": "/docs/services-that-make-use-of-vocadb-apis",

    "/wiki/39": "/docs/vocadb-editing-faq",
    "/wiki/39/vocadb-editing-faq": "/docs/vocadb-editing-faq",
    "/docs/pinned/vocadb-editing-faq": "/docs/vocadb-editing-faq",

    "/wiki/40": "/docs/artist-verification",
    "/wiki/40/artist-verification": "/docs/artist-verification",
    "/docs/artist/artist-verification": "/docs/artist-verification",

    "/wiki/41": "/docs/choosing-the-main-picture-for-artist-entries",
    "/wiki/41/choosing-the-main-picture-for-artist-entries": "/docs/ahoosing-the-main-picture-for-artist-entries",
    "/docs/artists/choosing-the-main-picture-for-artist-entries": "/docs/choosing-the-main-picture-for-artist-entries",

    "/wiki/44": "/docs/staff-roles",
    "/wiki/44/staff-roles": "/docs/staff-roles",
    "/docs/footer/staff-roles": "/docs/staff-roles",

    "/wiki/46": "/docs/merging-entries",
    "/wiki/46/merging-entries": "/docs/merging-entries",
    "/docs/other-guidelines/merging-entries": "/docs/merging-entries",

    "/wiki/47": "/docs/song-entry-editing#criteria-for-approving-songs",
    "/wiki/47/criteria-for-approving-songs": "/docs/song-entry-editing#criteria-for-approving-songs",

    "/wiki/48": "/docs/touhoudb-what-is-it-for",
    "/wiki/48/touhoudb-what-is-it-for": "/docs/touhoudb-what-is-it-for",
    "/docs/touhoudb/touhoudb-what-is-it-for": "/docs/touhoudb-what-is-it-for",

    "/wiki/49": "/docs/touhoudb---general-guidelines",
    "/wiki/49/touhoudb-general-guidelines": "/docs/touhoudb---general-guidelines",
    "/docs/touhoudb/touhoudb---general-guidelines": "/docs/touhoudb---general-guidelines",

    "/wiki/50": "/docs/privacy-and-cookie-policy",
    "/wiki/50/privacy-and-cookie-policy": "/docs/privacy-and-cookie-policy",
    "/docs/footer/privacy-and-cookie-policy": "/docs/privacy-and-cookie-policy",

    "/wiki/51": "/docs/vocadb-feature-requests",
    "/wiki/51/vocadb-feature-requests": "/docs/vocadb-feature-requests",
    "/docs/documentation/vocadb-feature-requests": "/docs/vocadb-feature-requests",

    "/wiki/52": "/docs/terms-of-service",
    "/wiki/52/terms-of-service": "/docs/terms-of-service",
    "/docs/footer/terms-of-service": "/docs/terms-of-service",

    "/wiki/53": "/docs/management-guidelines",
    "/wiki/53/management-guidelines-golden-rules": "/docs/management-guidelines",
    "/docs/other-guidelines/management-guidelines": "/docs/management-guidelines",

    "/wiki/54": "/docs/content-removal-guidelines",
    "/wiki/54/content-removal-guidelines": "/docs/content-removal-guidelines",
    "/docs/other-guidelines/content-removal-guidelines": "/docs/content-removal-guidelines",

    "/wiki/55": "/docs/albums",
    "/wiki/55/albums": "/docs/albums",

    "/wiki/56": "/docs/artists",
    "/wiki/56/artists": "/docs/artists",

    "/wiki/57": "/docs/songs",
    "/wiki/57/songs": "/docs/songs",

    "/wiki/58": "/docs/entry-reports",
    "/wiki/58/entry-reports": "/docs/entry-reports",
    "/docs/pinned/entry-reports": "/docs/entry-reports",

    "/wiki/59": "/docs/content-policy",
    "/wiki/59/content-policy": "/docs/content-policy",
    "/docs/other-guidelines/content-policy": "/docs/content-policy",

    "/wiki/60": "/docs/quick-guide-for-new-editors",
    "/wiki/60/quick-guide-for-new-editors": "/docs/quick-guide-for-new-editors",
    "/docs/pinned/quick-guide-for-new-editors": "/docs/quick-guide-for-new-editors",

    "/wiki/61": "/docs/vocadb-wiki-japanese",
    "/wiki/61/vocadb-wiki-日本語": "/docs/vocadb-wiki-japanese",
    "/docs/japanese/vocadb-wiki-japanese": "/docs/vocadb-wiki-japanese",

    "/wiki/62": "/docs/merging-entries",
    "/wiki/62/merging-entries": "/docs/merging-entries",
    "/docs/guidelines/merging-entries": "/docs/merging-entries",

    "/wiki/63": "/docs/vocadb-guidelines-chinese",
    "/wiki/63/vocadb-guidelines-中文chinese-translation": "/docs/vocadb-guidelines-chinese",
    "/docs/chinese/vocadb-guidelines-chinese": "/docs/vocadb-guidelines-chinese",

    "/wiki/65": "/docs/vocadb-partner-websites",
    "/wiki/65/vocadb-partner-websites": "/docs/vocadb-partner-websites",
    "/docs/documentation/vocadb-partner-websites": "/docs/vocadb-partner-websites",

    "/wiki/67": "/docs/search-terms-cheat-sheet",
    "/wiki/67/search": "/docs/search-terms-cheat-sheet",
    "/docs/documentation/search-terms-cheat-sheet": "/docs/search-terms-cheat-sheet",

    "/wiki/72": "/docs/vocadbs-history-in-pictures",
    "/wiki/72/vocadbs-history-in-pictures": "/docs/vocadbs-history-in-pictures",
    "/docs/documentation/vocadbs-history-in-pictures": "/docs/vocadbs-history-in-pictures",

    "/wiki/73": "/docs/artist-verification-japanese",
    "/wiki/73/アーティストの本人確認": "/docs/artist-verification-japanese",
    "/docs/japanese/artist-verification-japanese": "/docs/artist-verification-japanese",

    "/wiki/74": "/docs/vocadb-wiki-chinese",
    "/wiki/74/vocadb-wiki-中文": "/docs/vocadb-wiki-chinese",
    "/docs/chinese/vocadb-wiki-chinese": "/docs/vocadb-wiki-chinese",

    "/wiki/75": "/docs/artist-verification-chinese",
    "/wiki/75/艺术家验证": "/docs/artist-verification-chinese",
    "/docs/chinese/artist-verification-chinese": "/docs/artist-verification-chinese",

    "/wiki/76": "/docs/utaitedb-what-is-it-for",
    "/wiki/76/utaitedb-what-is-it-for": "/docs/utaitedb-what-is-it-for",
    "/docs/utaitedb/utaitedb-what-is-it-for": "/docs/utaitedb-what-is-it-for",

    "/wiki/77": "/docs/website-changelog",
    "/wiki/77/vocadb-changelog": "/docs/website-changelog",
    "/docs/documentation/website-changelog": "/docs/website-changelog",

    "/wiki/78": "/docs/discussion-rules",
    "/wiki/78/discussion-rules": "/docs/discussion-rules",
    "/docs/pinned/discussion-rules": "/docs/discussion-rules",

    "/wiki/79": "/docs/choosing-the-correct-voicebank-credit",
    "/wiki/79/choosing-the-correct-voicebank-credit": "/docs/choosing-the-correct-voicebank-credit",
    "/docs/other-guidelines/choosing-the-correct-voicebank-credit": "/docs/choosing-the-correct-voicebank-credit",

    "/wiki/81": "/docs/entry-names-and-aliases",
    "/wiki/81/entry-names-and-aliases": "/docs/entry-names-and-aliases",
    "/docs/other-guidelines/entry-names-and-aliases": "/docs/entry-names-and-aliases",

    "/wiki/82": "/docs/artist-entry-creation",
    "/wiki/82/artist-entry-creation": "/docs/artist-entry-creation",
    "/docs/artists/artist-entry-creation": "/docs/artist-entry-creation",

    "/wiki/83": "/docs/artist-entry-editing",
    "/wiki/83/artist-entry-editing": "/docs/artist-entry-editing",
    "/docs/artists/artist-entry-editing": "/docs/artist-entry-editing",

    "/wiki/84": "/docs/artist-entry-page",
    "/wiki/84/artist-entry-page": "/docs/artist-entry-page",
    "/docs/artists/artist-entry-page": "/docs/artist-entry-page",

    "/wiki/85": "/docs/album-entry-creation",
    "/wiki/85/album-entry-creation": "/docs/album-entry-creation",
    "/docs/albums/album-entry-creation": "/docs/album-entry-creation",

    "/wiki/86": "/docs/album-entry-editing",
    "/wiki/86/album-entry-editing": "/docs/album-entry-editing",
    "/docs/albums/album-entry-editing": "/docs/album-entry-editing",

    "/wiki/87": "/docs/album-entry-page",
    "/wiki/87/album-entry-page": "/docs/album-entry-page",
    "/docs/albums/album-entry-page": "/docs/album-entry-page",

    "/wiki/88": "/docs/song-entry-creation",
    "/wiki/88/song-entry-creation": "/docs/song-entry-creation",
    "/docs/songs/song-entry-creation": "/docs/song-entry-creation",

    "/wiki/89": "/docs/song-entry-editing",
    "/wiki/89/song-entry-editing": "/docs/song-entry-editing",
    "/docs/songs/song-entry-editing": "/docs/song-entry-editing",

    "/wiki/90": "/docs/song-entry-page",
    "/wiki/90/song-entry-page": "/docs/song-entry-page",
    "/docs/songs/song-entry-page": "/docs/song-entry-page",

    "/wiki/91": "/docs/rule-changelog",
    "/wiki/91/ruleguideline-changelog": "/docs/rule-changelog",
    "/docs/pinned/rule-changelog": "/docs/rule-changelog",
  },
});
