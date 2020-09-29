# Explainer: Pan/Tilt support for Camera

## Authors:

- fbeaufort@google.com

## Participate

- https://github.com/w3c/mediacapture-image/issues

## Introduction

[Some cameras] have the ability to pan and tilt which is especially useful in
video conferencing.

The "Pan/Tilt support for Camera" feature will allow web developers to use this
ability in a standards compliant manner using media track constraints in
[MediaDevices.getUserMedia()] and [MediaStreamTrack.applyConstraints()].

## Goals

The [MediaStream Image Capture API](https://w3c.github.io/mediacapture-image/)
has been [implemented in Chrome](https://caniuse.com/#search=imageCapture) since
2017. We would like to add the missing pan and tilt camera motion features to
the existing property set of capabilities, constraints and settings.

This will allow video conferencing and real-time meetings web apps to control
camera pan and tilt motions, aka PTZ (Pan/Tilt/Zoom). It could be used for
steering the camera to face a speaker for instance.

Without it, users have to install native apps today to control camera PTZ.
Presently, zoom is supported as a media track constraint behind the camera
permission. The plan is to group pan, tilt and zoom together behind a PTZ
separate permission which can be requested in a single `getUserMedia()` call
with the camera permission.

## Control camera pan/tilt

We would like to add `pan` and `tilt` to the existing property set of media
track capabilities, constraints and settings. These new constraints apply to the
live video feed. Those will also be used in `getUserMedia()` to express whether a
website wants to control camera PTZ functionality. In other words, it will be
used to request the PTZ permission, a separate permission, in a single
`getUserMedia()` call, along the camera permission.

If the selected/connected camera does not support PTZ though or user blocks solely
the PTZ permission, the UA will fall back to a regular camera prompt.

The [new "true" semantics] for `pan`, `tilt`, and `zoom` makes it possible to
acquire a PTZ camera in `getUserMedia()` without altering the current pan, tilt
and zoom values. If the PTZ permission is not granted, the `pan`, `tilt`, and
`zoom` are not available as capabilities, settings, and constraints, even if the
camera supports PTZ. The UA may expose all together "empty" `pan`, `tilt`, and
`zoom` capabilities to allow a website to detect the availability of a PTZ
camera.

Applying PTZ constraints requires the PTZ permission to be granted as described
in the "Interaction with the Permissions API" section below. The `pan` and `tilt`
values passed in `applyConstraints()` will be used to move the camera.

The example below shows how camera pan and tilt could be requested and presented
to the user.

```js
// User is prompted to grant both camera and PTZ access in a single call.
// If the camera does not support PTZ or user denies PTZ permission, it falls
// back to a regular camera prompt.
const videoStream = await navigator.mediaDevices.getUserMedia({
  // [NEW] Website asks to control camera PTZ as well.
  video: { pan: true, tilt: true, zoom: true },
});

// Show camera video stream to user.
const video = document.querySelector("video");
video.srcObject = videoStream;

// Get video track capabilities and settings.
const [videoTrack] = videoStream.getVideoTracks();
const capabilities = videoTrack.getCapabilities();
const settings = videoTrack.getSettings();

// [NEW] Let the user control the camera pan motion if the camera supports it
// and PTZ access is granted.
if ("pan" in settings) {
  const input = document.querySelector("input[type=range]");
  input.min = capabilities.pan.min;
  input.max = capabilities.pan.max;
  input.step = capabilities.pan.step;
  input.value = settings.pan;
  input.oninput = async (event) => {
    await videoTrack.applyConstraints({
      advanced: [{ pan: input.value }],
    });
  };
}

// [NEW] Let the user control the camera tilt motion if the camera supports it
// and PTZ access is granted.
if ("tilt" in settings) {
  // similar to the pan motion above.
}
```

The example below shows how camera pan could be reset when acquiring a
PTZ camera in `getUserMedia()`. Only ideal constraints are allowed for pan,
tilt, and zoom constraints in a basic set. Using mandatory ones will cause
the returned promise to reject with `TypeError`.

```js
const videoStream = await navigator.mediaDevices.getUserMedia({
  // [NEW] Website asks to reset camera pan.
  video: { pan: 0 },
});
```

[Spec PR](https://github.com/w3c/mediacapture-image/pull/218)

## Integration with the Permissions API

Having a separate PTZ permission allows the UA to differentiate between regular
camera permissions and PTZ camera permissions as PTZ needs to be explicitly
requested as an extension to the camera permission.

The UA may group both the camera permission request and the PTZ permission
request. See mock below.

![Mock of a PTZ permission prompt](/images/ptz-prompt-mock.png)

Users can block and revoke the PTZ permission in UA settings. The UA may
also provide a way for users to block PTZ directly from the prompt. Web
developers can monitor those PTZ permission changes with the [permissions API].

The camera permission can be requested using `{name: "camera", panTiltZoom:
false}` or `{name: "camera"}` while the PTZ permission can be requested using
`{name: "camera", panTiltZoom: true}`. The latter is used in `getUserMedia()` if
`pan`, `tilt`, and `zoom` values are "true".

The example below shows how to query the current status of the PTZ permission
and monitor changes.

```js
const panTiltZoomPermissionStatus = await navigator.permissions.query({
  name: "camera",
  panTiltZoom: true,
});

if (panTiltZoomPermissionStatus.state == "granted") {
  // User has granted access to this website to control camera PTZ.
}

panTiltZoomPermissionStatus.onchange = () => {
  // User has changed PTZ permission status.
}
```

To be explicit, `{name: "camera", panTiltZoom: true}` is stronger than `{name:
"camera", panTiltZoom: false}`. It will also be possible for users to revoke the
PTZ permission by itself, while keeping the camera permission. When the camera
permission is revoked, the PTZ permission is automatically revoked as well.

The camera permission (obtained using an older version of the UA, or with
another camera) is not implicitly upgraded to the PTZ permission (even when the
hardware supports it). The permission will have to be re-requested through
`getUserMedia()` or the permissions API.

[Spec PR](https://github.com/w3c/permissions/pull/204)

## Security

Requesting the PTZ permission is gated by well-known anti-abuse mechanisms:
- starting a media session is available only in secure contexts,
- the user has to explicitly allow PTZ through a permission prompt.

The page must be visible when the website updates camera pan, tilt, and zoom
with `applyConstraints()`, otherwise it fails with `SecurityError`.

When the website actively controls camera PTZ, the browser could enhance the
existing notifications that the camera is in use in several ways:
- the tab indicator may include a preview of the camera's current [field of view]
  when the user hovers over it,
- a browser notification could be displayed when the camera has been commanded to
  move or zoom to warn the user and identify the website.

In order to prevent two websites from controlling camera PTZ at the same time,
the browser could automatically pause existing camera PTZ access when another
page wants to control it, and let web developers know by dispatching `mute`
HTMLMediaStreamTrack events.

## Fingerprinting

User fingerprinting is the practice of gathering multiple bits of user
information from multiple sources (built-in hardware, user settings, installed
peripherals, browsing data) and intersecting them together to create a unique
signature of the user, that would enable to recognize them later on, even if
they clear state from their browsers.

1. The immediate failure of a `getUserMedia` call with `TypeError`
   when using pan, tilt, and zoom mandatory constraints in a basic set (used with
   `min`, `max`, and `exact` keywords) makes sure a malicious script can't detect
   whether a PTZ camera is available on the system without prompting the user.

1. A malicious website could set pan, tilt, and zoom to minimally different values
   and scoop them later on. To mitigate this, the browser could reset pan, tilt,
   and zoom settings to a default value each time a media session starts.

1. Websites could share pan, tilt, and zoom real-time values during a media
   session. A way of mitigating this would be to allow only one top-level
   browsing context at a time to access and control camera PTZ.

## History bits

The current MediaStream Image Capture API already defines the `zoom` media track
constraint. This feature is about adding `pan` and `tilt` and finding a
consistent way for users to deal with PTZ.

## Stakeholder Feedback / Opposition

N/A

## References & acknowledgements

Many thanks for valuable feedback and advice from:
- Reilly Grant
- Rijubrata Bhaumik
- Kenneth Rohde Christiansen
- Youenn Fablet
- Jan-Ivar Bruaroey
- Eero Häkkinen


[Some cameras]: https://support.zoom.us/hc/en-us/articles/204065759-Zoom-Rooms-Camera-Controls
[MediaDevices.getUserMedia()]: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
[MediaStreamTrack.applyConstraints()]: https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/applyConstraints
[MediaStream Image Capture API]: https://w3c.github.io/mediacapture-image/
[implemented in Chrome]: https://caniuse.com/#search=imageCapture
[new "true" semantics]: https://github.com/w3c/mediacapture-image/pull/218#issuecomment-610286277
[permissions API]: https://w3c.github.io/permissions/#media-devices
[field of view]: https://info.logitech.com/vc-tech-features.html#collaboration
