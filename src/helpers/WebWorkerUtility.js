/**
 *  Description:
 * ----------------
 *  This utility file exists because a `WebWorker` object needs to be instantiated
 *  as a file, but we want it to be a part of our webpack bundle. As in, we don’t
 *  want to run the worker as a separate app with it’s own build process.
 *
 *  Importing *Worker.js files makes it a part of our project’s sourcetree and
 *  webpack will bundle it correctly.
 *
 *  In this utlity function we simply toString our worker code and make it into
 *  a web URL.
 *
 * How to use.
 * ----------------
 * See below ...
 *
 * Code taken from:
 * ----------------
 *  - https://medium.com/prolanceer/optimizing-react-app-performance-using-web-workers-79266afd4a7
 */
export default class WebWorker {
    constructor(worker) {
        const code = worker.toString();
        const blob = new Blob(['('+code+')()']);
        return new Worker(URL.createObjectURL(blob));
    }
}

///////////////////////
//      EXAMPLE      //
///////////////////////
// (main.js)
// import WebWorker from '../../helpers/WebWorkerUtility';
// import worker from '../../workers/sampleWorker.js'; // (The file)
// ...
//
// componentDidMount() {
//
//     this.worker = new WebWorker(worker);
//     this.worker.addEventListener('message', event => {
//         const sortedList = event.data;
//         console.log("OUT", sortedList);
//     });
//     this.worker.postMessage("hi!");
//     this.worker.terminate(); // Close our worker from working.
// }
//
// (workers/sampleWorker.js)
// export default () => {
//     self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
//         if (!e) return;
//         let msg = e.data;
//         postMessage(msg);
//     })
// }
