const RULES = [
  {
    "id": 1,
    "priority": 1,
    "action": {
      "type": "modifyHeaders",
      "responseHeaders": [
        { "header": "access-control-allow-origin", "operation": "set", "value": "*" },
        { "header": "access-control-allow-methods", "operation": "set", "value": "GET, OPTIONS" }
      ]
    },
    "condition": {
      "urlFilter": "https://lumendatabase.org/*",
      "resourceTypes": ["xmlhttprequest"]
    }
  }
];

chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: RULES.map(r => r.id),
    addRules: RULES
  }, () => console.log("CORS Bypass Active"));
});
