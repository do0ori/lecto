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
    const VIDEO_LENGTH = "#vjs_video_3 > div.vjs-control-bar > div.vjs-duration.vjs-time-control.vjs-control > span.vjs-duration-display";
    const LECTURE_COMPLETE_SELECTOR = "#edu-solution-app-curriculum > div.XUluzQXfh5EBQEQogBBI.qxuY40RjTXcdAR3xxZD0 > footer > div > div > span";

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
            console.log("이어서 보기");
        } else {
            const videoElement = document.querySelector(VIDEO_SELECTOR);
            videoElement.play();
            console.log("플레이");
        }
    };

    const getVideoLength = () => {
        const videoElement = document.querySelector(VIDEO_LENGTH);
        const time = videoElement.innerText.split(':').map(Number);
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

    /**
     * Execution
     */
    console.log("automation.js 실행")
    if (isTarget()) {
        playVideo();
        const videoLength = getVideoLength();
        await sleep(videoLength);
        while (isTarget()) {
            await sleep(30);
        }
    }

    if (isLastLecture()) {
        chrome.runtime.sendMessage({ action: "endAutomation" });
    } else {
        clickNextLectureBtn();
        chrome.runtime.sendMessage({ action: "executeAutomation", lectureCount: getLectureCount() });
    }
})();