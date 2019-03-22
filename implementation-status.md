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
* Notes updated **June 2017**.
* *No flag needed after M59*  (before that, use `chrome://flags/#enable-experimental-web-platform-features`).

ImageCapture method       |Available                               |
------------------------- | :------------------------------------- |
grabFrame()               | ✓                                      |
takePhoto()               | ✓                                      |
getPhotoCapabilities()    | ✓                                      |
getPhotoSettings()        | 61 ([732521](https://crbug.com/732521))|
setOptions()              | ✓                                      |

MediaStreamTrack methods  | Available  |
------------------------- | :--------- |
getCapabilities()         | ✓          |
applyConstraints()        | ✓          |
getConstraints()          | ✓          |
getSettings()             | ✓          |

MediaDevices methods      | Available  |
------------------------- | :--------- |
getSupportedConstraints() | ✓          |

Individual features per-platform availability:

Feature/Platform          | Android                               | Linux/ChromeOS                       | Windows                                 | Mac |
------------------------- | :------------------------------------ | :------------                        | :-------------------------------------- | :-  |
`Photo{Capabilities/Settings}`|                                   |                                      |                                         |     |
└ fillLightMode           | ✓                                     |                                      |                                         |     |
└ imageHeight             | ✓                                     | ✓                                    | ✓                                       | ✓   |
└ imageWidth              | ✓                                     | ✓                                    | ✓                                       | ✓   |
└ redEyeReduction         | ✓                                     |                                      |                                         |     |
`MediaTrack`*             |                                       |                                      |                                         |     |
└ brightness              |                                       | ✓                                    |                                         |     |
└ colorTemperature        |60 ([724626](https://crbug.com/724626))| ✓                                    | 60 ([657128](https://crbug.com/657128)) |     |
└ contrast                |                                       | ✓                                    | 60 ([657128](https://crbug.com/657128)) |     |
└ exposureCompensation    |   ([724730](https://crbug.com/724730))| ✓                                    | 60 ([657128](https://crbug.com/657128)) |     |
└ exposureTime            |72 ([823316](https://crbug.com/823316))| ✓              |
└ exposureMode            | ✓                                     | ✓                                    | 60 ([657128](https://crbug.com/657128)) |     |
└ focusDistance           |72 ([732807](https://crbug.com/732807))| ✓                                     |                                         |     |
└ focusMode               | ✓                                     | ✓                                    | 60 ([657128](https://crbug.com/657128)) |     |
└ iso                     | ✓                                     |                                      |                                         |     |
└ pan                     |                                       | ([934063](https://crbug.com/934063)) | ([934063](https://crbug.com/934063))    |     |
└ pointsOfInterest        | ✓                                     |                                      |                                         |     |
└ saturation              |                                       | ✓                                    | 60 ([657128](https://crbug.com/657128)) |     |
└ sharpness               |                                       | ✓                                    | 60 ([657128](https://crbug.com/657128)) |     |
└ tilt                    |                                       | ([934063](https://crbug.com/934063)) | ([934063](https://crbug.com/934063))    |     |
└ whiteBalanceMode        | ✓                                     | ✓                                    | 60 ([657128](https://crbug.com/657128)) |     |
└ zoom                    | ✓                                     | ✓                                    | 60 ([657128](https://crbug.com/657128)) |     |

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
