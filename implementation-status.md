# Implementation Status
This document shows the implementation status of Image Capture on the
different browsers.

<a href="#chrome"><img width=64 src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_128x128.png" alt="Chrome browser logo"></a>
<a href="#opera"><img width=64 src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_128x128.png" alt="Opera browser logo"></a>
<a href="#servo"><img width=64 src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/browser.html/browser.html_128x128.png" alt="Servo browser logo"></a>
<a href="#firefox"><img width=64 src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_128x128.png" alt="Firefox browser logo"></a>
<a href="#microsoft-edge"><img width=64 src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_128x128.png" alt="Microsoft Edge browser logo"></a>
<a href="#microsoft-edge"><img width=64 src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_128x128.png" alt="Safari browser logo"></a>
<a href="#samsung-internet"><img width=64 src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_128x128.png" alt="Samsung Internet browser logo"></a>

# Chrome
Work is in progress:
* Notes updated **March 2017**.
* The `chrome://flags/#enable-experimental-web-platform-features` flag must be enabled

Method                    |Available|
------------------------- | :-----: |
grabFrame()               | ✓       |
takePhoto()               | ✓       |

Method                    |Available|
------------------------- | :-----: |
getPhotoCapabilities()    | ✓       |
setOptions()              | ✓       |

MediaStreamTrack methods  | Available   |
------------------------- | :---------: |
getCapabilities()         | 59.0.3051.0 |
applyConstraints()        | 59.0.3051.0 |
getConstraints()          | 59.0.3051.0 |
getSettings()             | 59.0.3051.0 |

MediaDevices methods      | Available   |
------------------------- | :---------: |
getSupportedConstraints() | 59.0.3041.0 |

The individual features per platform availability:

Feature/Platform          | Android | Linux/ChromeOS | Mac | Windows |
------------------------- | :-----: | :------------: | :-: | :-----: |
`Photo{Capabilities/Settings}`|     |                |     |         |
└ fillLightMode           | ✓       |                |     |         |
└ imageHeight             | ✓       |                |     |         |
└ imageWidth              | ✓       |                |     |         |
└ redEyeReduction         | ✓       |                |     |         |
`MediaStreamTrack`*       |         |                |     |         |
└ brightness              |         | ✓              |     |         |
└ colorTemperature        | ✓       | ✓              |     |         |
└ contrast                |         | ✓              |     |         |
└ exposureCompensation    | ✓       |                |     |         |
└ exposureMode            | ✓       |                |     |         |
└ focusMode               | ✓       |                |     |         |
└ iso                     | ✓       |                |     |         |
└ pointsOfInterest        | ✓       |                |     |         |
└ saturation              |         | ✓              |     |         |
└ sharpness               |         | ✓              |     |         |
└ whiteBalanceMode        | ✓       |                |     |         |
└ zoom                    | ✓       | ✓              |     |         |


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
