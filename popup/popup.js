document.addEventListener("DOMContentLoaded", async () => {
    const buttonText = document.getElementsByClassName("buttonText")[0];
    const loader = document.getElementsByClassName("loader")[0];
    const note = document.getElementById("note");
    const automationButton = document.getElementById("automationButton");

    const setButtonRunningState = () => {
        buttonText.style.display = "none";
        loader.style.display = "flex";
    };

    const getCurrentTab = async () => {
        let queryOptions = { active: true, lastFocusedWindow: true };
        const [tab] = await chrome.tabs.query(queryOptions);
        return tab;
    };

    loader.style.display = "none";

    const tab = await getCurrentTab();
    const url = tab.url;
    const urlPattern = /^https:\/\/school\.programmers\.co\.kr\/app\/courses\/\d+\/curriculum\/lessons\/\d+/;
    if (urlPattern.test(url)) {
        note.innerText = "✅Available Page✅";
        const isRunning = await chrome.runtime.sendMessage({ action: "getState", tabId: tab.id });
        if (isRunning) {
            automationButton.disabled = true;
            setButtonRunningState();
        } else {
            automationButton.disabled = false;
        }
    } else {
        note.innerText = "⛔Unavailable Page⛔";
        automationButton.disabled = true;
    }

    automationButton.addEventListener("click", async () => {
        setButtonRunningState();
        automationButton.disabled = true;
        chrome.runtime.sendMessage({ action: "prepareAutomation", tabId: tab.id });
    });
});