# Image Capturing for the Web :camera:

[![Build Status](https://travis-ci.org/w3c/picture-in-picture.svg?branch=master)](https://travis-ci.org/w3c/picture-in-picture)
[![WPT Chrome](https://wpt-badge.glitch.me/?product=chrome&prefix=/mediacapture-image/)](https://wpt.fyi/results/mediacapture-image)
[![WPT Firefox](https://wpt-badge.glitch.me/?product=firefox&prefix=/mediacapture-image/)](https://wpt.fyi/results/mediacapture-image)
[![WPT Safari](https://wpt-badge.glitch.me/?product=safari&prefix=/mediacapture-image/)](https://wpt.fyi/results/mediacapture-image)
[![IRC #webrtc](https://img.shields.io/badge/IRC-%23webrtc-1e72ff.svg?style=plastic)](https://www.irccloud.com/invite?channel=%23webrtc&amp;hostname=irc.w3.org&amp;port=6667)

This document specifies methods and camera settings to produce photographic image capture.

Specification and Samples
-------------
* [Image Capture (a.k.a. MediaStream Image Capture) Specification](https://w3c.github.io/mediacapture-image/), including code samples.
* [Implementation Status](implementation-status.md) describes various browser support on platforms, hardware compatibility, etc.
* [Sample code](https://rawgit.com/Miguelao/demos/master/imagecapture.html)
* [Image Capture polyfill](https://github.com/dandv/imagecapture)

Notes on bikeshedding :bicyclist:
--------------

To compile `index.bs` into `index.html` , I'm using the online compiler:

```
curl https://api.csswg.org/bikeshed/ -F file=@index.bs -F force=1 > index.html
```

if the produced file has a strange size (i.e. zero, a few KBs), then something went terribly wrong; run instead:

```
curl https://api.csswg.org/bikeshed/ -F file=@index.bs -F output=err
```

and try to figure out why `bikeshed` did not like the `.bs` :'(
