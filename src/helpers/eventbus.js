const eventBus = {
    on(event, callback) {
      console.log("event 1", event);
      document.addEventListener(event, (e) => callback(e.detail));
    },
    dispatch(event, data) {
      console.log("event 2", event);
      document.dispatchEvent(new CustomEvent(event, { detail: data }));
    },
    remove(event, callback) {
      console.log("event 3", event);
      document.removeEventListener(event, callback);
    },
    
  };
  
  export default eventBus;