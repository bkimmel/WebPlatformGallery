new Promise(resolve => {
  new PerformanceObserver(list => {
    resolve(list.getEntries().filter(entry => !entry.hadRecentInput));
  }).observe({type: "layout-shift", buffered: true});
}).then(console.log);
//logs layout shifts not caused by input
