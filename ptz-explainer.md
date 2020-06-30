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
the PTZ permission, the UA will either reject the `getUserMedia()` call if PTZ
constraints are required, or fall back to the camera permission if PTZ constraints
are defined as advanced constraints.

The [new "true" semantics] for `pan`, `tilt`, and `zoom` makes it possible to
acquire a PTZ camera in `getUserMedia()` without altering the current pan, tilt
and zoom values. If the PTZ permission is not granted, the `pan`, `tilt`, and
`zoom` are not available as capabilities, settings, and constraints, even if the
camera supports PTZ.

Applying PTZ constraints requires the PTZ permission to be granted as described
in the "Interaction with the Permissions API" section below. The `pan` and `tilt`
values passed in `applyConstraints()` will be used to move the camera.

The example below shows how camera pan and tilt could be requested and presented
to the user.

```js
// User is prompted to grant both camera and PTZ access in a single call.
// If the camera does not support PTZ or user denies PTZ permission, it falls
// back to a "regular" camera prompt as PTZ constraints are defined as advanced
// constraints.
const videoStream = await navigator.mediaDevices.getUserMedia({
  video: {
    advanced: [{
      // [NEW] Website asks to control camera PTZ as well.
      pan: true, tilt: true, zoom: true,
    }],
  },
});

// Show camera video stream to user.
const video = document.querySelector("video");
video.srcObject = videoStream;

// Get video track capabilities and settings.
const videoTrack = videoStream.getVideoTracks()[0];
const capabilities = videoTrack.getCapabilities();
const settings = videoTrack.getSettings();

// [NEW] Let the user control the camera tilt motion if the camera supports it
// and user has granted PTZ access.
if ("pan" in capabilities) {
  const input = document.querySelector("input[type=range]");
  input.min = capabilities.pan.min;
  input.max = capabilities.pan.max;
  input.step = capabilities.pan.step;
  input.value = settings.pan;
  input.oninput = async (event) => {
    await videoTrack.applyConstraints({
      advanced: [{ pan: event.target.value }],
    });
  };
}

// [NEW] Let the user control the camera tilt motion if the camera supports it
// and user has granted PTZ access.
if ("tilt" in capabilities) {
  // similar to the pan motion above.
}
```

The example below shows how camera pan could be reset when acquiring a
PTZ camera in `getUserMedia()`.

```js
// User is prompted to grant both camera and PTZ access in a single call.
// If the camera does not support PTZ or user denies PTZ permission, it fails
// as PTZ constraints are required.
const videoStream = await navigator.mediaDevices.getUserMedia({
  // [NEW] Website asks to reset camera pan.
  video: { pan: 1 },
});
```

[Spec PR](https://github.com/w3c/mediacapture-image/pull/218)

## Integration with the Permissions API

Having a separate PTZ permission allows the UA to differentiate between normal
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
`getUserMedia()` or `applyConstraints()`.

[Spec PR](https://github.com/w3c/permissions/pull/204)

## Fingerprinting

User fingerprinting is the practice of gathering multiple bits of user
information from multiple sources (built-in hardware, user settings, installed
peripherals, browsing data) and intersecting them together to create a unique
signature of the user, that would enable to recognize them later on, even if
they clear state from their browsers.

1. Pan, tilt, and zoom hardware capabilities (e.g. `min`, `max`, `step`) and
   current settings are not exposed to websites unless the user explicitely
   grants PTZ permission. However it is possible to use pan, tilt, and zoom
   mandatory constraints so that the immediate failure of a `getUserMedia` call
   with `OverConstrainedError` returns information about camera devices on the
   system without prompting the user. This increases the surface available for
   fingerprinting as already raised in the [Media Capture and Streams
   spec](https://www.w3.org/TR/mediacapture-streams/#privacy-and-security-considerations).
   The browser could mitigate this issue by always treating pan, tilt, and zoom
   constraints as "ideal" in `getUserMedia` as suggested in
   [#229](https://github.com/w3c/mediacapture-image/issues/229).
   
1. A malicious website could set pan, tilt, and zoom to minimally different values
   and scoop them later on. To mitigate this, the browser could reset pan, tilt,
   and zoom settings to a default value each time a media session starts.

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


[Some cameras]: https://support.zoom.us/hc/en-us/articles/204065759-Zoom-Rooms-Camera-Controls
[MediaDevices.getUserMedia()]: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
[MediaStreamTrack.applyConstraints()]: https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/applyConstraints
[MediaStream Image Capture API]: https://w3c.github.io/mediacapture-image/
[implemented in Chrome]: https://caniuse.com/#search=imageCapture
[new "true" semantics]: https://github.com/w3c/mediacapture-image/pull/218#issuecomment-610286277
[permissions API]: https://w3c.github.io/permissions/#media-devices
