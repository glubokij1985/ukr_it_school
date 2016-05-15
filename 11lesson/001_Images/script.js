function preload(images) {
        var i = 0;
        var imageArray = new Array();
        imageArray = images.split(',');
        var imageObj = new Image();
        for ( i=0; i <= imageArray.length-1; i++) {
            document.write('<img src="' + imageArray[i] + '" />');
            imageObj.src = imageArray[i];
        };
};