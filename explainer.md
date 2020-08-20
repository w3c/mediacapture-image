# Explainer: MediaCapture-Image

## Authors:

- rijubrata.bhaumik@intel.com

## Participate

- https://github.com/w3c/mediacapture-image/issues

## Introduction

Cameras on client platforms like mobile devices, tablets and laptops are increasingly adding advanced features. In many cases, users do use external cameras when the inbuilt cameras are not delivering the required experience, say on a video call. This specification exposes some of the advanced photography primitives in a standards compliant manner using media track constraints in [MediaDevices.getUserMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
). For manipulating video related capabilities, current settings and constraints are done via [MediaStreamTrack.applyConstraints()](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/applyConstraints). Photo-specific capabilities and current settings can be retrieved via [getPhotoCapabilities()](https://w3c.github.io/mediacapture-image/#dom-imagecapture-getphotocapabilities)/[getPhotoSettings()](https://w3c.github.io/mediacapture-image/#dom-imagecapture-getphotosettings) and configured via takePhoto()'s PhotoSettings argument. The produced image can be in the form of a [Blob](https://www.w3.org/TR/FileAPI/#dfn-Blob) or as a [ImageBitmap](https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html#imagebitmap).


## Goals

The [MediaStream Image Capture API](https://w3c.github.io/mediacapture-image/) has been [implemented in Chrome](https://caniuse.com/#search=imageCapture) since 2017. The specification is an extension of the [Media Capture and Streams](https://w3c.github.io/mediacapture-main/) where we specify advanced features related to camera and photography as a set of constrainable properties, with capabilities, constraints and settings. Most camera applications are written in native technologies to delight users with advanced use cases like controlling `exposureTime`, `focalDistance`, etc. This specification tries to bridge the gap between what is allowed on a native platform and what is exposed to the Web Platform with respect to camera capabilities. Even more advanced cameras have Pan, Tilt and Zoom support. We support those capabilities also keeping in mind the privacy and security nuances those entail and delight users of applications like video conferencing with use cases not possible before on the Web Platform.


## Methods

[takePhoto()](https://w3c.github.io/mediacapture-image/#dom-imagecapture-takephoto) returns a captured image encoded in the form of a [Blob](https://www.w3.org/TR/FileAPI/#dfn-Blob), whereas [grabFrame()](https://w3c.github.io/mediacapture-image/#dom-imagecapture-grabframe) returns a snapshot of the track video feed in the form of a non-encoded [ImageBitmap](https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html#imagebitmap). takePhoto() produces the result of a single photographic exposure using the video capture device sourcing the track and including any PhotoSettings configured, returning an encoded image in the form of a Blob if successful. grabFrame() takes a snapshot of the live video being held in track, returning an ImageBitmap if successful. Ideally takePhoto could produce the highest quality image the platform can allow for a still photograph.

## API example

```js
let imageCapture;

async function getMedia() {
  try {
    const mediastream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    const video = document.querySelector("video");
    video.srcObject = mediastream;

    const track = mediastream.getVideoTracks()[0];
    imageCapture = new ImageCapture(track);

    const capabilities = track.getCapabilities();
    // Check whether focus distance is supported or not.
    if (!capabilities.focusDistance) return;

    // Map focus distance to a slider element.
    const input = document.querySelector('input[type="range"]');
    input.min = capabilities.focusDistance.min;
    input.max = capabilities.focusDistance.max;
    input.step = capabilities.focusDistance.step;
    input.value = track.getSettings().focusDistance;

    input.oninput = async (event) => {
      try {
        await track.applyConstraints({
          focusMode: "manual",
          focusDistance: event.target.value,
        });
      } catch (err) {
        console.error("applyConstraints() failed: ", err);
      }
    };
  } catch (err) {
    console.error(err);
  }
}

async function takePhoto() {
  try {
    const blob = await imageCapture.takePhoto();
    console.log("Photo taken: " + blob.type + ", " + blob.size + "B");

    const image = document.querySelector("img");
    image.src = URL.createObjectURL(blob);
  } catch (err) {
    console.error("takePhoto() failed: ", err);
  }
}
```

## Constrainable Properties

This specification allows web developers to read and constrain various properties in a modern webcam like `whiteBalanceMode`, `exposureMode`, `focusMode`, `exposureMode`, `pointsOfInterest`, `exposureCompensation`, `exposureTime`, `colorTemperature`, `iso`, `brightness`, `contrast`, `pan`, `saturation`, `sharpness`, `focalDistance`, `tilt`, `zoom` and  `torch` if there is support in the target platform.




## Stakeholder Feedback / Opposition

N/A

## References & acknowledgements

Many thanks for valuable feedback and advice from:
- François Beaufort
- Eero Häkkinen

