/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import columns1Parser from './parsers/columns1.js';
import hero2Parser from './parsers/hero2.js';
import cardsNoImages5Parser from './parsers/cardsNoImages5.js';
import tabs3Parser from './parsers/tabs3.js';
import columns6Parser from './parsers/columns6.js';
import columns8Parser from './parsers/columns8.js';
import cards4Parser from './parsers/cards4.js';
import accordion9Parser from './parsers/accordion9.js';
import cards11Parser from './parsers/cards11.js';
import accordion7Parser from './parsers/accordion7.js';
import carousel12Parser from './parsers/carousel12.js';
import columns14Parser from './parsers/columns14.js';
import columns16Parser from './parsers/columns16.js';
import accordion15Parser from './parsers/accordion15.js';
import columns17Parser from './parsers/columns17.js';
import cards13Parser from './parsers/cards13.js';
import columns19Parser from './parsers/columns19.js';
import cards18Parser from './parsers/cards18.js';
import cards21Parser from './parsers/cards21.js';
import cards23Parser from './parsers/cards23.js';
import tabs22Parser from './parsers/tabs22.js';
import columns24Parser from './parsers/columns24.js';
import cards25Parser from './parsers/cards25.js';
import carousel28Parser from './parsers/carousel28.js';
import columns29Parser from './parsers/columns29.js';
import cards20Parser from './parsers/cards20.js';
import columns30Parser from './parsers/columns30.js';
import cardsNoImages33Parser from './parsers/cardsNoImages33.js';
import columns32Parser from './parsers/columns32.js';
import columns35Parser from './parsers/columns35.js';
import hero38Parser from './parsers/hero38.js';
import accordion37Parser from './parsers/accordion37.js';
import hero39Parser from './parsers/hero39.js';
import hero40Parser from './parsers/hero40.js';
import columns34Parser from './parsers/columns34.js';
import hero41Parser from './parsers/hero41.js';
import cardsNoImages43Parser from './parsers/cardsNoImages43.js';
import tableStriped45Parser from './parsers/tableStriped45.js';
import columns46Parser from './parsers/columns46.js';
import accordion42Parser from './parsers/accordion42.js';
import columns47Parser from './parsers/columns47.js';
import columns49Parser from './parsers/columns49.js';
import hero48Parser from './parsers/hero48.js';
import columns52Parser from './parsers/columns52.js';
import columns53Parser from './parsers/columns53.js';
import hero50Parser from './parsers/hero50.js';
import columns51Parser from './parsers/columns51.js';
import columns55Parser from './parsers/columns55.js';
import accordion57Parser from './parsers/accordion57.js';
import cards54Parser from './parsers/cards54.js';
import cards58Parser from './parsers/cards58.js';
import columns60Parser from './parsers/columns60.js';
import accordion61Parser from './parsers/accordion61.js';
import carousel59Parser from './parsers/carousel59.js';
import cards62Parser from './parsers/cards62.js';
import cards64Parser from './parsers/cards64.js';
import cards56Parser from './parsers/cards56.js';
import columns63Parser from './parsers/columns63.js';
import cards65Parser from './parsers/cards65.js';
import columns66Parser from './parsers/columns66.js';
import cards67Parser from './parsers/cards67.js';
import columns68Parser from './parsers/columns68.js';
import cardsNoImages69Parser from './parsers/cardsNoImages69.js';
import hero71Parser from './parsers/hero71.js';
import columns72Parser from './parsers/columns72.js';
import accordion70Parser from './parsers/accordion70.js';
import columns75Parser from './parsers/columns75.js';
import columns73Parser from './parsers/columns73.js';
import accordion76Parser from './parsers/accordion76.js';
import hero78Parser from './parsers/hero78.js';
import cards77Parser from './parsers/cards77.js';
import cards74Parser from './parsers/cards74.js';
import carousel79Parser from './parsers/carousel79.js';
import accordion80Parser from './parsers/accordion80.js';
import cards82Parser from './parsers/cards82.js';
import columns81Parser from './parsers/columns81.js';
import cards83Parser from './parsers/cards83.js';
import columns85Parser from './parsers/columns85.js';
import columns86Parser from './parsers/columns86.js';
import columns84Parser from './parsers/columns84.js';
import columns87Parser from './parsers/columns87.js';
import accordion89Parser from './parsers/accordion89.js';
import columns91Parser from './parsers/columns91.js';
import hero90Parser from './parsers/hero90.js';
import columns93Parser from './parsers/columns93.js';
import columns92Parser from './parsers/columns92.js';
import columns95Parser from './parsers/columns95.js';
import columns96Parser from './parsers/columns96.js';
import columns97Parser from './parsers/columns97.js';
import columns98Parser from './parsers/columns98.js';
import cards88Parser from './parsers/cards88.js';
import cards94Parser from './parsers/cards94.js';
import cards99Parser from './parsers/cards99.js';
import embedVideo100Parser from './parsers/embedVideo100.js';
import tableNoHeader101Parser from './parsers/tableNoHeader101.js';
import cards102Parser from './parsers/cards102.js';
import columns103Parser from './parsers/columns103.js';
import columns106Parser from './parsers/columns106.js';
import columns104Parser from './parsers/columns104.js';
import columns105Parser from './parsers/columns105.js';
import columns108Parser from './parsers/columns108.js';
import cards110Parser from './parsers/cards110.js';
import columns109Parser from './parsers/columns109.js';
import columns111Parser from './parsers/columns111.js';
import cards107Parser from './parsers/cards107.js';
import columns113Parser from './parsers/columns113.js';
import columns114Parser from './parsers/columns114.js';
import columns115Parser from './parsers/columns115.js';
import columns116Parser from './parsers/columns116.js';
import columns112Parser from './parsers/columns112.js';
import carousel117Parser from './parsers/carousel117.js';
import cardsNoImages119Parser from './parsers/cardsNoImages119.js';
import hero118Parser from './parsers/hero118.js';
import columns122Parser from './parsers/columns122.js';
import columns120Parser from './parsers/columns120.js';
import columns123Parser from './parsers/columns123.js';
import columns121Parser from './parsers/columns121.js';
import cards125Parser from './parsers/cards125.js';
import columns126Parser from './parsers/columns126.js';
import cards128Parser from './parsers/cards128.js';
import columns124Parser from './parsers/columns124.js';
import columns129Parser from './parsers/columns129.js';
import columns127Parser from './parsers/columns127.js';
import columns131Parser from './parsers/columns131.js';
import columns130Parser from './parsers/columns130.js';
import columns132Parser from './parsers/columns132.js';
import carousel134Parser from './parsers/carousel134.js';
import columns135Parser from './parsers/columns135.js';
import columns137Parser from './parsers/columns137.js';
import columns133Parser from './parsers/columns133.js';
import cards138Parser from './parsers/cards138.js';
import columns136Parser from './parsers/columns136.js';
import columns139Parser from './parsers/columns139.js';
import columns140Parser from './parsers/columns140.js';
import columns141Parser from './parsers/columns141.js';
import columns142Parser from './parsers/columns142.js';
import columns145Parser from './parsers/columns145.js';
import columns144Parser from './parsers/columns144.js';
import columns143Parser from './parsers/columns143.js';
import columns147Parser from './parsers/columns147.js';
import columns146Parser from './parsers/columns146.js';
import columns150Parser from './parsers/columns150.js';
import columns149Parser from './parsers/columns149.js';
import columns151Parser from './parsers/columns151.js';
import columns148Parser from './parsers/columns148.js';
import columns154Parser from './parsers/columns154.js';
import columns153Parser from './parsers/columns153.js';
import columns152Parser from './parsers/columns152.js';
import columns157Parser from './parsers/columns157.js';
import columns158Parser from './parsers/columns158.js';
import columns155Parser from './parsers/columns155.js';
import columns159Parser from './parsers/columns159.js';
import columns156Parser from './parsers/columns156.js';
import columns163Parser from './parsers/columns163.js';
import columns162Parser from './parsers/columns162.js';
import columns165Parser from './parsers/columns165.js';
import accordion160Parser from './parsers/accordion160.js';
import search166Parser from './parsers/search166.js';
import columns164Parser from './parsers/columns164.js';
import columns167Parser from './parsers/columns167.js';
import columns168Parser from './parsers/columns168.js';
import columns170Parser from './parsers/columns170.js';
import columns169Parser from './parsers/columns169.js';
import columns171Parser from './parsers/columns171.js';
import columns172Parser from './parsers/columns172.js';
import cards174Parser from './parsers/cards174.js';
import columns173Parser from './parsers/columns173.js';
import columns176Parser from './parsers/columns176.js';
import columns178Parser from './parsers/columns178.js';
import columns179Parser from './parsers/columns179.js';
import accordion180Parser from './parsers/accordion180.js';
import cards175Parser from './parsers/cards175.js';
import hero182Parser from './parsers/hero182.js';
import columns181Parser from './parsers/columns181.js';
import columns177Parser from './parsers/columns177.js';
import columns185Parser from './parsers/columns185.js';
import columns183Parser from './parsers/columns183.js';
import columns184Parser from './parsers/columns184.js';
import columns188Parser from './parsers/columns188.js';
import columns187Parser from './parsers/columns187.js';
import columns189Parser from './parsers/columns189.js';
import columns186Parser from './parsers/columns186.js';
import columns190Parser from './parsers/columns190.js';
import columns191Parser from './parsers/columns191.js';
import columns192Parser from './parsers/columns192.js';
import columns193Parser from './parsers/columns193.js';
import cards194Parser from './parsers/cards194.js';
import columns196Parser from './parsers/columns196.js';
import columns197Parser from './parsers/columns197.js';
import columns198Parser from './parsers/columns198.js';
import hero200Parser from './parsers/hero200.js';
import columns199Parser from './parsers/columns199.js';
import columns201Parser from './parsers/columns201.js';
import cards202Parser from './parsers/cards202.js';
import columns195Parser from './parsers/columns195.js';
import columns204Parser from './parsers/columns204.js';
import columns203Parser from './parsers/columns203.js';
import columns205Parser from './parsers/columns205.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import cleanupTransformer from './transformers/cleanup.js';
import imageTransformer from './transformers/images.js';
import linkTransformer from './transformers/links.js';
import sectionsTransformer from './transformers/sections.js';
import { TransformHook } from './transformers/transform.js';
import { customParsers, customTransformers, customElements } from './import.custom.js';
import {
  generateDocumentPath,
  handleOnLoad,
  mergeInventory,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  columns1: columns1Parser,
  hero2: hero2Parser,
  cardsNoImages5: cardsNoImages5Parser,
  tabs3: tabs3Parser,
  columns6: columns6Parser,
  columns8: columns8Parser,
  cards4: cards4Parser,
  accordion9: accordion9Parser,
  cards11: cards11Parser,
  accordion7: accordion7Parser,
  carousel12: carousel12Parser,
  columns14: columns14Parser,
  columns16: columns16Parser,
  accordion15: accordion15Parser,
  columns17: columns17Parser,
  cards13: cards13Parser,
  columns19: columns19Parser,
  cards18: cards18Parser,
  cards21: cards21Parser,
  cards23: cards23Parser,
  tabs22: tabs22Parser,
  columns24: columns24Parser,
  cards25: cards25Parser,
  carousel28: carousel28Parser,
  columns29: columns29Parser,
  cards20: cards20Parser,
  columns30: columns30Parser,
  cardsNoImages33: cardsNoImages33Parser,
  columns32: columns32Parser,
  columns35: columns35Parser,
  hero38: hero38Parser,
  accordion37: accordion37Parser,
  hero39: hero39Parser,
  hero40: hero40Parser,
  columns34: columns34Parser,
  hero41: hero41Parser,
  cardsNoImages43: cardsNoImages43Parser,
  tableStriped45: tableStriped45Parser,
  columns46: columns46Parser,
  accordion42: accordion42Parser,
  columns47: columns47Parser,
  columns49: columns49Parser,
  hero48: hero48Parser,
  columns52: columns52Parser,
  columns53: columns53Parser,
  hero50: hero50Parser,
  columns51: columns51Parser,
  columns55: columns55Parser,
  accordion57: accordion57Parser,
  cards54: cards54Parser,
  cards58: cards58Parser,
  columns60: columns60Parser,
  accordion61: accordion61Parser,
  carousel59: carousel59Parser,
  cards62: cards62Parser,
  cards64: cards64Parser,
  cards56: cards56Parser,
  columns63: columns63Parser,
  cards65: cards65Parser,
  columns66: columns66Parser,
  cards67: cards67Parser,
  columns68: columns68Parser,
  cardsNoImages69: cardsNoImages69Parser,
  hero71: hero71Parser,
  columns72: columns72Parser,
  accordion70: accordion70Parser,
  columns75: columns75Parser,
  columns73: columns73Parser,
  accordion76: accordion76Parser,
  hero78: hero78Parser,
  cards77: cards77Parser,
  cards74: cards74Parser,
  carousel79: carousel79Parser,
  accordion80: accordion80Parser,
  cards82: cards82Parser,
  columns81: columns81Parser,
  cards83: cards83Parser,
  columns85: columns85Parser,
  columns86: columns86Parser,
  columns84: columns84Parser,
  columns87: columns87Parser,
  accordion89: accordion89Parser,
  columns91: columns91Parser,
  hero90: hero90Parser,
  columns93: columns93Parser,
  columns92: columns92Parser,
  columns95: columns95Parser,
  columns96: columns96Parser,
  columns97: columns97Parser,
  columns98: columns98Parser,
  cards88: cards88Parser,
  cards94: cards94Parser,
  cards99: cards99Parser,
  embedVideo100: embedVideo100Parser,
  tableNoHeader101: tableNoHeader101Parser,
  cards102: cards102Parser,
  columns103: columns103Parser,
  columns106: columns106Parser,
  columns104: columns104Parser,
  columns105: columns105Parser,
  columns108: columns108Parser,
  cards110: cards110Parser,
  columns109: columns109Parser,
  columns111: columns111Parser,
  cards107: cards107Parser,
  columns113: columns113Parser,
  columns114: columns114Parser,
  columns115: columns115Parser,
  columns116: columns116Parser,
  columns112: columns112Parser,
  carousel117: carousel117Parser,
  cardsNoImages119: cardsNoImages119Parser,
  hero118: hero118Parser,
  columns122: columns122Parser,
  columns120: columns120Parser,
  columns123: columns123Parser,
  columns121: columns121Parser,
  cards125: cards125Parser,
  columns126: columns126Parser,
  cards128: cards128Parser,
  columns124: columns124Parser,
  columns129: columns129Parser,
  columns127: columns127Parser,
  columns131: columns131Parser,
  columns130: columns130Parser,
  columns132: columns132Parser,
  carousel134: carousel134Parser,
  columns135: columns135Parser,
  columns137: columns137Parser,
  columns133: columns133Parser,
  cards138: cards138Parser,
  columns136: columns136Parser,
  columns139: columns139Parser,
  columns140: columns140Parser,
  columns141: columns141Parser,
  columns142: columns142Parser,
  columns145: columns145Parser,
  columns144: columns144Parser,
  columns143: columns143Parser,
  columns147: columns147Parser,
  columns146: columns146Parser,
  columns150: columns150Parser,
  columns149: columns149Parser,
  columns151: columns151Parser,
  columns148: columns148Parser,
  columns154: columns154Parser,
  columns153: columns153Parser,
  columns152: columns152Parser,
  columns157: columns157Parser,
  columns158: columns158Parser,
  columns155: columns155Parser,
  columns159: columns159Parser,
  columns156: columns156Parser,
  columns163: columns163Parser,
  columns162: columns162Parser,
  columns165: columns165Parser,
  accordion160: accordion160Parser,
  search166: search166Parser,
  columns164: columns164Parser,
  columns167: columns167Parser,
  columns168: columns168Parser,
  columns170: columns170Parser,
  columns169: columns169Parser,
  columns171: columns171Parser,
  columns172: columns172Parser,
  cards174: cards174Parser,
  columns173: columns173Parser,
  columns176: columns176Parser,
  columns178: columns178Parser,
  columns179: columns179Parser,
  accordion180: accordion180Parser,
  cards175: cards175Parser,
  hero182: hero182Parser,
  columns181: columns181Parser,
  columns177: columns177Parser,
  columns185: columns185Parser,
  columns183: columns183Parser,
  columns184: columns184Parser,
  columns188: columns188Parser,
  columns187: columns187Parser,
  columns189: columns189Parser,
  columns186: columns186Parser,
  columns190: columns190Parser,
  columns191: columns191Parser,
  columns192: columns192Parser,
  columns193: columns193Parser,
  cards194: cards194Parser,
  columns196: columns196Parser,
  columns197: columns197Parser,
  columns198: columns198Parser,
  hero200: hero200Parser,
  columns199: columns199Parser,
  columns201: columns201Parser,
  cards202: cards202Parser,
  columns195: columns195Parser,
  columns204: columns204Parser,
  columns203: columns203Parser,
  columns205: columns205Parser,
  ...customParsers,
};

