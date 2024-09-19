import siteSettings from "./siteSettings";
import menuItemType from "./menuItemType";
import menuType from "./menuType";
import pageType from "./pageType";
import articleType from "./articleType";
import programmeType from "./programmeType";
import textWithLinksBlock from "./textWithLinksBlock";

// Sections
import latestArticlesSection from "./latestArticlesSection";
import richTextSection from "./richTextSection";
import sliderSection from "./sliderSection";
import logoListSection from "./logoListSection";
import callToActionSection from "./callToActionSection";
import programmesSection from "./programmesSection";

export const schemaTypes = [
    siteSettings,
    menuType,
    menuItemType,
    pageType,
    programmeType,
    articleType,
    
    // Sections
    richTextSection,
    sliderSection,
    logoListSection,
    latestArticlesSection,
    textWithLinksBlock,
    callToActionSection,
    programmesSection
]
