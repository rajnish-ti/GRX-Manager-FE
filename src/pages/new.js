if (typeof window !== "undefined" && typeof fetch === "function") {
  fetch("http://localhost:5000/grx/grxList")
    .then((response) => response.json())
    .then((res) => {
      console.log("onFetch", res);
    })
    .catch((error) => {
      console.log("GRX Event Handler Error", error);
    });
}
