const funcName = "CreateByXYC" + Math.random();
console.log(funcName);
window[funcName] = (data) => {
  console.log(data);
};

let script = document.createElement("script");
script.src = `http://qq.com:8888/friends.js?callback=${funcName}`;
script.onload = () => {
  script.remove();
};
document.body.appendChild(script);
