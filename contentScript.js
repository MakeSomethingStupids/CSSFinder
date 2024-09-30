let isListenerAdded = false;
let clickListener = function(event) {
  event.preventDefault();
  event.stopPropagation();

  const targetElement = event.target;
  const classNames = targetElement.className;
  const idName = targetElement.id;

  alert(`클래스: ${classNames}\nID: ${idName}`);
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'activate' && !isListenerAdded) {
    document.addEventListener('click', clickListener, true);
    isListenerAdded = true;
  } else if (message.action === 'deactivate' && isListenerAdded) {
    document.removeEventListener('click', clickListener, true);
    isListenerAdded = false;
  }
});
