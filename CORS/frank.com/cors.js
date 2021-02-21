let ajax = (url) => {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open("GET", "http://qq.com:8888/friends.json");
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          resolve(request.response);
        } else if (request.status === 400) {
          reject();
        }
      }
    };
    request.send();
  });
};

ajax("http://qq.com:8888/friends.json").then(
  (data) => {
    console.log(data);
  },
  () => {
    console.log("error!");
  }
);
