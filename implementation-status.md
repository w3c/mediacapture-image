# Implementation Status
This document shows the implementation status of Image Capture on the
different browsers.

<a href="#chrome"><img width=64 src="https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome_128x128.png" alt="Chrome browser logo"></a>
<a href="#opera"><img width=64 src="https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera_128x128.png" alt="Opera browser logo"></a>
<a href="#servo"><img width=64 src="https://raw.githubusercontent.com/alrra/browser-logos/master/browser.html/browser.html_128x128.png" alt="Servo browser logo"></a>
<a href="#firefox"><img width=64 src="https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox_128x128.png" alt="Firefox browser logo"></a>
<a href="#microsoft-edge"><img width=64 src="https://raw.githubusercontent.com/alrra/browser-logos/master/edge/edge_128x128.png" alt="Microsoft Edge browser logo"></a>
<a href="#microsoft-edge"><img width=64 src="https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari_128x128.png" alt="Safari browser logo"></a>
<a href="#samsung-internet"><img width=64 src="https://raw.githubusercontent.com/alrra/browser-logos/master/samsung-internet/samsung-internet_128x128.png" alt="Samsung Internet browser logo"></a>

# Chrome
Work is in progress:
* Notes updated **2016-10-13**.
* The `chrome://flags/#enable-experimental-web-platform-features` flag must be enabled

Feature/Platform          | Android | ChromeOS | Mac | Linux | Windows |
------------------------- | :-----: | :------: | :-: | :---: | :-----: |
takePhoto()               | ✓       | 55       | ✓   | 55    | 55      |
getPhotoCapabilities/setOptions      |         |          |     |       |         |
setOptions                | ✓       |          |     |       |         |
└ whiteBalanceMode        | ✓       |          |     |       |         |
└ colorTemperature        | ✓       |          |     |       |         |
└ exposureMode            | ✓       |          |     |       |         |
└ exposureCompensation    | ✓       |          |     |       |         |
└ redEyeReduction         | ✓       |          |     |       |         |
└ iso                     | ✓       |          |     |       |         |
└ focusMode               | ✓       |          |     |       |         |
└ brightness              | ✓       | 55       |     | 55    |         |
└ contrast                | ✓       | 55       |     | 55    |         |
└ saturation              | ✓       | 55       |     | 55    |         |
└ sharpness               | ✓       | 55       |     | 55    |         |
└ imageHeight             | ✓       |          |     |       |         |
└ imageWidth              | ✓       |          |     |       |         |
└ zoom                    | ✓       | 55       |     | 55    |         |
└ fillLightMode           | ✓       |          |     |       |         |
grabFrame                 | ✓       | ✓        | ✓   | ✓     | ✓       |

Note: `PhotoCapabilities`/`Settings` availability depend on the actual capture device.

### Unsupported platforms

* iOS.

# Opera
Same as Chrome unless specified otherwise

# Servo

# Firefox

* The `about:config` flag `dom.imagecapture.enabled` must be set to true.

Feature/Platform          | Chrome OS | Android | Mac | Linux | Windows |
------------------------- | :-------: | :-----: | :-: | :---: | :-----: |
takePhoto()               |           |         |     |       |         |
getPhotoCapabilities      |           |         |     |       |         |
setOptions                |           |         |     |       |         |
grabFrame                 | ✓         | ✓       | ✓   | ✓     | ✓       |

- https://bugzilla.mozilla.org/show_bug.cgi?id=888177

# Microsoft Edge

# Safari

# Samsung Internet
