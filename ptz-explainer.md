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
separate permission.

## Control camera pan/tilt

We would like to add `pan` and `tilt` to the existing property set of media
track capabilities, constraints and settings. These new constraints apply to the
live video feed. Those will also be used in `getUserMedia()` to express whether a
website wants to control camera PTZ functionality. In other words, it will be
used to request the PTZ permission, a separate camera permission, in a single
call. If the selected/connected camera does not support PTZ though, the PTZ
permission won’t be requested and may fallback to the camera permission. If the
user denies the PTZ permission, it may also fallback to the camera permission.

The [new "true" semantics] for `pan`, `tilt`, and `zoom` makes it possible to
acquire a PTZ camera in `getUserMedia()` without altering the current pan, tilt
and zoom values.

Applying PTZ constraints requires the PTZ permission to be granted as described
in the "Interaction with the Permissions API" section below. If not granted,
user will be prompted. Otherwise, the pan and tilt values passed in
`applyConstraints()` will be used to move the camera.

The example below shows how camera pan and tilt could be requested and presented
to the user.

```js
// User is prompted to grant camera PTZ access only if the camera supports PTZ.
// If the camera does not support PTZ or user denies PTZ permission, it falls
// back to a "regular" camera prompt.
const videoStream = await navigator.mediaDevices.getUserMedia({
  video: {
    // [NEW] Website asks to control camera PTZ.
    pan: true, tilt: true, zoom: true,
  }
});

// Show camera video stream to user.
const video = document.querySelector("video");
video.srcObject = videoStream;

// Get video track capabilities and settings.
const videoTrack = videoStream.getVideoTracks()[0];
const capabilities = videoTrack.getCapabilities();
const settings = videoTrack.getSettings();

// [NEW] Let the user control the camera tilt motion if the camera supports it
// and user granted access.
if ("pan" in capabilities) {
  const input = document.querySelector("input[type="range"]");
  input.min = capabilities.pan.min;
  input.max = capabilities.pan.max;
  input.step = capabilities.pan.step;
  input.value = settings.pan;
  input.oninput = async (event) => {
    // [NEW] Applying PTZ constraints requests the permission
    // descriptor `{name: "camera", panTiltZoom: true}`. Since this is already
    // granted during successful getUserMedia call above, this applyConstraints
    // call should not prompt for any new permissions.
    await videoTrack.applyConstraints({
      advanced: [{ pan: event.target.value }],
    });
  };
}

// [NEW] Let the user control the camera tilt motion if the camera supports it
// and user granted access.
if ("tilt" in capabilities) {
  // similar to the pan motion above.
}
```

[Spec PR](https://github.com/w3c/mediacapture-image/pull/218)

## Integration with the Permissions API

Having a separate PTZ permission allows the UA to differentiate between normal
camera permissions and PTZ camera permissions as PTZ needs to be explicitly
requested as an extension to the camera permission.

UA may group both the camera permission request and the PTZ permission request.
See mock below.

![Mock of a PTZ permission prompt](/images/ptz-prompt-mock.png)

The camera permission can be requested using `{name: "camera", panTiltZoom:
false}` or `{name: "camera"}` while the PTZ permission can be requested using
`{name: "camera", panTiltZoom: true}`. The latter is used in `getUserMedia()` if
`pan`, `tilt`, and `zoom` values are "true".

The example below shows how to query the current status of the PTZ permission.

```js
const panTiltZoomPermissionStatus = await navigator.permissions.query({
  name: "camera",
  panTiltZoom: true,
});

if (panTiltZoomPermissionStatus.state == "granted") {
  // User has granted access to this website to control camera PTZ.
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


[Some cameras]: https://support.zoom.us/hc/en-us/articles/204065759-Zoom-Rooms-Camera-Controls
[MediaDevices.getUserMedia()]: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
[MediaStreamTrack.applyConstraints()]: https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/applyConstraints
[MediaStream Image Capture API]: https://w3c.github.io/mediacapture-image/
[implemented in Chrome]: https://caniuse.com/#search=imageCapture
[new "true" semantics]: https://github.com/w3c/mediacapture-image/pull/218#issuecomment-610286277
