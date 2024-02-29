(() => {
    const firstLectureUrl = document.querySelector("#edu-solution-app-curriculum > div.XUluzQXfh5EBQEQogBBI.qxuY40RjTXcdAR3xxZD0 > aside > div > div > nav.ZZKOPPvxNnQxE5G5BJUJ > ul > li:first-child > a").getAttribute("href");
    window.location.href = firstLectureUrl;
    chrome.runtime.sendMessage({ action: "executeAutomation" });
})();