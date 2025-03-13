document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const welcomePage = document.getElementById('welcome-page');
    const appOverviewPage = document.getElementById('app-overview-page');
    const loginPage = document.getElementById('login-page');
    const scanPage = document.getElementById('scan-page');
    const connectedPage = document.getElementById('connected-page');
    const loginForm = document.getElementById('login-form');
    const nfcStatus = document.getElementById('nfc-status');
    const deviceId = document.getElementById('device-id');
    const skipNfcBtn = document.getElementById('skip-nfc-btn');
    const startScanBtn = document.getElementById('start-scan-btn');
    const skipInstructionsBtn = document.getElementById('skip-instructions-btn');
    const mainMenuBtns = document.querySelectorAll('#welcome-page .btn');
    const backButton = document.querySelector('.back-button');
    const nfcInfoPage = document.getElementById('nfc-info-page');
    const nfcNextBtn = document.getElementById('nfc-next-btn');
    const configurationPage = document.getElementById('configuration-page');
    const backBtn = document.getElementById('back-btn');
    const nextBtn = document.getElementById('next-btn');
    const calibrationPage = document.getElementById('calibration-page');
    const calibrationBackBtn = document.getElementById('calibration-back-btn');
    const calibrationNextBtn = document.getElementById('calibration-next-btn');
    const calibrationOptionsPage = document.getElementById('calibration-options-page');
    const calibOptionsBackBtn = document.getElementById('calib-options-back-btn');
    const calibOptionsNextBtn = document.getElementById('calib-options-next-btn');
    const radioOptions = document.querySelectorAll('.radio-option input[type="radio"]');




    if (backButton) {
        backButton.addEventListener('click', function () {
            showPage('welcome-page');
        });
    }




    // Call this function when changing pages
    //const originalShowPage = window.showPage || function () { };
    //window.showPage = function (pageId) {
    //    originalShowPage(pageId);
    //    updateTopToolbarText();    };



    // Set initial state based on which page is active on load
    if (document.getElementById('welcome-page').classList.contains('active')) {
        document.body.classList.add('at-welcome-page');
    } else {
        document.body.classList.remove('at-welcome-page');
    }

    // Update the showPage function to manage the body class
    function showPage(pageId) {
        // Hide all pages by removing active class
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show the specified page by adding active class
        const pageToShow = document.getElementById(pageId);
        if (pageToShow) {
            pageToShow.classList.add('active');
        }

        // Update body class to control toolbar visibility
        if (pageId === 'welcome-page') {
            document.body.classList.add('at-welcome-page');
        } else {
            document.body.classList.remove('at-welcome-page');
        }
        updateProgressBar(pageId);
    }
    // NFC Info page next button
    if (nfcNextBtn) {
        nfcNextBtn.addEventListener('click', function () {
            showPage('scan-page');
        });
    }

    // Modify the login form submission handler
    // Replace the existing login form event listener (around line 75) with this:
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent form submission
            showPage('nfc-info-page'); // Changed from scan-page to nfc-info-page
            return false;
        });
    }
    // Set up event listeners for welcome page buttons
    if (mainMenuBtns) {
        mainMenuBtns.forEach((btn, index) => {
            btn.addEventListener('click', function () {
                if (index === 0) { // "Set up new sensor"
                    showPage('app-overview-page');
                } else if (index === 1) { // "Calibrate existing sensor"
                    showPage('login-page');
                } else if (index === 2) { // "Instructions"
                    showPage('app-overview-page');
                }
            });
        });
    }


    // Skip instructions button
    if (skipInstructionsBtn) {
        skipInstructionsBtn.addEventListener('click', function () {
            showPage('login-page');
        });
    }



    // Start scan button - initiate NFC scanning
    if (startScanBtn) {
        startScanBtn.addEventListener('click', function () {
            startNFC();
        });
    }

    // Skip NFC button - just go to the connected page
    if (skipNfcBtn) {
        skipNfcBtn.addEventListener('click', function () {
            if (deviceId) {
                deviceId.textContent = "NO-NFC-USED";
            }
            showPage('connected-page');
        });
    }

    // Done button
    const doneBtn = document.getElementById('done-btn');
    if (doneBtn) {
        doneBtn.addEventListener('click', function () {
            showPage('configuration-page');
        });
    }
    if (backBtn) {
        backBtn.addEventListener('click', function () {
            showPage('connected-page');
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            showPage('calibration-page');
        });
    }

    // NFC Scanning functionality
    async function startNFC() {
        // Check if Web NFC is available
        if (typeof NDEFReader === 'undefined') {
            if (nfcStatus) {
                nfcStatus.textContent = 'Web NFC is not supported in this browser';
            }
            return;
        }

        try {
            const ndef = new NDEFReader();
            if (nfcStatus) {
                nfcStatus.textContent = 'Requesting NFC permissions...';
            }

            await ndef.scan();
            if (nfcStatus) {
                nfcStatus.textContent = 'NFC Started! Scanning for tags...';
            }

            ndef.addEventListener("reading", (event) => {
                if (deviceId) {
                    deviceId.textContent = event.serialNumber;
                }
                showPage('connected-page');
            });

            ndef.addEventListener("readingerror", (error) => {
                if (nfcStatus) {
                    nfcStatus.textContent = `Error reading tag: ${error.message}`;
                }
            });

        } catch (error) {
            let errorMessage = `Error: ${error.name}`;
            if (error.name === 'NotAllowedError') {
                errorMessage += ' - NFC permission denied';
            } else if (error.name === 'NotSupportedError') {
                errorMessage += ' - NFC not supported on this device';
            } else {
                errorMessage += ` - ${error.message}`;
            }
            if (nfcStatus) {
                nfcStatus.textContent = errorMessage;
            }
        }
    }
    // Modify the updateProgressBar function with the correct step IDs
    function updateProgressBar(pageId) {
        const progressBarContainer = document.getElementById('progress-bar-container');

        // Pages that should show the progress bar
        const progressBarPages = ['configuration-page', 'calibration-page', 'calibration-options-page'];

        // Show/hide progress bar based on current page
        if (progressBarPages.includes(pageId)) {
            progressBarContainer.classList.remove('hidden');
            document.getElementById(pageId).classList.add('with-progress-bar');

            // Update step status based on current page
            if (pageId === 'configuration-page') {
                // First step - current with dot
                document.getElementById('step-config').classList.remove('completed');
                document.getElementById('step-config').classList.add('current');

                // Lines and other steps - inactive
                document.getElementById('line-1').classList.remove('completed');
                document.getElementById('step-calibrate').classList.remove('current', 'completed');
                document.getElementById('step-maintain').classList.remove('completed', 'current');
                document.getElementById('line-2').classList.remove('completed');
            } else if (pageId === 'calibration-page' || pageId === 'calibration-options-page') {
                // First step - completed with check mark
                document.getElementById('step-config').classList.remove('current');
                document.getElementById('step-config').classList.add('completed');

                // First line - completed
                document.getElementById('line-1').classList.add('completed');

                // Second step - current with dot
                document.getElementById('step-calibrate').classList.add('current');
                document.getElementById('step-calibrate').classList.remove('completed');

                // Third step and second line - inactive
                document.getElementById('line-2').classList.remove('completed');
                document.getElementById('step-maintain').classList.remove('current', 'completed');
            }
            document.getElementById(pageId).style.paddingTop = "calc(60px + 2cm)";

        } else {
            progressBarContainer.classList.add('hidden');
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('with-progress-bar');
            });
        }
    }
    function updateProgressBarold1(pageId) {
        const progressBarContainer = document.getElementById('progress-bar-container');

        // Pages that should show the progress bar
        const progressBarPages = ['configuration-page', 'calibration-page'];

        // Show/hide progress bar based on current page
        if (progressBarPages.includes(pageId)) {
            progressBarContainer.classList.remove('hidden');
            document.getElementById(pageId).classList.add('with-progress-bar');

            // Update step status based on current page
            if (pageId === 'configuration-page') {
                // First step - current with dot
                document.getElementById('step-config').classList.remove('completed');
                document.getElementById('step-config').classList.add('current');

                // Lines and other steps - inactive
                document.getElementById('line-1').classList.remove('completed');
                document.getElementById('step-calibrate').classList.remove('current', 'completed');
                document.getElementById('step-maintain').classList.remove('completed', 'current');
                document.getElementById('line-2').classList.remove('completed');
            } else if (pageId === 'calibration-page') {
                // First step - completed with check mark
                document.getElementById('step-config').classList.remove('current');
                document.getElementById('step-config').classList.add('completed');

                // First line - completed
                document.getElementById('line-1').classList.add('completed');

                // Second step - current with dot
                document.getElementById('step-calibrate').classList.add('current');
                document.getElementById('step-calibrate').classList.remove('completed');

                // Third step and second line - inactive
                document.getElementById('line-2').classList.remove('completed');
                document.getElementById('step-maintain').classList.remove('current', 'completed');
            }
            document.getElementById(pageId).style.paddingTop = "calc(60px + 2cm)";

        } else {
            progressBarContainer.classList.add('hidden');
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('with-progress-bar');
            });
        }
    }
    function updateProgressBarold(pageId) {
        const progressBarContainer = document.getElementById('progress-bar-container');

        // Pages that should show the progress bar
        const progressBarPages = ['configuration-page', 'calibration-page'];

        // Show/hide progress bar based on current page

        if (progressBarPages.includes(pageId)) {
            progressBarContainer.classList.remove('hidden');
            document.getElementById(pageId).classList.add('with-progress-bar');

            // Update step status based on current page
            if (pageId === 'configuration-page') {
                // First step - current with dot
                document.getElementById('step-scan').classList.remove('completed');
                document.getElementById('step-scan').classList.add('current');

                // Lines and other steps - inactive
                document.getElementById('line-1').classList.remove('completed');
                document.getElementById('step-config').classList.remove('current', 'completed');
                document.getElementById('step-calibrate').classList.remove('completed', 'current');
                document.getElementById('line-2').classList.remove('completed');
            } else if (pageId === 'calibration-page') {
                // First step - completed
                document.getElementById('step-scan').classList.remove('current');
                document.getElementById('step-scan').classList.add('completed');

                // First line - completed
                document.getElementById('line-1').classList.add('completed');

                // Second step - current
                document.getElementById('step-config').classList.add('current');
                document.getElementById('step-config').classList.remove('completed');

                // Third step and second line - inactive
                document.getElementById('line-2').classList.remove('completed');
                document.getElementById('step-calibrate').classList.remove('current', 'completed');
            }
            document.getElementById(pageId).style.paddingTop = "calc(60px + 2cm)";

        } else {
            progressBarContainer.classList.add('hidden');
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('with-progress-bar');
            });
        }
    }
    const activePage = document.querySelector('.page.active');
    if (activePage) {
        updateProgressBar(activePage.id);
    }

    if (calibrationBackBtn) {
        calibrationBackBtn.addEventListener('click', function () {
            showPage('configuration-page');
        });
    }

    if (calibrationNextBtn) {
        calibrationNextBtn.addEventListener('click', function () {
            showPage('welcome-page'); // Change this to your next page
        });
    }
    if (calibOptionsBackBtn) {
        calibOptionsBackBtn.addEventListener('click', function () {
            showPage('calibration-page');
        });
    }

    if (calibOptionsNextBtn) {
        calibOptionsNextBtn.addEventListener('click', function () {
            // Check which option is selected
            const selectedOption = document.querySelector('input[name="calibration-option"]:checked');
            if (selectedOption) {
                if (selectedOption.value === 'calibrate') {
                    // If "Calibrate" is selected, go to next calibration step
                    showPage('welcome-page'); // Change this to your next page
                } else {
                    // If "Already calibrated" is selected, maybe skip to a different page
                    showPage('welcome-page'); // Change this based on your flow
                }
            } else {
                // If nothing is selected, you might want to show a message
                alert('Please select an option');
            }
        });
    }

    // Update the calibrationNextBtn click handler to go to the new page
    if (calibrationNextBtn) {
        calibrationNextBtn.addEventListener('click', function () {
            showPage('calibration-options-page');
        });
    }

    // Add event listeners for radio option styling
    if (radioOptions) {
        radioOptions.forEach(radio => {
            radio.addEventListener('change', function () {
                // Remove selected class from all options
                document.querySelectorAll('.radio-option').forEach(option => {
                    option.classList.remove('selected');
                });

                // Add selected class to the parent of the checked radio
                if (this.checked) {
                    this.closest('.radio-option').classList.add('selected');
                }
            });
        });
    }


});