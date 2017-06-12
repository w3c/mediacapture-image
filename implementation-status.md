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
* Notes updated **May 2017**.
* *No flag needed in M59*  (before that, use the `chrome://flags/#enable-experimental-web-platform-features` flag).

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
getCapabilities()         | M59 |
applyConstraints()        | M59 |
getConstraints()          | M59 |
getSettings()             | M59 |

MediaDevices methods      | Available   |
------------------------- | :---------: |
getSupportedConstraints() | M59         |

The individual features per platform availability:

Feature/Platform          | Android | Linux/ChromeOS | Windows | Mac |
------------------------- | :-----: | :------------: | :-----: | :-: |
`Photo{Capabilities/Settings}`|     |                |         |     |
└ fillLightMode           | ✓       |                |         |     |
└ imageHeight             | ✓       | ✓              | ✓       | ✓   |
└ imageWidth              | ✓       | ✓              | ✓       | ✓   |
└ redEyeReduction         | ✓       |                |         |     |
`MediaTrack`*             |         |                |         |     |
└ brightness              |         | ✓              |         |     |
└ colorTemperature        | ✓ [2]   | ✓              | M60 [1] |     |
└ contrast                |         | ✓              | M60 [1] |     |
└ exposureCompensation    | ✓ [3]   | ✓              | M60 [1] |     |
└ exposureMode            | ✓       | ✓              | M60 [1] |     |
└ focusDistance           |         |                |         |     |
└ focusMode               | ✓       | ✓              | M60 [1] |     |
└ iso                     | ✓       |                |         |     |
└ pointsOfInterest        | ✓       |                |         |     |
└ saturation              |         | ✓              | M60 [1] |     |
└ sharpness               |         | ✓              | M60 [1] |     |
└ whiteBalanceMode        | ✓       | ✓              | M60 [1] |     |
└ zoom                    | ✓       | ✓              | M60 [1] |     |

[1] [crbug.com/657128](https://crbug.com/657128).
[2] [crbug.com/724626](https://crbug.com/724626).
[3] [crbug.com/724730](https://crbug.com/724730).

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
