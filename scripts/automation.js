// Play video and wait until it ends, go to the next lecture
(async () => {
    /**
     * Declaration
     */
    const NEXT_LECTURE_BTN_SELECTOR = "#edu-solution-app-curriculum > div.XUluzQXfh5EBQEQogBBI.qxuY40RjTXcdAR3xxZD0 > footer > div > button:nth-child(3)";
    const LECTURE_LIST_SELECTOR = "#edu-solution-app-curriculum > div.XUluzQXfh5EBQEQogBBI.qxuY40RjTXcdAR3xxZD0 > aside > div > div > nav.ZZKOPPvxNnQxE5G5BJUJ > ul > li";
    const LECTURE_LIST_LAST_CHILD_SELECTOR = "#edu-solution-app-curriculum > div.XUluzQXfh5EBQEQogBBI.qxuY40RjTXcdAR3xxZD0 > aside > div > div > nav.ZZKOPPvxNnQxE5G5BJUJ > ul > li:last-child > a";
    const VIDEO_SELECTOR = "#vjs_video_3_html5_api";
    const VIDEO_CONTINUE_BTN_SELECTOR = "#edu-solution-app-curriculum > div.XUluzQXfh5EBQEQogBBI.qxuY40RjTXcdAR3xxZD0 > main > div.FO3gkZjDbb667BGIJhQf.mrsF_olxOOmXQsjZhwyP > div._2QIlVi2agx2d2VlfMBFg > button.z4Uv3DOSYWM5UfzblwW4.HSGtViGCETPyrEac259m.EqVvXq2OdS6BVf5UR2KQ.hBC7vWMzdxC5kl5Ms2y7.hBC7vWMzdxC5kl5Ms2y7";
    const VIDEO_DURATION = "#vjs_video_3 > div.vjs-control-bar > div.vjs-duration.vjs-time-control.vjs-control > span.vjs-duration-display";
    const CURRENT_TIME = "#vjs_video_3 > div.vjs-control-bar > div.vjs-current-time.vjs-time-control.vjs-control > span.vjs-current-time-display";
    const LECTURE_COMPLETE_SELECTOR = "#edu-solution-app-curriculum > div.XUluzQXfh5EBQEQogBBI.qxuY40RjTXcdAR3xxZD0 > footer > div > div > span";
    const VIDEO_VOLUME = "#vjs_video_3 > div.vjs-control-bar > div.vjs-volume-panel.vjs-control.vjs-volume-panel-horizontal > button > span.vjs-control-text"
    const VIDEO_SPEED_MENU = "#vjs_video_3 > div.vjs-control-bar > div.vjs-playback-rate.vjs-menu-button.vjs-menu-button-popup.vjs-control.vjs-button > button";
    const VIDEO_SPEED_1x = "#vjs_video_3 > div.vjs-control-bar > div.vjs-playback-rate.vjs-menu-button.vjs-menu-button-popup.vjs-control.vjs-button > div.vjs-menu.vjs-lock-showing > ul > li:nth-child(4)";

    const clickNextLectureBtn = () => {
        const nextBtn = document.querySelector(NEXT_LECTURE_BTN_SELECTOR);
        nextBtn.click();
    };

    const getLectureCount = () => {
        const lectureList = document.querySelectorAll(LECTURE_LIST_SELECTOR);
        return lectureList.length;
    };

    const isLastLecture = () => {
        const lastChildBackgroundColor = window.getComputedStyle(document.querySelector(LECTURE_LIST_LAST_CHILD_SELECTOR)).getPropertyValue("background-color");
        return lastChildBackgroundColor !== 'rgb(255, 255, 255)' ? true : false;
    };

    const isTarget = () => {
        // video exists && lecture is not complete
        return document.querySelector(VIDEO_SELECTOR) && document.querySelector(LECTURE_COMPLETE_SELECTOR);
    };

    const playVideo = () => {
        const videoContinueBtn = document.querySelector(VIDEO_CONTINUE_BTN_SELECTOR);
        if (videoContinueBtn) {
            videoContinueBtn.click();
        } else {
            const videoElement = document.querySelector(VIDEO_SELECTOR);
            videoElement.play();
        }
    };

    const setVideoSpeed1x = async () => {
        const videoSpeedMenu = document.querySelector(VIDEO_SPEED_MENU);
        videoSpeedMenu.click();
        // await sleep(0.5);   // Wait for the menu pops up
        const videoSpeed1x = document.querySelector(VIDEO_SPEED_1x);
        videoSpeed1x.click();
    };

    const getVideoLength = () => {
        const videoDuration = convertToSeconds(document.querySelector(VIDEO_DURATION));
        const currentTime = convertToSeconds(document.querySelector(CURRENT_TIME));
        return videoDuration - currentTime;
    };

    const convertToSeconds = (timeString) => {
        const time = timeString.innerText.split(':').map(Number);
        switch (time.length) {
            case 1:
                return time[0];
            case 2:
                return time[0] * 60 + time[1];
            case 3:
                return time[0] * 60 * 60 + time[1] * 60 + time[2];
        }
    };

    const sleep = (sec) => {
        return new Promise(resolve => setTimeout(resolve, sec * 1000));
    };

    const updateVideoVolume = (lectureSound) => {
        const videoVolume = document.querySelector(VIDEO_VOLUME);
        if (lectureSound !== false) {
            // Turn on volume
            if (videoVolume.innerText !== "음소거") {
                videoVolume.click();
            }
        } else {
            // Turn off volume
            if (videoVolume.innerText == "음소거") {
                videoVolume.click();
            }
        }
    };

    const volumeChangeHandler = (changes, area) => {
        if (area === "sync" && changes.hasOwnProperty("lectureSound")) {
            updateVideoVolume(changes.lectureSound.newValue);
        }
    };

    const moveToNextAction = () => {
        if (isLastLecture()) {
            chrome.runtime.sendMessage({ action: "endAutomation", lectureCount: getLectureCount() });
        } else {
            clickNextLectureBtn();
            chrome.runtime.sendMessage({ action: "executeAutomation" });
        }
    };

    /**
     * Execution
     */
    if (isTarget()) {
        // Send message to service worker every 20 seconds to keep it alive during automation process
        const intervalID = setInterval(() => {
            chrome.runtime.sendMessage({ action: "keepAlive" });
        }, 20000);

        playVideo();
        setVideoSpeed1x();

        // Initialize volume based on lectureSound value
        chrome.storage.sync.get("lectureSound", ({ lectureSound }) => updateVideoVolume(lectureSound));
        // Update volume when lectureSound value changes
        chrome.storage.onChanged.addListener(volumeChangeHandler);

        await sleep(0.5);   // Wait for the current time of the video to be displayed
        const videoLength = getVideoLength();
        setTimeout(async () => {
            while (isTarget()) {
                await sleep(30);
            }

            // Clean up
            clearInterval(intervalID);
            chrome.storage.onChanged.removeListener(volumeChangeHandler);

            moveToNextAction();
        }, videoLength * 1000);
    } else {
        moveToNextAction();
    }

})();