let isRunning = false;

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "prepareAutomation") {
        isRunning = true;

        console.log("prepareAutomation");
        // Navigate to the first lecture page
        chrome.scripting.executeScript({
            target: { tabId: message.tabId },
            files: ["scripts/prepare.js"]
        });
    } else if (message.action === "executeAutomation") {
        console.log("executeAutomation");
        // Wait 10 seconds for page loading
        await new Promise(resolve => setTimeout(resolve, 10000));
        // Run a lecture on the current page
        chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            files: ["scripts/automation.js"]
        });
    } else if (message.action === "endAutomation") {
        console.log("endAutomation");
        // Send notification that Lecto has completed all lectures
        chrome.notifications.create({
            type: "basic",
            title: "🤖Lecto has completed all lectures for you!",
            message: `${message.lectureCount} Lectures Completed✅`,
            iconUrl: "images/programmers_extension.png"
        }, (notificationId) => {
            // Play notification sound
            chrome.scripting.executeScript({
                target: { tabId: sender.tab.id },
                func: () => {
                    const noti_sound = new Audio(chrome.runtime.getURL("audios/Slack-Ding.mp3"));
                    noti_sound.play();
                }
            });
            // Move to lecture tab when notification is clicked
            chrome.notifications.onClicked.addListener((clickedNotificationId) => {
                if (clickedNotificationId === notificationId) {
                    chrome.tabs.update(sender.tab.id, { active: true });
                    chrome.notifications.clear(clickedNotificationId);
                }
            });

            isRunning = false;
        });
    } else if (message.action === "getState") {
        // Send current state of isRunning
        sendResponse(isRunning);
    }
});