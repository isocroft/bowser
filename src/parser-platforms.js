import { getFirstMatch, pixelDensity, screenScale } from './utils';

const TYPES_LABELS = {
  tablet: 'tablet',
  mobile: 'mobile',
  desktop: 'desktop',
};

/*
 * Tablets go first since usually they have more specific
 * signs to detect.
 */

export default [
  /* Googlebot */
  {
    test: [/googlebot/i],
    describe() {
      return {
        type: 'bot',
        vendor: 'Google',
      };
    },
  },

  /* Huawei */
  {
    test: [/huawei/i],
    describe(ua) {
      const model = getFirstMatch(/(can-l01)/i, ua) && 'Nova';
      const platform = {
        type: TYPES_LABELS.mobile,
        vendor: 'Huawei',
      };
      if (model) {
        platform.model = model;
      }
      return platform;
    },
  },

  /* Nexus Tablet */
  {
    test: [/nexus\s*(?:7|8|9|10).*/i],
    describe() {
      return {
        type: TYPES_LABELS.tablet,
        vendor: 'Nexus',
      };
    },
  },

  /* iPad */
  {
    test: [/ipad/i],
    describe() {
      return {
        type: TYPES_LABELS.tablet,
        vendor: 'Apple',
        model: 'iPad',
      };
    },
  },

  /* Amazon Kindle Fire */
  {
    test: [/kftt build/i],
    describe() {
      return {
        type: TYPES_LABELS.tablet,
        vendor: 'Amazon',
        model: 'Kindle Fire HD 7',
      };
    },
  },

  /* Another Amazon Tablet with Silk */
  {
    test: [/silk/i],
    describe() {
      return {
        type: TYPES_LABELS.tablet,
        vendor: 'Amazon',
      };
    },
  },

  /* Tablet */
  {
    test: [/tablet/i],
    describe() {
      return {
        type: TYPES_LABELS.tablet,
      };
    },
  },

  /* iPod/iPhone */
  {
    test(parser) {
      const iDevice = parser.test(/ipod|iphone/i);
      const likeIDevice = parser.test(/like (ipod|iphone)/i);
      return iDevice && !likeIDevice;
    },
    describe(ua) {
      const model = getFirstMatch(/(ipod|iphone)/i, ua);
      return {
        type: TYPES_LABELS.mobile,
        vendor: 'Apple',
        model,
      };
    },
  },

  /* Nexus Mobile */
  {
    test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
    describe() {
      return {
        type: TYPES_LABELS.mobile,
        vendor: 'Nexus',
      };
    },
  },

  /* Mobile */
  {
    test: function(parser){
        var mobileDevice = parser.test(/[^-]mobi|mobile/i);
      
        /* see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent  */
        var mobileScreenFactor = (screenScale.width < 768) && ((screenScale.width / pixelDensity) < 768);
        return mobileDevice && mobileScreenFactor
    },
    describe() {
      return {
        type: TYPES_LABELS.mobile,
      };
    },
  },

  /* BlackBerry */
  {
    test(parser) {
      return parser.getBrowserName(true) === 'blackberry';
    },
    describe() {
      return {
        type: TYPES_LABELS.mobile,
        vendor: 'BlackBerry',
      };
    },
  },
  
  /* Research In Motion ( BlackBerry ) */
  
  {
    test(parser) {
      return parser.test(/RIM/i)
    },
    describe() {
        return {
          type: TYPES_LABELS.tablet,
          vendor: 'BlackBerry',
        };
    },
  },
  
  /* KFAPWI */
  {
    test:[/KFAPWI/i],
    describe() {
      return {
        type: TYPES_LABELS.tablet,
      };
    },
  },

  /* Bada */
  {
    test(parser) {
      return parser.getBrowserName(true) === 'bada';
    },
    describe() {
      return {
        type: TYPES_LABELS.mobile,
      };
    },
  },

  /* Windows Phone */
  {
    test(parser) {
      return parser.getBrowserName() === 'windows phone';
    },
    describe() {
      return {
        type: TYPES_LABELS.mobile,
        vendor: 'Microsoft',
      };
    },
  },

  /* Android Tablet */
  {
    test(parser) {
      const osMajorVersion = Number(String(parser.getOSVersion()).split('.')[0]);
      return parser.getOSName(true) === 'android' && (osMajorVersion >= 3);
    },
    describe() {
      return {
        type: TYPES_LABELS.tablet,
      };
    },
  },

  /* Android Mobile */
  {
    test(parser) {
      return parser.getOSName(true) === 'android';
    },
    describe() {
      return {
        type: TYPES_LABELS.mobile,
      };
    },
  },

  /* desktop */
  {
    test(parser) {
      return parser.getOSName(true) === 'macos' 
        && ((~~pixelDensity) == 1) && (screenScale.width >= 1024 && screenScale.width <= 1920);
    },
    describe() {
      return {
        type: TYPES_LABELS.desktop,
        vendor: 'Apple',
      };
    },
  },

  /* Windows */
  {
    test(parser) {
      return parser.getOSName(true) === 'windows'
        && ((~~pixelDensity) == 1) && (screenScale.width >= 1024 && screenScale.width <= 1920);
    },
    describe() {
      return {
        type: TYPES_LABELS.desktop,
      };
    },
  },

  /* Linux */
  {
    test(parser) {
      return parser.getOSName(true) === 'linux'
        && ((~~pixelDensity) == 1) && (screenScale.width >= 1024 && screenScale.width <= 1920);
    },
    describe() {
      return {
        type: TYPES_LABELS.desktop,
      };
    },
  },
];