const transformers = [
  cleanupTransformer,
  imageTransformer,
  linkTransformer,
  sectionsTransformer,
  ...(Array.isArray(customTransformers)
    ? customTransformers
    : Object.values(customTransformers)),
];

// Additional page elements to parse that are not included in the inventory
const pageElements = [{ name: 'metadata' }, ...customElements];

WebImporter.Import = {
  findSiteUrl: (instance, siteUrls) => (
    siteUrls.find(({ id }) => id === instance.urlHash)
  ),
  transform: (hookName, element, payload) => {
    // perform any additional transformations to the page
    transformers.forEach((transformerFn) => (
      transformerFn.call(this, hookName, element, payload)
    ));
  },
  getParserName: ({ name, key }) => key || name,
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (
    { urls = [], fragments = [] },
    sourceUrl = '',
  ) => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => {
      // find url in urls array
      const siteUrl = WebImporter.Import.findSiteUrl(instance, urls);
      if (!siteUrl) {
        return false;
      }
      return siteUrl.url === sourceUrl;
    })
    .map(({ xpath }) => xpath)),
};

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { urls = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(inventory, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .flatMap((block) => block.instances
      .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
      .map((instance) => ({
        ...block,
        uuid: instance.uuid,
        section: instance.section,
        element: WebImporter.Import.getElementByXPath(document, instance.xpath),
      })))
    .filter((block) => block.element);

  const defaultContentElements = inventory.outliers
    .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
    .map((instance) => ({
      ...instance,
      element: WebImporter.Import.getElementByXPath(document, instance.xpath),
    }))
    .filter((block) => block.element);

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // before page transform hook
  WebImporter.Import.transform(TransformHook.beforePageTransform, main, { ...source });

  // transform all elements using parsers
  [...defaultContentElements, ...blockElements, ...pageElements]
    // sort elements by order in the page
    .sort((a, b) => (a.uuid ? parseInt(a.uuid.split('-')[1], 10) - parseInt(b.uuid.split('-')[1], 10) : 999))
    // filter out fragment elements
    .filter((item) => !fragmentElements.includes(item.element))
    .forEach((item, idx, arr) => {
      const { element = main, ...pageBlock } = item;
      const parserName = WebImporter.Import.getParserName(pageBlock);
      const parserFn = parsers[parserName];
      try {
        let parserElement = element;
        if (typeof parserElement === 'string') {
          parserElement = main.querySelector(parserElement);
        }
        // before parse hook
        WebImporter.Import.transform(
          TransformHook.beforeParse,
          parserElement,
          {
            ...source,
            ...pageBlock,
            nextEl: arr[idx + 1],
          },
        );
        // parse the element
        if (parserFn) {
          parserFn.call(this, parserElement, { ...source });
        }
        // after parse hook
        WebImporter.Import.transform(
          TransformHook.afterParse,
          parserElement,
          {
            ...source,
            ...pageBlock,
          },
        );
      } catch (e) {
        console.warn(`Failed to parse block: ${parserName}`, e);
      }
    });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter((instance) => {
        const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
        if (!siteUrl) {
          return false;
        }
        return `${siteUrl.url}#${fragment.name}` === originalURL;
      })
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(({ instances }) => instances.find((instance) => {
            const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
            return `${siteUrl.url}#${fragment.name}` === originalURL && instance.xpath === xpath;
          }));

        if (!fragmentBlock) return;
        const parserName = WebImporter.Import.getParserName(fragmentBlock);
        const parserFn = parsers[parserName];
        if (!parserFn) return;
        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${fragmentBlock.key}, with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (payload) => {
    const { document, params: { originalURL } } = payload;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      const siteUrlsUrl = new URL('/tools/importer/site-urls.json', publishUrl);
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        // fetch and merge site-urls and inventory
        const siteUrlsResp = await fetch(siteUrlsUrl.href);
        const inventoryResp = await fetch(inventoryUrl.href);
        const siteUrls = await siteUrlsResp.json();
        inventory = await inventoryResp.json();
        inventory = mergeInventory(siteUrls, inventory, publishUrl);
      } catch (e) {
        console.error('Failed to merge site-urls and inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // before transform hook
    WebImporter.Import.transform(TransformHook.beforeTransform, main, { ...payload, inventory });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...payload, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...payload, inventory });
      path = generateDocumentPath(payload, inventory);
    }

    // after transform hook
    WebImporter.Import.transform(TransformHook.afterTransform, main, { ...payload, inventory });

    return [{
      element: main,
      path,
    }];
  },
};
