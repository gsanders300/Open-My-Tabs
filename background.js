chrome.action.onClicked.addListener(() => {
  const urls = [
    "https://www.example.com",
    "https://www.example.org",
    "https://www.example.net"
  ];

  for (let url of urls) {
    chrome.tabs.create({ url });
  }
});