# TAG Security & Privacy Review Document

Answering questions from [the questionaire doc here](https://w3ctag.github.io/security-questionnaire/).

## Questions to Consider


### 01. What information might this feature expose to Web sites or other parties, and for what purposes is that exposure necessary?
This specification exposes photographic capabilities and current settings of a camera (such as focus distance, exposure time and iso) to a Web site provided that the user has granted camera permission to the said camera to the Web site. This allows the Web site to provide UI input controllers for the photographic capabilities supported by the camera with correct control ranges and current values.
This specification also exposes camera movement related capabilities and current settings of a camera (pan, tilt and zoom) to a Web site provided that the user has granted pan-tilt-zoom camera permission to the said camera to the Web site. This allows the Web site to provide corresponding UI input controllers and to create web based conferencing systems.

### 02. Is this specification exposing the minimum amount of information necessary to power the feature?
Yes. This specification does expose a list of capabilities usually found in a webcam as constrainable properties.

### 03. How does this specification deal with personal information or personally-identifiable information or information derived thereof?
This specification does not deal with personal information or personally-identifiable information.

### 04. How does this specification deal with sensitive information?
This specification does not share additional sensitive information such as camera serial numbers or such to the Web.

That being said, this specification extends the [Media Capture and Streams](https://w3c.github.io/mediacapture-main/) specification which itself exposes video and audio streams from the user or from the user environment to Web sites with proper permissions.

This specification also allows Web sites to pan, tilt and zoom cameras which may allow video streams to expose objects and subjects which were originally out of original field of views or which were originally too tiny to be distinguishable but could be enlarged by optical zooms. Therefore, these constrainable properties are behind an additional pan-tilt-zoom camera permission and cannot be accessed with normal camera permission alone.

### 05. Does this specification introduce new state for an origin that persists across browsing sessions?
No.

### 06. What information from the underlying platform, e.g. configuration data, is exposed by this specification to an origin?
No particular additional information is exposed about the camera hardware, like brand, etc, however we do expose if the platform has support for the constainable properties. A site with permission to one or more cameras will be able to probe the existence of these new capabilities on those cameras, by passing constraints to getUserMedia. After getting explicit consent from user via a permission prompt, `track.getCapabilities` and `track.getSettings` do reveal some of the new capabilities, which  are `whiteBalanceMode`, `exposureMode`, `focusMode`, `exposureMode`, `pointsOfInterest`, `exposureCompensation`, `exposureTime`, `colorTemperature`, `iso`, `brightness`, `contrast`, `pan`, `saturation`, `sharpness`, `focalDistance`, `tilt`, `zoom` and  `torch` if there is support in the target platform. For PTZ use case, the Web Platform should not request pan-tilt-zoom camera permission (but only a normal camera permission) if there are not PTZ capable cameras.

### 07. Does this specification allow an origin access to sensors on a user’s device
This specification does not allow an origin access to any new sensors on a user’s device.

That being said, this specification extends the [Media Capture and Streams](https://w3c.github.io/mediacapture-main/) specification which itself allows an origin access to internal and external cameras and microphones on a user’s device per permission requests.

### 08. What data does this specification expose to an origin? Please also document what data is identical to data exposed by other features, in the same or different contexts.
See [01]. Also note that this specification extends the [Media Capture and Streams](https://w3c.github.io/mediacapture-main/) specification which exposes video and audio streams from the user or from the user environment to Web sites per permission requests.

### 09. Does this specification enable new script execution/loading mechanisms?
No.

### 10. Does this specification allow an origin to access other devices?
No. See also [07].

### 11. Does this specification allow an origin some measure of control over a user agent's native UI?
No.

### 12. What temporary identifiers might this this specification create or expose to the web?
[GETUSERMEDIA](https://www.w3.org/TR/mediacapture-streams/) might expose deviceID. This specification does not expose anything extra.

### 13. How does this specification distinguish between behavior in first-party and third-party contexts?
Capabilities in the ImageCapture as an extension of GetUserMedia, are exposed only to a top-level browsing secure context. In addition, the page must be visible when the website updates camera pan, tilt, and zoom with applyConstraints(), otherwise it fails with SecurityError. Third-party access to `getUserMedia` is governed by the `camera` and `microphone` permissions policies.


### 14. How does this specification work in the context of a user agent’s Private Browsing or "incognito" mode?
It will work the same way, however, as soon as that session ends, the permission status will be cleaned.

### 15. Does this specification have a "Security Considerations" and "Privacy Considerations" section?
Yes. See the [Security and
Privacy](https://w3c.github.io/mediacapture-image/#securityandprivacy) section. Advanced camera controls like Pan, Tilt and Zoom and their privacy and security analysis is covered in a separate [explainer](https://github.com/w3c/mediacapture-image/blob/master/ptz-explainer.md#security). This specification's Privacy and Security section should be an addendum to the main specification's [Privacy section](https://w3c.github.io/mediacapture-main/#privacy-and-security-considerations).

### 16. Does this specification allow downgrading default security characteristics?
By default, this specification uses the same permissions namely `camera` as the [mediacapture-main](https://w3c.github.io/mediacapture-main/) specification. However, we do have a separate PTZ permission that allows UA to differentiate between normal camera permissions and PTZ camera permissions as PTZ needs to be explicitly requested as an extension to the camera permission. `{name: "camera", panTiltZoom: true}` is stronger than `{name: "camera", panTiltZoom: false}`.

### 17. What should this questionnaire have asked?


