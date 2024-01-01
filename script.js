document.addEventListener('DOMContentLoaded', () => {

    // Slick Functionality
    $('.input-selection').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        centerMode: true,
        centerPadding: '0px',
        adaptiveHeight: true,
    });
    $('.input-selection').on('afterChange', onSlideChange);

    const toggleButton = document.getElementById("toggleButton");
    const root = document.documentElement;

    // Check if user's preference is stored
    const darkModeEnabled = localStorage.getItem("darkModeEnabled");

    // Set the initial mode based on user's preference
    if (darkModeEnabled === "true") {
        root.classList.add("darkmode");
        toggleButton.classList.toggle("inactive");
        toggleButton.classList.toggle("active");
        toggleButton.textContent = "Light Mode";
    }

    toggleButton.addEventListener("click", () => {
        root.classList.toggle("darkmode");
        toggleButton.classList.toggle("active");
        toggleButton.classList.toggle("inactive");

        // Store user's preference in localStorage
        const isDarkMode = root.classList.contains("darkmode");
        localStorage.setItem("darkModeEnabled", isDarkMode);

        if (toggleButton.classList.contains("active")) {
            toggleButton.textContent = "Light Mode";
          } else {
            toggleButton.textContent = "Dark Mode";
        }
      });

      // Define scroll links
      const scrollLinks = document.querySelectorAll('.scroll-link');

      scrollLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1); // Remove the "#" character
          const targetSection = document.getElementById(targetId);
    
          if (targetSection) {
            targetSection.scrollIntoView({
              behavior: 'instant'
            });
          }
        });
      });
    
    // Menu/navigation controls
    const navigationButton = document.getElementById("jumpTo");
    const navigation = document.getElementById("navigation");

    navigationButton.addEventListener("mouseenter", (event) => {
        navigation.style.display = 'flex';
    });

    navigation.addEventListener("mouseleave", (event) => {
        navigation.style.display = 'none';
    });

    document.addEventListener('mouseout', function(event) {
        if (event.relatedTarget === null) {
            navigation.style.display = 'none';
        }
    });

    const originalSection = document.getElementById("navigation");
    const clonedSection = document.getElementById("menu");
    const clonedContent = originalSection.cloneNode(true);
    
    clonedContent.style.display = "flex";
    clonedSection.appendChild(clonedContent);

    // Junction Slider
    var currentImage = document.getElementById('current-junction-image');
    junctionSliderContainer.addEventListener('input', function () {

        var imageNumber = Math.round((junctionSliderContainer.value - 1)/8 * 80);

        currentImage.src = 'images/interpolation/interpolation_' + imageNumber + '.png';
    });

    // ELD Slider
    var ELDImages = document.querySelectorAll('.ELDImage');

    ELDImageSlider.addEventListener('input', function () {

        var sliderValue = ELDImageSlider.value;

        const xOffset = 0;
        const yOffset = -109*(sliderValue);//-100*(Math.round(sliderValue)-1);

        // currentELDImage.style.transform = `translate(${xOffset}px, ${yOffset}%)`;
        ELDImages.forEach(function(image) {
            image.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });

    });

    // Thickness Slider
    var currentThicknessImage = document.getElementById('current-thickness-image');
    thicknessSlider.addEventListener('input', function () {

        var imageNumber = Math.round(thicknessSlider.value);

        currentThicknessImage.src = 'images/upsampling/thickened/thickened_boundaries_' + imageNumber + '.png';
    });

    // Citation Copy Button
    const copyButton = document.getElementById('copyButton');

    copyButton.addEventListener('click', () => {
        const code = document.getElementById('myCode').textContent;

        if (navigator.clipboard) {
            navigator.clipboard.writeText(code)
        } else {
            // Fallback for browsers without clipboard API support
            console.log('Clipboard API not available.');
        }
    });

    // Twentytwenty
    $('#before-after').imagesLoaded( function() {
        $('#before-after').twentytwenty({
            no_overlay: true, //Do not show the overlay with before and after
        });
    });

    function changeImageFolder(newFolderPath) {
        // Get all image elements you want to update
        const imageElements = DemoGrid.querySelectorAll('img');
      
        // Loop through the image elements and update their src attributes
        imageElements.forEach((img) => {
          const originalSrc = img.src;
          const originalFilename = originalSrc.split('/').pop(); // Extract the original filename
          
          if (originalFilename !== "interactive.png") {
            img.src = newFolderPath + '/' + originalFilename; // Update the src with the new folder path and original filename
            }

          
        });
      }

    // Function to center the zoomed image
    function centerZoomedImage(Image) {
        // 19: distance in pixels between each patch
        // 200: width of the main image

        const xOffset = -19*(98) - 1;
        const yOffset = -19*(98) - 1;

        Image.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    }

    // Function to position the custom cursor in the center of the image
    const positionCursorAtCenter = (image, cursor, borderWidth, boxSize) => {
        
        const rect = image.getBoundingClientRect();

        // Center coordinates of the image
        const centerX = rect.width / 2 - borderWidth - boxSize / 2;
        const centerY = rect.height / 2 - borderWidth - boxSize / 2;

        // Set the custom cursor position
        cursor.style.left = (centerX) + 'px';
        cursor.style.top = (centerY) + 'px';
        cursor.style.display = 'block';
        cursor.style.opacity = 1; // Fade in the cursor

    };

    const moveAttention = (x, y, attentionBox, attentionImage) => {

        xt = Math.round(x)
        yt = Math.round(y)

        attentionBox.style.left = xt - 17 + 'px'
        attentionBox.style.top = yt - 17 + 'px'
        
        // Translate attention image
        xt2 = - 17*2*2*Math.round(xt * .5)
        yt2 = - 17*2*2*Math.round(yt * .5)

        attentionImage.style.transform = 'translate(' + xt2 + 'px, ' + yt2 + 'px)';
        attentionImage.style.transform = 'translate(' + xt2 + 'px, ' + yt2 + 'px)';
    }

    const centerAttention = (image, attentionBox, attentionImage) => {
        
        const rect = image.getBoundingClientRect();

        // Center coordinates of the image
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Translate attention map
        moveAttention(centerX, centerY, attentionBox, attentionImage)

    };

    // const boxSize = 5; // Size of the box
    // const borderWidth = 2; // Width of the border

    const demoBox = document.getElementById('ImageDemo');
    const mainImage = document.getElementById('imageContainerIn');
    // Note: because the overlay image covers mainImageOut1, we use its container as a tracking proxy
    const mainImageOut1 = document.getElementById('ImageContainerOut1');
    const mainImageOut2 = document.getElementById('mainImageOut2');
    const mainImageOut3 = document.getElementById('mainImageOut3');
    const attentionDemo = document.getElementById('ImageContainerOut12');
    centerAttention(mainImageOut1, attentionOverlayBox, attentionOverlayImage);
    centerAttention(attentionDemo, attentionOverlayBox2, attentionOverlayImage2);

    const zoomedImage1 = document.getElementById('zoomedImage1');
    const zoomedImage2 = document.getElementById('zoomedImage2');
    const zoomedImage3 = document.getElementById('zoomedImage3');
    const zoomedImage4 = document.getElementById('zoomedImage4');

    const cursorBox = document.getElementById('cursorBox');
    const customCursor1 = document.getElementById('customCursor1');
    const customCursor2 = document.getElementById('customCursor2');
    const customCursor3 = document.getElementById('customCursor3');
    const demoFinger = document.getElementById('demoFinger')

    // Center the image on load
    centerZoomedImage(zoomedImage1);
    centerZoomedImage(zoomedImage2);
    centerZoomedImage(zoomedImage3);
    centerZoomedImage(zoomedImage4);

    const borderWidth = 2;
    const boxSize = 5;

    // Load the cursors
    positionCursorAtCenter(mainImage, cursorBox, borderWidth, boxSize);
    positionCursorAtCenter(mainImageOut1, customCursor1, 0, 0);
    positionCursorAtCenter(mainImageOut2, customCursor2, borderWidth, boxSize);
    positionCursorAtCenter(mainImageOut3, customCursor3, borderWidth, boxSize);

    // Move all cursors simultaneously
    const moveCursors = (x, y) => {

        demoFinger.style.opacity = 0 + '%'

        x = Math.round(x)
        y = Math.round(y)

        if (x >= 4 && x <= 196 && y >= 4 && y <= 196) {
                
        // Position the boxes
        const boxSize = 5
        const borderWidth = 2

        cursorBox.style.top = (y - boxSize / 2 - borderWidth) + 'px';
        customCursor1.style.top = y + 'px';
        customCursor2.style.top = (y - boxSize / 2 - borderWidth) + 'px';
        customCursor3.style.top = (y - boxSize / 2 - borderWidth) + 'px';
        // demoFinger.style.top = y - 7 - boxSize / 2 - borderWidth + 'px';

        cursorBox.style.left = (x - boxSize / 2 - borderWidth) + 'px';
        customCursor1.style.left = x + 'px';
        customCursor2.style.left = x - boxSize / 2 - borderWidth + 'px';
        customCursor3.style.left = x - boxSize / 2 - borderWidth + 'px';
        // demoFinger.style.left = x - 7 - boxSize / 2 - borderWidth + 'px';
        
        cursorBox.style.display = 'block';
        customCursor1.style.display = 'block'; // Show the custom cursor
        customCursor2.style.display = 'block'; // Show the custom cursor
        customCursor3.style.display = 'block'; // Show the custom cursor
        // demoFinger.style.display = 'block';

        // Adjust Zoom In
        const largeImageX = -(x-1)*19 - 1;
        const largeImageY = -(y-1)*19 - 1;

        zoomedImage1.style.transform = `translate(${largeImageX}px, ${largeImageY}px)`;
        zoomedImage2.style.transform = `translate(${largeImageX}px, ${largeImageY}px)`;
        zoomedImage3.style.transform = `translate(${largeImageX}px, ${largeImageY}px)`;
        zoomedImage4.style.transform = `translate(${largeImageX}px, ${largeImageY}px)`;

        //Adjust Attention
        moveAttention(x, y, attentionOverlayBox, attentionOverlayImage);
        }

    };
    
    mainImage.addEventListener('mousemove', (event) => {
        requestAnimationFrame(() => {
            const rect = mainImage.getBoundingClientRect();
            const x = event.clientX - rect.left; 
            const y = event.clientY - rect.top;
            moveCursors(x, y);
        });
    });

    mainImageOut1.addEventListener('mousemove', (event) => {
        requestAnimationFrame(() => {
            const rect = mainImageOut1.getBoundingClientRect();
            const x = event.clientX - rect.left; 
            const y = event.clientY - rect.top;
            moveCursors(x, y);
        });
    });

    mainImageOut2.addEventListener('mousemove', (event) => {
        requestAnimationFrame(() => {
            const rect = mainImageOut2.getBoundingClientRect();
            const x = event.clientX - rect.left; 
            const y = event.clientY - rect.top;
            moveCursors(x, y);
        });
    });

    mainImageOut3.addEventListener('mousemove', (event) => {
        requestAnimationFrame(() => {
            const rect = mainImageOut3.getBoundingClientRect();
            const x = event.clientX - rect.left; 
            const y = event.clientY - rect.top;
            moveCursors(x, y);
        });
    });

    // Attention Demo
    attentionDemo.addEventListener('mousemove', (event) => {
        requestAnimationFrame(() => {
            const rect = attentionDemo.getBoundingClientRect();
            const x = event.clientX - rect.left; 
            const y = event.clientY - rect.top;
            demoFinger2.style.opacity = 0 + '%'
            moveAttention(x, y, attentionOverlayBox2, attentionOverlayImage2);
        });
    });

    attentionDemo.addEventListener('mouseleave', (event) => {
        requestAnimationFrame(() => {
            centerAttention(attentionDemo, attentionOverlayBox2, attentionOverlayImage2);
            demoFinger2.style.opacity = 100 + '%'
        });
    });

    function onSlideChange(event, slick, currentSlide) {
        console.log("Active slide changed. Current slide is: " + currentSlide);
        // Perform your operations here

        // Get the src of the active image
        var activeImageSrc = $('.slick-current img').attr('src');

        // Extract the folder name from the src
        var folderName = activeImageSrc.substring(0, activeImageSrc.lastIndexOf("/"));

        console.log("The active image is from the folder: " + folderName);
        // Additional operations with folderName
    
        changeImageFolder(folderName) 
        centerZoomedImage(zoomedImage1);
        centerZoomedImage(zoomedImage2);
        centerZoomedImage(zoomedImage3);
        centerZoomedImage(zoomedImage4);
        centerAttention(mainImageOut1, attentionOverlayBox, attentionOverlayImage);
        centerAttention(attentionDemo, attentionOverlayBox2, attentionOverlayImage2);
    
        // Load the cursors
        positionCursorAtCenter(mainImage, cursorBox, borderWidth, boxSize);
        positionCursorAtCenter(mainImageOut1, customCursor1, 0, 0);
        positionCursorAtCenter(mainImageOut2, customCursor2, borderWidth, boxSize);
        positionCursorAtCenter(mainImageOut3, customCursor3, borderWidth, boxSize);
    }

    // input1.addEventListener('click', (event) => {
    //     changeImageFolder('images/demo_image1')
    //     centerZoomedImage(zoomedImage1);
    //     centerZoomedImage(zoomedImage2);
    //     centerZoomedImage(zoomedImage3);
    //     centerZoomedImage(zoomedImage4);

    //     // Load the cursors
    //     positionCursorAtCenter(mainImage, cursorBox, borderWidth, boxSize);
    //     positionCursorAtCenter(mainImageOut1, customCursor1, 0, 0);
    //     positionCursorAtCenter(mainImageOut2, customCursor2, borderWidth, boxSize);
    //     positionCursorAtCenter(mainImageOut3, customCursor3, borderWidth, boxSize);

        
    // });
    // input2.addEventListener('click', (event) => {
    //     changeImageFolder('images/demo_image_bike') 
    //     centerZoomedImage(zoomedImage1);
    //     centerZoomedImage(zoomedImage2);
    //     centerZoomedImage(zoomedImage3);
    //     centerZoomedImage(zoomedImage4);

    //     // Load the cursors
    //     positionCursorAtCenter(mainImage, cursorBox, borderWidth, boxSize);
    //     positionCursorAtCenter(mainImageOut1, customCursor1, 0, 0);
    //     positionCursorAtCenter(mainImageOut2, customCursor2, borderWidth, boxSize);
    //     positionCursorAtCenter(mainImageOut3, customCursor3, borderWidth, boxSize);

    // });

    // input3.addEventListener('click', (event) => {
    //     changeImageFolder('images/demo_image_pinwheel') 
    //     centerZoomedImage(zoomedImage1);
    //     centerZoomedImage(zoomedImage2);
    //     centerZoomedImage(zoomedImage3);
    //     centerZoomedImage(zoomedImage4);

    //     // Load the cursors
    //     positionCursorAtCenter(mainImage, cursorBox, borderWidth, boxSize);
    //     positionCursorAtCenter(mainImageOut1, customCursor1, 0, 0);
    //     positionCursorAtCenter(mainImageOut2, customCursor2, borderWidth, boxSize);
    //     positionCursorAtCenter(mainImageOut3, customCursor3, borderWidth, boxSize);

    // });

    // input4.addEventListener('click', (event) => {
    //     changeImageFolder('images/demo_image_temple') 
    //     centerZoomedImage(zoomedImage1);
    //     centerZoomedImage(zoomedImage2);
    //     centerZoomedImage(zoomedImage3);
    //     centerZoomedImage(zoomedImage4);

    //     // Load the cursors
    //     positionCursorAtCenter(mainImage, cursorBox, borderWidth, boxSize);
    //     positionCursorAtCenter(mainImageOut1, customCursor1, 0, 0);
    //     positionCursorAtCenter(mainImageOut2, customCursor2, borderWidth, boxSize);
    //     positionCursorAtCenter(mainImageOut3, customCursor3, borderWidth, boxSize);

    // });

    demoBox.addEventListener('mouseleave', (event) => {
        requestAnimationFrame(() => {
            demoFinger.style.opacity = 100 + '%'
        });
    });

    function preloadImages(baseName, count) {
        for (let i = 0; i < count; i++) {
            const img = new Image();
            img.src = `${baseName}${i}.png`; // Assuming the images are in jpg format
        }
    }
    preloadImages('images/interpolation/interpolation_', 81);




});

