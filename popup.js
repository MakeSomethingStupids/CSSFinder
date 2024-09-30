let isActive = false;

document.getElementById('toggle-btn').addEventListener('click', async () => {
  isActive = !isActive;
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (isActive) {
    // content script를 동적으로 주입
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['contentScript.js'],
    });
    // 기능 활성화 메시지 전송
    chrome.tabs.sendMessage(tab.id, { action: 'activate' });
    document.getElementById('toggle-btn').textContent = '기능 비활성화';
  } else {
    // 기능 비활성화 메시지 전송
    chrome.tabs.sendMessage(tab.id, { action: 'deactivate' });
    document.getElementById('toggle-btn').textContent = '기능 활성화';
  }
});
