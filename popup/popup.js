document.addEventListener("DOMContentLoaded", async () => {
    const getCurrentTab = async () => {
        let queryOptions = { active: true, lastFocusedWindow: true };
        const [tab] = await chrome.tabs.query(queryOptions);
        return tab;
    };

    const note = document.getElementById("note");
    const automationButton = document.getElementById("automationButton");

    const tab = await getCurrentTab();
    const url = tab.url;
    const urlPattern = /^https:\/\/school\.programmers\.co\.kr\/app\/courses\/\d+\/curriculum\/lessons\/\d+/;
    if (urlPattern.test(url)) {
        note.innerText = "✅Available Page✅";
        automationButton.disabled = false;
    } else {
        note.innerText = "⛔Unavailable Page⛔";
        automationButton.disabled = true;
    }

    automationButton.addEventListener("click", async () => {
        const tab = await getCurrentTab();
        chrome.runtime.sendMessage({ action: "prepareAutomation", tabId: tab.id });
    });
});