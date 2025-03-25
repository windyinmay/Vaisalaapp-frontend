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
    const calibrationInputPage = document.getElementById('calibration-input-page');
    const calibrationInputBackBtn = document.getElementById('calibration-input-back-btn');
    const calibrationInputNextBtn = document.getElementById('calibration-input-next-btn');
    const temperatureInput = document.getElementById('temperature-input');
    const humidityInput = document.getElementById('humidity-input');
    const calibrationInfo = document.getElementById('calibration-info');
    const additionalInfo = document.getElementById('additional-info');
    const sensorStatus = document.querySelector('.sensor-status');
    const calibratedPage = document.getElementById('calibrated-page');
    const maintenancePlanPage = document.getElementById('maintenance-plan-page');
    const maintenanceBackBtn = document.getElementById('maintenance-back-btn');
    const maintenanceNextBtn = document.getElementById('maintenance-next-btn');
    const maintenanceOptions = document.querySelectorAll('input[name="maintenance-option"]');
    const maintenanceIntervalPage = document.getElementById('maintenance-interval-page');
    const intervalBackBtn = document.getElementById('interval-back-btn');
    const intervalNextBtn = document.getElementById('interval-next-btn');
    const calibrationInterval = document.getElementById('calibration-interval');
    const customIntervalContainer = document.getElementById('custom-interval-container');
    const maintenanceCompletePage = document.getElementById('maintenance-complete-page');
    const completeBackBtn = document.getElementById('complete-back-btn');
    const finishBtn = document.getElementById('finish-btn');
    const instructionsPage = document.getElementById('instructions-page');
    const instructionsBackBtn = document.getElementById('instructions-back-btn');
    const mainMenu3Btn = document.getElementById('mainmenu3'); // Instructions button in welcome page
    const instructionsToolbarBtn = document.querySelector('.toolbar-item:nth-child(2)'); // Instructions in toolbar
    const installationGuidePage = document.getElementById('installation-guide-page');
    const installationGuideBackBtn = document.getElementById('installation-guide-back-btn');
    const installationGuideNextBtn = document.getElementById('installation-guide-next-btn');

    const probeMountingPage = document.getElementById('probe-mounting-page');
    const probeMountingBackBtn = document.getElementById('probe-mounting-back-btn');
    const probeMountingNextBtn = document.getElementById('probe-mounting-next-btn');
    const step1Page = document.getElementById('step1-page');
    const step1BackBtn = document.getElementById('step1-back-btn');
    const step1NextBtn = document.getElementById('step1-next-btn');
    const step2Page = document.getElementById('step2-page');
    const step2BackBtn = document.getElementById('step2-back-btn');
    const step2NextBtn = document.getElementById('step2-next-btn');
    const step3Page = document.getElementById('step3-page');
    const step3BackBtn = document.getElementById('step3-back-btn');
    const step3NextBtn = document.getElementById('step3-next-btn');
    const step4Page = document.getElementById('step4-page');
    const step4BackBtn = document.getElementById('step4-back-btn');
    const step4NextBtn = document.getElementById('step4-next-btn');
    const step56Page = document.getElementById('step5-6-page');
    const step56BackBtn = document.getElementById('step5-6-back-btn');
    const step56DoneBtn = document.getElementById('step5-6-done-btn');
    const intervalSelect = document.getElementById('calibration-interval');
    const customIntervalInput = document.getElementById('custom-interval');
    const usernameInput = document.getElementById('username');
    //const loginForm = document.getElementById('login-form');
    const setupMaintenanceOption = document.getElementById('setup-maintenance-option');
    const skipMaintenanceOption = document.getElementById('skip-maintenance-option');
    const preCalibrationOption = document.getElementById('pre-calibrated-option');
    //const intervalSelect = document.getElementById('calibration-interval');



    let currentFlow = 'setup'; // Default flow is 'setup', alternative is 'calibration'

    // Function to set app flow and update UI accordingly
    function setAppFlow(flow) {
        currentFlow = flow;

        // Update toolbar text based on flow
        if (backButton) {
            const backButtonText = backButton.querySelector('span');
            if (backButtonText) {
                backButtonText.textContent = flow === 'setup' ? 'Set up new sensor' : 'Calibrate existing sensor';
            }
        }

        // Update content visibility based on flow
        document.querySelectorAll('.flow-text').forEach(element => {
            if (element.classList.contains(flow + '-flow')) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        });

        // Update image galleries based on flow
        document.querySelectorAll('.image-gallery').forEach(gallery => {
            if (gallery.classList.contains(flow + '-flow')) {
                gallery.style.display = 'flex';
            } else {
                gallery.style.display = 'none';
            }
        });
        updateButtonsBasedOnFlow(flow);
    }


    if (backButton) {
        backButton.addEventListener('click', function () {
            showPage('welcome-page');
        });
    }

    // Set initial state based on which page is active on load
    if (document.getElementById('welcome-page').classList.contains('active')) {
        document.body.classList.add('at-welcome-page');
    } else {
        document.body.classList.remove('at-welcome-page');
    }
    if (setupMaintenanceOption) {
        setupMaintenanceOption.addEventListener('change', function () {
            if (this.checked) {
                // If "Set up maintenance plan" is selected, go directly to the interval page
                showPage('maintenance-interval-page');
            }
        });
    }

    if (skipMaintenanceOption) {
        skipMaintenanceOption.addEventListener('change', function () {
            if (this.checked) {
                // If "Skip maintenance plan" is selected, go directly to the complete page
                showPage('maintenance-complete-page');
            }
        });
    }
    if (preCalibrationOption) {
        preCalibrationOption.addEventListener('change', function () {
            if (this.checked) {
                // If "The sensor is already calibrated" is selected, go directly to the maintenance plan page
                showPage('maintenance-plan-page');
            }
        });
    }

    // NFC Info page next button
    if (nfcNextBtn) {
        nfcNextBtn.addEventListener('click', function () {
            showPage('scan-page');
        });
    }




    // Add this to your showPage function to handle special pages with no toolbar text
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

        // Update top toolbar text based on current page
        const backButtonText = document.querySelector('.back-button span');

        if (backButtonText) {
            if (pageId === 'instructions-page' ||
                pageId === 'installation-guide-page' ||
                pageId === 'probe-mounting-page' ||
                pageId === 'step1-page' ||
                pageId === 'step2-page' ||
                pageId === 'step3-page' ||
                pageId === 'step4-page' ||
                pageId === 'step5-6-page') {
                // For instructions and related pages
                backButtonText.textContent = 'Instructions';
            } else if (pageId === 'assistance-page' || pageId === 'settings-page' ||
                pageId === 'chatbot-page') {
                // For assistance and settings pages - no text
                backButtonText.textContent = '';
            } else if (pageId !== 'welcome-page') {
                // For other pages, update based on the current flow
                backButtonText.textContent = currentFlow === 'setup' ? 'Set up new sensor' : 'Calibrate existing sensor';
            }
        }

        updateProgressBar(pageId);

    }
    // Modify the login form submission handler
    //if (loginForm) {
    //    loginForm.addEventListener('submit', function (event) {
    //        event.preventDefault(); // Prevent form submission
    //        showPage('nfc-info-page'); // Changed from scan-page to nfc-info-page
    //        return false;
    //    });
    //}
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent form submission

            // Check if email is valid before proceeding
            const emailValue = usernameInput.value.trim();

            if (!validateEmail(emailValue)) {
                // If email is invalid, show error and stop
                usernameInput.classList.add('invalid-input');
                document.getElementById('email-validation-message').style.display = 'block';
                return false;
            } else {
                // If email is valid, hide error and continue
                usernameInput.classList.remove('invalid-input');
                document.getElementById('email-validation-message').style.display = 'none';
                // Now proceed to next page
                showPage('nfc-info-page');
            }
        });
    }

    function updateButtonsBasedOnFlow(flow) {
        // Update the calibratedNextBtn text
        if (calibratedNextBtn) {
            if (flow === 'calibration') {
                calibratedNextBtn.textContent = 'To main menu';
            } else {
                calibratedNextBtn.textContent = 'Next';
            }
        }
    }


    if (mainMenuBtns) {
        mainMenuBtns.forEach((btn) => {
            btn.addEventListener('click', function () {
                const flowType = this.getAttribute('data-flow');
                if (flowType) {
                    setAppFlow(flowType);
                }

                if (this.id === 'mainmenu1') { // "Set up new sensor"
                    showPage('app-overview-page');
                } else if (this.id === 'mainmenu2') { // "Calibrate existing sensor"
                    showPage('app-overview-page');
                } else if (this.id === 'mainmenu3') { // "Instructions"
                    showPage('instructions-page');
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
    let connectionCheckInterval = null;
    let lastReadingTime = 0;
    let missedReadingsCount = 0;
    let readingCounter = 0;
    const CONNECTION_TIMEOUT = 5000; // 5 seconds for initial connection
    const DISCONNECT_THRESHOLD = 10; // Increased threshold - wait longer before disconnecting
    const DISCONNECT_TIMEOUT = 5000; // 5 seconds before disconnecting

    async function startNFC() {
        // Check if Web NFC is available
        if (typeof NDEFReader === 'undefined') {
            if (nfcStatus) {
                nfcStatus.textContent = 'Web NFC is not supported in this browser';
            }
            return;
        }

        // Clear any existing interval
        if (connectionCheckInterval) {
            clearInterval(connectionCheckInterval);
            connectionCheckInterval = null;
        }

        try {
            const ndef = new NDEFReader();
            if (nfcStatus) {
                nfcStatus.textContent = 'Requesting NFC permissions...';
            }

            await ndef.scan();
            if (nfcStatus) {
                nfcStatus.textContent = 'NFC Started! Scanning for tagss...';
            }

            // Set initial connection timeout
            const timeoutId = setTimeout(() => {
                if (nfcStatus) {
                    nfcStatus.textContent = 'Connection timed out after 5 seconds';
                }
            }, CONNECTION_TIMEOUT);

            // Used to track connection state
            let isConnected = false;

            // Start connection checking interval
            connectionCheckInterval = setInterval(() => {
                const currentTime = Date.now();

                // If we were connected and haven't had a reading in DISCONNECT_TIMEOUT ms
                if (isConnected && (currentTime - lastReadingTime > DISCONNECT_TIMEOUT)) {
                    isConnected = false;
                    if (nfcStatus) {
                        nfcStatus.textContent = 'Tag disconnected';
                    }

                    // Update scan complete text
                    const scanCompleteEl = document.getElementById('scanComplete');
                    if (scanCompleteEl) {
                        scanCompleteEl.textContent = 'Sensor HMD90 disconnected - Status: Inactive';
                    }
                }
            }, 500); // Check every half second

            ndef.addEventListener("reading", (event) => {
                // Clear the timeout when a tag is found
                clearTimeout(timeoutId);

                // Update the last reading time
                lastReadingTime = Date.now();

                // Update connected state
                if (!isConnected) {
                    isConnected = true;

                    if (deviceId) {
                        deviceId.textContent = event.serialNumber;
                    }

                    if (nfcStatus) {
                        nfcStatus.textContent = 'Connected successfully';
                    }

                    // Add connection status to the scanComplete element
                    const scanCompleteEl = document.getElementById('scanComplete');
                    if (scanCompleteEl) {
                        scanCompleteEl.textContent = 'Sensor HMD90 connected - Status: Active';
                    }

                    showPage('connected-page');
                }
            });

            ndef.addEventListener("readingerror", (error) => {
                // Clear the timeout on error
                clearTimeout(timeoutId);

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


    // NFC Scanning functionality
    async function startNFCold() {
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
        const progressBarPages = ['configuration-page', 'calibration-page', 'calibration-options-page', 'calibration-input-page', 'calibrated-page',
            'maintenance-plan-page', 'maintenance-interval-page',
            'maintenance-complete-page'];

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
            } else if (pageId === 'calibration-page' || pageId === 'calibration-options-page' || pageId === 'calibration-input-page') {
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
            } else if (pageId === 'calibrated-page') {
                // First step - completed with check mark
                document.getElementById('step-config').classList.remove('current');
                document.getElementById('step-config').classList.add('completed');

                // First line - completed
                document.getElementById('line-1').classList.add('completed');

                // Second step - completed with check mark
                document.getElementById('step-calibrate').classList.remove('current');
                document.getElementById('step-calibrate').classList.add('completed');

                // Second line - completed
                document.getElementById('line-2').classList.add('completed');

                // Third step - disabled (grey, no current class)
                document.getElementById('step-maintain').classList.remove('current');
                // We don't add 'completed' to the third step as it's disabled
            } else if (pageId === 'maintenance-plan-page' || pageId === 'maintenance-interval-page') {//|| pageId === 'maintenance-complete-page'
                // First step - completed with check mark
                document.getElementById('step-config').classList.remove('current');
                document.getElementById('step-config').classList.add('completed');

                // First line - completed
                document.getElementById('line-1').classList.add('completed');

                // Second step - completed with check mark
                document.getElementById('step-calibrate').classList.remove('current');
                document.getElementById('step-calibrate').classList.add('completed');

                // Second line - completed
                document.getElementById('line-2').classList.add('completed');

                // Third step - current with dot
                document.getElementById('step-maintain').classList.add('current');
            } else {
                // First step - completed with check mark
                document.getElementById('step-config').classList.remove('current');
                document.getElementById('step-config').classList.add('completed');

                // First line - completed
                document.getElementById('line-1').classList.add('completed');

                // Second step - completed with check mark
                document.getElementById('step-calibrate').classList.remove('current');
                document.getElementById('step-calibrate').classList.add('completed');

                // Second line - completed
                document.getElementById('line-2').classList.add('completed');

                // Third step - completed
                document.getElementById('step-maintain').classList.remove('current');
                document.getElementById('step-maintain').classList.add('completed');

            }
            document.getElementById(pageId).style.paddingTop = "calc(60px + 0.45cm)";

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
            // Check current flow to determine next page
            if (currentFlow === 'calibration') {
                // For "calibrate existing sensor" flow, skip calibration-options-page
                showPage('calibration-input-page');
            } else {
                // For "setup new sensor" flow, continue to calibration-options-page
                showPage('calibration-options-page');
            }
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
                    showPage('calibration-input-page');
                } else {
                    // If "Already calibrated" is selected, maybe skip to a different page
                    showPage('maintenance-plan-page');
                }
            } else {
                // If nothing is selected, you might want to show a message
                alert('Please select an option');
            }
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

    if (calibrationInputBackBtn) {
        calibrationInputBackBtn.addEventListener('click', function () {
            // Check current flow to determine where to go back to
            if (currentFlow === 'calibration') {
                // For "calibrate existing sensor" flow, go back to calibration page (sensor dashboard)
                showPage('calibration-page');
            } else {
                // For "setup new sensor" flow, go back to calibration options page
                showPage('calibration-options-page');
            }
        });
    }

    if (calibrationInputNextBtn) {
        calibrationInputNextBtn.addEventListener('click', function () {
            // Make sensor status flash 3 times
            if (sensorStatus) {
                sensorStatus.classList.add('flare');

                // Create and add reconnect button if it doesn't exist
                let reconnectBtn = document.getElementById('reconnect-btn');
                if (!reconnectBtn) {
                    reconnectBtn = document.createElement('button');
                    reconnectBtn.id = 'reconnect-btn';
                    reconnectBtn.className = 'reconnect-btn';
                    reconnectBtn.textContent = 'Simulate Reconnect';
                    sensorStatus.parentNode.insertBefore(reconnectBtn, sensorStatus.nextSibling);

                    // Add event listener to the reconnect button
                    reconnectBtn.addEventListener('click', function () {
                        showPage('calibrated-page');
                    });
                }

                // Remove the flare effect after animation completes (approx 4 seconds)
                setTimeout(function () {
                    sensorStatus.classList.remove('flare');
                }, 4000);
            }
        });
    }

    // Calibrated page buttons
    const calibratedBackBtn = document.getElementById('calibrated-back-btn');
    if (calibratedBackBtn) {
        calibratedBackBtn.addEventListener('click', function () {
            showPage('calibration-input-page');
        });
    }

    const calibratedNextBtn = document.getElementById('calibrated-next-btn');
    if (calibratedNextBtn) {
        calibratedNextBtn.addEventListener('click', function () {
            // Only go to maintenance plan for setup flow
            if (currentFlow === 'setup') {
                showPage('maintenance-plan-page');
            } else {
                // For calibration flow, skip to main page
                showPage('welcome-page');
            }
        });
        //if (currentFlow === 'calibration') {
        //    calibratedNextBtn.textContent = 'To main menu';
        //}
    }

    function validateInputFormat(input) {
        const regex = /^-?\d{1,2}\.\d{2}$/; //minus dd.dd
        return regex.test(input.value);
    }

    function validateInputs() {
        if (temperatureInput && humidityInput) {
            const tempHasValue = temperatureInput.value.trim() !== '';
            const humidHasValue = humidityInput.value.trim() !== '';

            const tempValid = tempHasValue && validateInputFormat(temperatureInput);
            const humidValid = humidHasValue && validateInputFormat(humidityInput);

            if (tempValid && humidValid) {
                calibrationInputNextBtn.disabled = false;
            } else {
                calibrationInputNextBtn.disabled = true;
            }
        }
    }
    function validateFieldOnBlur(input, errorMessage) {
        // Don't validate empty fields
        if (input.value.trim() === '') {
            input.classList.remove('invalid-input');
            return;
        }

        // Get or create message container
        const formContainer = document.querySelector('.reference-input-container');
        let messageContainer = document.getElementById('validation-message');
        if (!messageContainer && formContainer) {
            messageContainer = document.createElement('div');
            messageContainer.id = 'validation-message';
            messageContainer.className = 'validation-message';
            formContainer.insertBefore(messageContainer, formContainer.firstChild);
        }

        // If input is invalid, show error
        if (!validateInputFormat(input)) {
            input.classList.add('invalid-input');

            // Update message container - error in black now
            if (messageContainer) {
                messageContainer.innerHTML = errorMessage;
                messageContainer.style.display = 'block';
            }
        } else {
            input.classList.remove('invalid-input');

            // Hide message container if both fields are valid or empty
            if (messageContainer &&
                (validateInputFormat(temperatureInput) || temperatureInput.value.trim() === '') &&
                (validateInputFormat(humidityInput) || humidityInput.value.trim() === '')) {
                messageContainer.style.display = 'none';
            }
        }

        // Update Next button state
        validateInputs();
    }


    // Set up event listeners
    if (temperatureInput) {
        // Only validate on input to enable/disable the Next button
        temperatureInput.addEventListener('input', validateInputs);

        // Show validation errors only when focus is lost
        temperatureInput.addEventListener('blur', function () {
            validateFieldOnBlur(temperatureInput, "Temperature must be in format: ##.## or -##.## (e.g. 23.45 or -10.25)");
        });
    }

    if (humidityInput) {
        // Only validate on input to enable/disable the Next button
        humidityInput.addEventListener('input', validateInputs);

        // Show validation errors only when focus is lost
        humidityInput.addEventListener('blur', function () {
            validateFieldOnBlur(humidityInput, "Humidity must be in format: ##.## (e.g. 45.67)");
        });
    }

    if (document.querySelector('.see-more')) {
        document.querySelector('.see-more').addEventListener('click', function () {
            document.getElementById('additional-info').classList.toggle('hidden');
            this.textContent = document.getElementById('additional-info').classList.contains('hidden') ? 'See more' : 'See less';
        });
    }

    if (document.getElementById('calibrate-option')) {
        document.getElementById('calibrate-option').addEventListener('change', function () {
            if (this.checked) {
                showPage('calibration-input-page');
            }
        });
    }
    if (maintenanceBackBtn) {
        maintenanceBackBtn.addEventListener('click', function () {
            showPage('calibrated-page');
        });
    }

    if (maintenanceNextBtn) {
        maintenanceNextBtn.addEventListener('click', function () {
            const selectedOption = document.querySelector('input[name="maintenance-option"]:checked');
            if (selectedOption) {
                if (selectedOption.value === 'setup-maintenance') {
                    showPage('maintenance-interval-page');
                } else {
                    // Skip to welcome or completion
                    showPage('maintenance-complete-page');
                }
            } else {
                // If nothing is selected, you might want to show a message
                alert('Please select an option');
            }
        });
    }

    // Add event listeners for maintenance options styling
    if (maintenanceOptions) {
        maintenanceOptions.forEach(radio => {
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

    // Add event listeners for interval page
    if (intervalBackBtn) {
        intervalBackBtn.addEventListener('click', function () {
            showPage('maintenance-plan-page');
        });
    }

    if (intervalNextBtn) {
        intervalNextBtn.addEventListener('click', function () {
            showPage('maintenance-complete-page');
        });
    }

    // Handle custom interval selection
    if (calibrationInterval) {
        calibrationInterval.addEventListener('change', function () {
            if (this.value === 'other') {
                customIntervalContainer.classList.remove('hidden');
            } else {
                customIntervalContainer.classList.add('hidden');
            }
        });
    }

    // Add event listeners for maintenance complete page
    if (completeBackBtn) {
        completeBackBtn.addEventListener('click', function () {
            const selectedOption = document.querySelector('input[name="maintenance-option"]:checked');
            if (selectedOption && selectedOption.value === 'setup-maintenance') {
                showPage('maintenance-interval-page');
            } else {
                showPage('maintenance-plan-page');
            }
        });
    }

    if (finishBtn) {
        finishBtn.addEventListener('click', function () {
            showPage('welcome-page');
        });
    }

    // If mainmenu3 button exists (Instructions from welcome page)
    if (mainMenu3Btn) {
        mainMenu3Btn.addEventListener('click', function () {
            showPage('instructions-page');
        });
    }

    // If instructions toolbar button exists
    if (instructionsToolbarBtn) {
        instructionsToolbarBtn.addEventListener('click', function () {
            showPage('instructions-page');
        });
    }

    // Instructions page back button
    if (instructionsBackBtn) {
        instructionsBackBtn.addEventListener('click', function () {
            // Go back to welcome page or previous page
            showPage('welcome-page');
        });
    }

    const resultItems = document.querySelectorAll('.result-item');
    if (resultItems) {
        resultItems.forEach(item => {
            item.addEventListener('click', function () {
                const title = this.querySelector('.result-title').textContent;

            });
        });
    }

    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            // For demo purposes only - in a real app, this would filter results
            const resultsCount = document.querySelector('.results-count');

            // Simple demo of dynamic results count based on search
            if (this.value.length > 0) {
                const count = Math.max(1, Math.min(50, this.value.length * 10));
                resultsCount.textContent = `${count} results`;
            } else {
                resultsCount.textContent = '0 results';
            }
        });
    }
    if (resultItems && resultItems.length > 0) {
        // First result item (210697 Installation Guide)
        resultItems[0].addEventListener('click', function () {
            showPage('installation-guide-page');
        });

        // Third result item (Probe Mounting)
        //if (resultItems.length > 2) {
        //    resultItems[2].addEventListener('click', function () {
        //        showPage('probe-mounting-page');
        //    });
        //}
    }

    // Installation Guide back button
    if (installationGuideBackBtn) {
        installationGuideBackBtn.addEventListener('click', function () {
            showPage('instructions-page');
        });
    }

    // Installation Guide next button
    if (installationGuideNextBtn) {
        installationGuideNextBtn.addEventListener('click', function () {
            showPage('probe-mounting-page');
        });
    }

    // Probe Mounting back button
    if (probeMountingBackBtn) {
        probeMountingBackBtn.addEventListener('click', function () {
            showPage('installation-guide-page');
        });
    }

    // Probe Mounting next button
    if (probeMountingNextBtn) {
        probeMountingNextBtn.addEventListener('click', function () {
            // Navigate to the next page or back to instructions
            showPage('step1-page');
        });
    }
    if (step1BackBtn) {
        step1BackBtn.addEventListener('click', function () {
            showPage('probe-mounting-page');
        });
    }

    if (step1NextBtn) {
        step1NextBtn.addEventListener('click', function () {
            showPage('step2-page');
        });
    }

    // Step 2 page navigation
    if (step2BackBtn) {
        step2BackBtn.addEventListener('click', function () {
            showPage('step1-page');
        });
    }

    if (step2NextBtn) {
        step2NextBtn.addEventListener('click', function () {
            showPage('step3-page');
        });
    }

    // Step 3 page navigation
    if (step3BackBtn) {
        step3BackBtn.addEventListener('click', function () {
            showPage('step2-page');
        });
    }

    if (step3NextBtn) {
        step3NextBtn.addEventListener('click', function () {
            showPage('step4-page');
        });
    }

    // Step 4 page navigation
    if (step4BackBtn) {
        step4BackBtn.addEventListener('click', function () {
            showPage('step3-page');
        });
    }

    if (step4NextBtn) {
        step4NextBtn.addEventListener('click', function () {
            showPage('step5-6-page');
        });
    }

    // Step 5-6 page navigation
    if (step56BackBtn) {
        step56BackBtn.addEventListener('click', function () {
            showPage('step4-page');
        });
    }

    if (step56DoneBtn) {
        step56DoneBtn.addEventListener('click', function () {
            showPage('instructions-page');
        });
    }
    // Function to format date as "DD Month YYYY"
    function formatDate(date) {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }




    function updateDueDate() {
        //const intervalSelect = document.getElementById('calibration-interval');
        const dueDateContainer = document.getElementById('due-date-container');

        if (!intervalSelect || !dueDateContainer) return;

        // Check if a valid option is selected
        if (!intervalSelect.value || intervalSelect.value === "") {
            dueDateContainer.classList.remove('visible');
            return;
        }

        // Show the due date container when an interval is selected
        dueDateContainer.classList.add('visible');

        let months = 6; // Default

        if (intervalSelect.value === 'other') {
            //const customIntervalInput = document.getElementById('custom-interval');
            if (customIntervalInput && customIntervalInput.value) {
                months = parseInt(customIntervalInput.value, 10);
            }
        } else {
            months = parseInt(intervalSelect.value, 10);
        }

        // Calculate due date from today
        const dueDate = new Date();
        dueDate.setMonth(dueDate.getMonth() + months);

        // Update the displayed date
        const dueDateElement = document.getElementById('calibration-due-date');
        if (dueDateElement) {
            dueDateElement.textContent = formatDate(dueDate);
        }
    }

    // This part should be in your DOMContentLoaded event handler, not inside updateDueDate:
    document.addEventListener('DOMContentLoaded', function () {
        // Initial state setup
        document.getElementById('calibration-due-date').textContent = '-- Select an interval --';

        // Event listeners
        //const intervalSelect = document.getElementById('calibration-interval');
        if (intervalSelect) {
            intervalSelect.addEventListener('change', updateDueDate);
        }

        //const customIntervalInput = document.getElementById('custom-interval');
        if (customIntervalInput) {
            customIntervalInput.addEventListener('input', updateDueDate);
        }
    });
    if (intervalSelect) {
        // Initial due date calculation
        updateDueDate();
        validateIntervalSelection();
        // Update when dropdown changes
        intervalSelect.addEventListener('change', updateDueDate);
        intervalSelect.addEventListener('change', validateIntervalSelection);

    }

    if (customIntervalInput) {
        // Update when custom interval changes
        customIntervalInput.addEventListener('input', updateDueDate);
    }
    const formGroup = usernameInput.closest('.form-group');
    const messageContainer = document.createElement('div');
    messageContainer.id = 'email-validation-message';
    messageContainer.className = 'email-validation-message';
    messageContainer.innerHTML = "Email must be in format: example@example.com";

    // Insert the message container after the username input
    formGroup.appendChild(messageContainer);

    // Function to validate email format
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Add validation on form submission
    loginForm.addEventListener('submit', function (event) {
        const emailValue = usernameInput.value.trim();

        // If email is invalid, prevent form submission
        if (!validateEmail(emailValue)) {
            event.preventDefault();
            usernameInput.classList.add('invalid-input');
            messageContainer.style.display = 'block';
            return false;
        } else {
            usernameInput.classList.remove('invalid-input');
            messageContainer.style.display = 'none';
            // Continue with existing form handler
        }
    });

    // Add validation on blur (when user leaves the input field)
    usernameInput.addEventListener('blur', function () {
        const emailValue = usernameInput.value.trim();

        // Only validate if user has entered something
        if (emailValue !== '') {
            if (!validateEmail(emailValue)) {
                usernameInput.classList.add('invalid-input');
                messageContainer.style.display = 'block';
            } else {
                usernameInput.classList.remove('invalid-input');
                messageContainer.style.display = 'none';
            }
        }
    });

    // Clear error on input
    usernameInput.addEventListener('input', function () {
        const emailValue = usernameInput.value.trim();

        // If it becomes valid while typing, remove error
        if (validateEmail(emailValue)) {
            usernameInput.classList.remove('invalid-input');
            messageContainer.style.display = 'none';
        }
    });

    function validateIntervalSelection() {
        const intervalSelect = document.getElementById('calibration-interval');
        const intervalNextBtn = document.getElementById('interval-next-btn');

        if (intervalSelect && intervalNextBtn) {
            // Check if a valid option is selected (not the disabled default option)
            if (!intervalSelect.value || intervalSelect.value === "") {
                // Disable the Next button if no valid option is selected
                intervalNextBtn.disabled = true;
            } else {
                // Enable the Next button when a valid option is selected
                intervalNextBtn.disabled = false;
            }
        }
    }
    const homeToolbarItem = document.querySelector('.toolbar-item:first-child');

    // Add click event listener to the home icon
    if (homeToolbarItem) {
        homeToolbarItem.addEventListener('click', function () {
            // Navigate to the welcome/main page
            showPage('welcome-page');
        });
    }
    const instructionsToolbarItem = document.querySelector('.toolbar-item:nth-child(2)');

    // Add click event listener to the instructions icon
    if (instructionsToolbarItem) {
        instructionsToolbarItem.addEventListener('click', function () {
            // Navigate to the instructions page
            showPage('instructions-page');
        });
    }
    // Get the bottom toolbar items
    const assistanceToolbarItem = document.querySelector('.toolbar-item:nth-child(3)');
    const settingsToolbarItem = document.querySelector('.toolbar-item:nth-child(4)');

    // Home icon - navigate to main menu
    if (homeToolbarItem) {
        homeToolbarItem.addEventListener('click', function () {
            showPage('welcome-page');
        });
    }

    // Instructions icon - navigate to instructions
    if (instructionsToolbarItem) {
        instructionsToolbarItem.addEventListener('click', function () {
            showPage('instructions-page');
        });
    }

    // Assistance icon - navigate to assistance page
    if (assistanceToolbarItem) {
        assistanceToolbarItem.addEventListener('click', function () {
            showPage('assistance-page');
        });
    }

    // Settings icon - navigate to settings page
    if (settingsToolbarItem) {
        settingsToolbarItem.addEventListener('click', function () {
            showPage('settings-page');
        });
    }

    const chatbotBtn = document.querySelector('.assistance-btn:first-child');
    if (chatbotBtn) {
        chatbotBtn.addEventListener('click', function () {
            showPage('chatbot-page');
        });
    }
    const historyLogElement = document.getElementById('history-log');
    const historyLogContentElement = document.getElementById('history-log-2');

    if (historyLogElement && historyLogContentElement) {
        const seeMoreSpan = historyLogElement.querySelector('.see-more-history');

        if (seeMoreSpan) {
            seeMoreSpan.addEventListener('click', function () {
                historyLogContentElement.classList.toggle('hidden');
                this.textContent = historyLogContentElement.classList.contains('hidden') ? 'See more' : 'See less';
            });
        }
    }
    if (historyLogElement && historyLogContentElement) {
        const caretIcon = historyLogElement.querySelector('.toggle-history');

        if (caretIcon) {
            caretIcon.addEventListener('click', function () {
                historyLogContentElement.classList.toggle('hidden');
                // Toggle between caret down and up icons
                this.classList.toggle('ph-caret-down');
                this.classList.toggle('ph-caret-up');
            });
        }
    }


});