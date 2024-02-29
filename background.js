chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "prepareAutomation") {
        console.log("prepareAutomation");
        // Navigate to the first lecture page
        chrome.scripting.executeScript({
            target: { tabId: message.tabId },
            files: ["scripts/prepare.js"]
        });
    } else if (message.action === "executeAutomation") {
        console.log("executeAutomation");

        await new Promise(resolve => setTimeout(resolve, 10000));
        // Run a lecture on the current page
        chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            files: ["scripts/automation.js"]
        });
    } else if (message.action === "endAutomation") {
        console.log("endAutomation", message.lectureCount);
        // 알림 보내기
    }
});