export function initiateStorage() {
  function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }

  if (storageAvailable("localStorage")) {
    console.log("local storage availale");
  } else {
    console.log("no local storage available. This session is fleeting.");
  }
}

export function populateStorage(projectlist) {
  localStorage.setItem("projects", JSON.stringify(projectlist));
  console.log(JSON.parse(localStorage.getItem("projects")));
}

export function loadStorage() {
  const raw = localStorage.getItem("projects");
  return raw ? JSON.parse(raw) : null;
}
