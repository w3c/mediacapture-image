var respecConfig = {
    specStatus: "ED",
    shortName:  "image-capture",
    editors: [{
        name:       "Giridhar Mandyam",
        company:    "Qualcomm Innovation Center, Inc",
        companyURL: "https://www.qualcomm.com/about/businesses/quicinc",
        w3cid:      54271
    }, {
        name: "Miguel Casas-Sanchez",
        company: "Google, Inc.",
        companyURL: "http://www.google.com",
        url: "mailto:mcasas@chromium.org?subject=Image%20Capture%20W3C%20Spec",
        w3cid: 82825
    }],
    // publishDate:  "2013-11-08",
    edDraftURI:   "https://w3c.github.io/mediacapture-image/",
    copyrightStart: 2012,
    noIDLIn:  true,
    wg:           ["Device and Sensors Working Group", "Web Real-Time Communications Working Group"],
    wgURI:        ["https://www.w3.org/2009/dap/", "https://www.w3.org/2011/04/webrtc/"],
    wgPublicList: "public-media-capture",
    wgPatentURI:  ["https://www.w3.org/2004/01/pp-impl/43696/status", "https://www.w3.org/2004/01/pp-impl/47318/status"],
    isRecTrack:   false,
    isNoTrack:    true,
    format:       'markdown',

    otherLinks: [
    {
      key: "Participate",
      data: [{
        value: "Mailing list",
        href: "https://lists.w3.org/Archives/Public/public-media-capture/"
      }, {
        value: "Browse open issues",
        href: "https://github.com/w3c/mediacapture-image/issues"
      }, {
        value: "File a bug",
        href: "https://github.com/w3c/mediacapture-image/issues/new"
      }]
    }, {
      key: 'Implementation',
      data: [{
        value: 'Implementation Status',
        href: 'https://github.com/w3c/mediacapture-image/blob/gh-pages/implementation-status.md'
      }, {
        value: 'Can I use Image Capture?',
        href: 'http://caniuse.com/#feat=imagecapture'
      }]
    }],

    localBiblio: {
      "ISO12232": {
        title: "Photography -- Digital still cameras -- Determination of exposure index, ISO speed ratings, standard output sensitivity, and recommended exposure index",
        href: "http://www.iso.org/iso/catalogue_detail.htm?csnumber=37777",
        date: "15 April 2006",
        publisher: "ISO/IEC",
      },
      "UVC": {
        title: "USB Device Class Definition for Video Devices",
        href: "http://www.usb.org/developers/docs/devclass_docs/",
        date: "9 August 2012",
        publisher: "USB Implementers Forum Inc.",
      }
    }
};
