function sqspLogoLog() {
    //Did you know?: You can put pretty pictures/links/etc. in `.log`s
    // ... log/info (same on Chrome) have specifiers
    // ... most of them aren't that exciting since ES6 string templating
    // ... BUT: %c
    console.info(
        '%c %cSquarespace Frontend Handbook%chttps://frontend.squarespace.net%c  \n%c2024.02.07%c  %c037a8af9746',
        'padding-left: 30px; line-height: 36px; margin-right: 1.5em; margin-bottom: 1em; background-color: white; background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBkPSJNMTg2LjEyIDM0My4zNGMtOS42NSA5LjY1LTkuNjUgMjUuMjkgMCAzNC45NCA5LjY1IDkuNjUgMjUuMjkgOS42NSAzNC45NCAwTDM3OC4yNCAyMjEuMWMxOS4yOS0xOS4yOSA1MC41Ny0xOS4yOSA2OS44NiAwczE5LjI5IDUwLjU3IDAgNjkuODZMMjkzLjk1IDQ0NS4xYzE5LjI3IDE5LjI5IDUwLjUzIDE5LjMxIDY5LjgyLjA0bC4wNC0uMDQgMTE5LjI1LTExOS4yNGMzOC41OS0zOC41OSAzOC41OS0xMDEuMTQgMC0xMzkuNzItMzguNTktMzguNTktMTAxLjE1LTM4LjU5LTEzOS43MiAwbC0xNTcuMjIgMTU3LjJ6bTI0NC41My0xMDQuOGMtOS42NS05LjY1LTI1LjI5LTkuNjUtMzQuOTMgMGwtMTU3LjIgMTU3LjE4Yy0xOS4yNyAxOS4yOS01MC41MyAxOS4zMS02OS44Mi4wNWwtLjA1LS4wNWMtOS42NC05LjY0LTI1LjI3LTkuNjUtMzQuOTItLjAxbC0uMDEuMDFjLTkuNjUgOS42NC05LjY2IDI1LjI4LS4wMiAzNC45M2wuMDIuMDJjMzguNTggMzguNTcgMTAxLjE0IDM4LjU3IDEzOS43MiAwbDE1Ny4yLTE1Ny4yYzkuNjUtOS42NSA5LjY1LTI1LjI5LjAxLTM0Ljkzem0tMjYxLjk5IDg3LjMzIDE1Ny4xOC0xNTcuMThjOS42NC05LjY1IDkuNjQtMjUuMjkgMC0zNC45NC05LjY0LTkuNjQtMjUuMjctOS42NC0zNC45MSAwTDEzMy43MiAyOTAuOTNjLTE5LjI4IDE5LjI5LTUwLjU2IDE5LjMtNjkuODUuMDFsLS4wMS0uMDFjLTE5LjI5LTE5LjI4LTE5LjMxLTUwLjU0LS4wMy02OS44NGwuMDMtLjAzTDIxOC4wMyA2Ni44OWMtMTkuMjgtMTkuMjktNTAuNTUtMTkuMy02OS44NS0uMDJsLS4wMi4wMkwyOC45MyAxODYuMTRjLTM4LjU4IDM4LjU5LTM4LjU4IDEwMS4xNCAwIDEzOS43MiAzOC42IDM4LjU5IDEwMS4xMyAzOC41OSAxMzkuNzMuMDF6bS04Ny4zMy01Mi40YzkuNjQgOS42NCAyNS4yNyA5LjY0IDM0LjkxIDBsMTU3LjIxLTE1Ny4xOWMxOS4yOC0xOS4yOSA1MC41NS0xOS4zIDY5Ljg0LS4wMmwuMDIuMDJjOS42NSA5LjY1IDI1LjI5IDkuNjUgMzQuOTMgMCA5LjY1LTkuNjUgOS42NS0yNS4yOSAwLTM0LjkzLTM4LjU5LTM4LjU5LTEwMS4xMy0zOC41OS0xMzkuNzIgMEw4MS4zMyAyMzguNTRjLTkuNjUgOS42NC05LjY1IDI1LjI4LS4wMSAzNC45M2guMDF6Ii8+PC9zdmc+"); background-size: 32px; background-repeat: no-repeat; background-position: 2px 2px', 
        'background: #555; border-radius:0.5em 0 0 0.5em; padding:0.5em; color: white; font-weight: bold',
        'background: #444; border-radius:0 0.5em 0.5em 0; padding:0.5em; color: white;', '', 
        'background: #c3a650; border-radius:0.5em; padding:0.2em 0.5em 0.1em 0.5em; color: white;', '', 
        'background: #15889f; border-radius:0.5em; padding:0.2em 0.5em 0.1em 0.5em; color: white;'
    );
    // Hat-tip to Joel for sharing: https://frontendmasters.com/blog/console-delight/
}

function noWayWillThisWork() {
    //Shenanigans! Will this work?
    const encodedSVG = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="25" fill="#333" paint-order="stroke" stroke="#E15555" stroke-width="5" stroke-dasharray="200 200" stroke-dashoffset="-200">
      <animate
               attributeName="stroke-dashoffset"
               attributeType="XML"
               from="-200"
               to="200"
               begin="0s"
               dur="5s"
               repeatCount="indefinite"
      />
    </circle>
    </svg>`);
    const styleSpec = `line-height:200px; padding-left:200px;background-repeat:no-repeat; background-color: #444; background-image:url(data:image/svg+xml,${encodedSVG})`;
    console.info('%c ', styleSpec);
    // If you enjoy this sort of nonsense
    // ... join #frontend-platform-social
}

function logGroupExample() {
    console.log('normal ungrouped log');
    //`.group` Makes a group that can be collapsed where 
    //following logs are indented. Useful if you want to provide visual heirarchy.
    console.group('Some Group Title');
    console.info('Things');
    console.info('You');
    console.info('Should');
    console.info('Know');
    console.groupEnd();

    //`.groupCollapsed` Like `.group` but starts collapsed
    //A very underrated console API
    console.groupCollapsed('Other Group Title');
    console.info('Things');
    console.info('You');
    console.groupCollapsed('Might Also');
    console.info('Groups can be nested!');
    console.groupEnd();
    console.info('Know');
    console.groupEnd();
}

function tableExample() {
    const someArray = [{name: 'bob', id: 23}, {name: 'alice', id: 46}, {name: 'bernie', id: 19}];
    //`.table` does arrays:
    console.table(someArray);

    const arrayAsNameIndexedObject = someArray.reduce((a,v)=>{ a[v.name] = v; return a; }, Object.create(null));
    //`.table` does objects nicely too
    //use the second argument to cut down on visual clutter
    //or non-schematic props
    console.table(arrayAsNameIndexedObject , ['id'] )

    //The tables are SORTABLE! in the console!
}

function assertExample() {
    //`.assert` <= Sometimes a good way to debug is to just keep writing
    //these. It gives you a stack trace, too!
    let magicNumber = 0;
    console.assert(magicNumber === 42, '42 is Not the Magic Number');
    magicNumber = 42;
    //This one stays quiet...
    console.assert(magicNumber === 42, '42 is still Not the Magic Number');

    //IMHO: `.assert` is the most underrated console API. See below re: breakpoints
}

function sqspFancyGroup() {
    //Tying all these things together: You can make some really nice
    //logs that improve Developer Experience.

    //Group and group collapsed can take style specifiers too! Neat!
    console.groupCollapsed('%c %cSquarespace Frontend Handbook%chttps://frontend.squarespace.net%c  \n%c2024.02.07%c  %c037a8af9746', 'padding-left: 30px; line-height: 36px; margin-right: 1.5em; margin-bottom: 1em; background-color: white; background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBkPSJNMTg2LjEyIDM0My4zNGMtOS42NSA5LjY1LTkuNjUgMjUuMjkgMCAzNC45NCA5LjY1IDkuNjUgMjUuMjkgOS42NSAzNC45NCAwTDM3OC4yNCAyMjEuMWMxOS4yOS0xOS4yOSA1MC41Ny0xOS4yOSA2OS44NiAwczE5LjI5IDUwLjU3IDAgNjkuODZMMjkzLjk1IDQ0NS4xYzE5LjI3IDE5LjI5IDUwLjUzIDE5LjMxIDY5LjgyLjA0bC4wNC0uMDQgMTE5LjI1LTExOS4yNGMzOC41OS0zOC41OSAzOC41OS0xMDEuMTQgMC0xMzkuNzItMzguNTktMzguNTktMTAxLjE1LTM4LjU5LTEzOS43MiAwbC0xNTcuMjIgMTU3LjJ6bTI0NC41My0xMDQuOGMtOS42NS05LjY1LTI1LjI5LTkuNjUtMzQuOTMgMGwtMTU3LjIgMTU3LjE4Yy0xOS4yNyAxOS4yOS01MC41MyAxOS4zMS02OS44Mi4wNWwtLjA1LS4wNWMtOS42NC05LjY0LTI1LjI3LTkuNjUtMzQuOTItLjAxbC0uMDEuMDFjLTkuNjUgOS42NC05LjY2IDI1LjI4LS4wMiAzNC45M2wuMDIuMDJjMzguNTggMzguNTcgMTAxLjE0IDM4LjU3IDEzOS43MiAwbDE1Ny4yLTE1Ny4yYzkuNjUtOS42NSA5LjY1LTI1LjI5LjAxLTM0Ljkzem0tMjYxLjk5IDg3LjMzIDE1Ny4xOC0xNTcuMThjOS42NC05LjY1IDkuNjQtMjUuMjkgMC0zNC45NC05LjY0LTkuNjQtMjUuMjctOS42NC0zNC45MSAwTDEzMy43MiAyOTAuOTNjLTE5LjI4IDE5LjI5LTUwLjU2IDE5LjMtNjkuODUuMDFsLS4wMS0uMDFjLTE5LjI5LTE5LjI4LTE5LjMxLTUwLjU0LS4wMy02OS44NGwuMDMtLjAzTDIxOC4wMyA2Ni44OWMtMTkuMjgtMTkuMjktNTAuNTUtMTkuMy02OS44NS0uMDJsLS4wMi4wMkwyOC45MyAxODYuMTRjLTM4LjU4IDM4LjU5LTM4LjU4IDEwMS4xNCAwIDEzOS43MiAzOC42IDM4LjU5IDEwMS4xMyAzOC41OSAxMzkuNzMuMDF6bS04Ny4zMy01Mi40YzkuNjQgOS42NCAyNS4yNyA5LjY0IDM0LjkxIDBsMTU3LjIxLTE1Ny4xOWMxOS4yOC0xOS4yOSA1MC41NS0xOS4zIDY5Ljg0LS4wMmwuMDIuMDJjOS42NSA5LjY1IDI1LjI5IDkuNjUgMzQuOTMgMCA5LjY1LTkuNjUgOS42NS0yNS4yOSAwLTM0LjkzLTM4LjU5LTM4LjU5LTEwMS4xMy0zOC41OS0xMzkuNzIgMEw4MS4zMyAyMzguNTRjLTkuNjUgOS42NC05LjY1IDI1LjI4LS4wMSAzNC45M2guMDF6Ii8+PC9zdmc+"); background-size: 32px; background-repeat: no-repeat; background-position: 2px 2px', 'background: #555; border-radius:0.5em 0 0 0.5em; padding:0.5em; color: white; font-weight: bold', 'background: #444; border-radius:0 0.5em 0.5em 0; padding:0.5em; color: white;', '', 'background: #c3a650; border-radius:0.5em; padding:0.2em 0.5em 0.1em 0.5em; color: white;', '', 'background: #15889f; border-radius:0.5em; padding:0.2em 0.5em 0.1em 0.5em; color: white;');
    const barChartURI = `url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cg08IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgoNPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgLTEuNSAyMjUzIDIyNTMiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxLjU7Ij4KDTxyZWN0IGlkPSJzdGFja2VkX2Jhcl9jaGFydF9zb3J0ZWQiIHg9IjEuOTk3IiB5PSIwIiB3aWR0aD0iMjI1MCIgaGVpZ2h0PSIyMjUwIiBzdHlsZT0iZmlsbDpub25lOyIvPgoNPHJlY3QgeD0iOTE4LjY2NCIgeT0iMTE4Ny41IiB3aWR0aD0iMzEyLjUiIGhlaWdodD0iNjY2LjY2NyIgc3R5bGU9ImZpbGw6IzFjNGU4MDtzdHJva2U6IzIwMjAyMDtzdHJva2Utd2lkdGg6NjYuNjdweDsiLz4KDTxyZWN0IHg9IjkxOC42NjQiIHk9IjEwMDAiIHdpZHRoPSIzMTIuNSIgaGVpZ2h0PSIxODcuNSIgc3R5bGU9ImZpbGw6I2VhNmE0NztzdHJva2U6IzIwMjAyMDtzdHJva2Utd2lkdGg6NjYuNjdweDsiLz4KDTxyZWN0IHg9IjkxOC42NjQiIHk9IjcwOC4zMzMiIHdpZHRoPSIzMTIuNSIgaGVpZ2h0PSIyODEuMjUiIHN0eWxlPSJmaWxsOiNlZWU7c3Ryb2tlOiMyMDIwMjA7c3Ryb2tlLXdpZHRoOjY2LjY3cHg7Ii8+Cg08cmVjdCB4PSIzOTcuODMxIiB5PSIxNDM3LjUiIHdpZHRoPSIzMTIuNSIgaGVpZ2h0PSI0MTYuNjY3IiBzdHlsZT0iZmlsbDojMWM0ZTgwO3N0cm9rZTojMjAyMDIwO3N0cm9rZS13aWR0aDo2Ni42N3B4OyIvPgoNPHJlY3QgeD0iMTQzOS41IiB5PSIxMjI5LjE3IiB3aWR0aD0iMzEyLjUiIGhlaWdodD0iNjI1IiBzdHlsZT0iZmlsbDojMWM0ZTgwO3N0cm9rZTojMjAyMDIwO3N0cm9rZS13aWR0aDo2Ni42N3B4OyIvPgoNPHJlY3QgeD0iMzk3LjgzMSIgeT0iMTMxMi41IiB3aWR0aD0iMzEyLjUiIGhlaWdodD0iMTI1IiBzdHlsZT0iZmlsbDojZWE2YTQ3O3N0cm9rZTojMjAyMDIwO3N0cm9rZS13aWR0aDo2Ni42N3B4OyIvPgoNPHJlY3QgeD0iMTQzOS41IiB5PSI5MTQuNTgzIiB3aWR0aD0iMzEyLjUiIGhlaWdodD0iMzE0LjU4MyIgc3R5bGU9ImZpbGw6I2VhNmE0NztzdHJva2U6IzIwMjAyMDtzdHJva2Utd2lkdGg6NjYuNjdweDsiLz4KDTxyZWN0IHg9IjM5Ny44MzEiIHk9IjEwNjIuNSIgd2lkdGg9IjMxMi41IiBoZWlnaHQ9IjI1MCIgc3R5bGU9ImZpbGw6I2VlZTtzdHJva2U6IzIwMjAyMDtzdHJva2Utd2lkdGg6NjYuNjdweDsiLz4KDTxyZWN0IHg9IjE0MzkuNSIgeT0iMzk1LjgzMyIgd2lkdGg9IjMxMi41IiBoZWlnaHQ9IjUxOC43NSIgc3R5bGU9ImZpbGw6I2VlZTtzdHJva2U6IzIwMjAyMDtzdHJva2Utd2lkdGg6NjYuNjdweDsiLz4KDTxnPgoNPHBhdGggZD0iTTI4OS40OTcsMzg3LjVsLTEwMCwtMjAwbC0xMDAsMjAwbDIwMCwtMFoiIHN0eWxlPSJmaWxsOiMyMDIwMjA7Ii8+Cg08cGF0aCBkPSJNMTg2NC41LDE5NjIuNWwyMDAsMTAwbC0yMDAsMTAwbDAsLTIwMFoiIHN0eWxlPSJmaWxsOiMyMDIwMjA7Ii8+Cg08cGF0aCBkPSJNMTg5LjQ5NywzNDcuNWwwLDE3MTVsMTcxNSwtMCIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6IzIwMjAyMDtzdHJva2Utd2lkdGg6NjYuNjdweDsiLz4KDTwvZz4KDTwvc3ZnPg==)`;
    const services = {'AlphaService': {status:'Nominal'}, 'BetaService': {status: 'Nominal'}, 'DeltaService': {status: 'Offline'}};
    console.group('Services: ');
    console.table(services, ['status']);
    console.assert(Object.values(services).every(v=>v.status=='Nominal'), 'Not every service status is nominal')
    console.groupEnd();
    console.groupCollapsed('Charts and Graphs');
    const chartStyleSpecifier = 'padding-left: 30px; line-height: 36px; margin-right: 1.5em; margin-bottom: 1em; background-color: white; background-image: ' + barChartURI + '; background-size: 32px; background-repeat: no-repeat; background-position: 2px 2px;'
    console.info('%c Charts are important.', 'padding-left: 50px; line-height: 50px; background-color: #333; background-image: ' + barChartURI + '; background-size: contain; background-repeat: no-repeat;');
    console.groupEnd();
    console.groupEnd();
}

function consoleOddsAndEnds() {
    //it just gives you a stack trace.
    console.trace();
    //prints a warning / with a trace
    console.warn('Warning!');
    //prints an error, handles `Error`s (but no `cause`!)
    console.error(new Error('Error!', {cause: 'underlying cause'}));
    //print objects nicely
    console.dir({my: {obj: 'is awesome'}});
}

function consoleUtilities() {
    //IMPORTANT!: THESE WILL BREAK OUTSIDE CONSOLE REPL / SNIPPETS
    
    //Shorthand utility functions:
    
    //$_ : The last evaluated expression
    
    //$('.class') : document.querySelector
    
    //$$('.class') : document.querySelectorAll
    
    //copy : does what you think it does
    // ... works nicely with JSON.stringify(obj, undefined, 2)
    copy/*Only In Snippets!*/(JSON.stringify({abc: {def: ['hij', 23]}}, undefined, 2));
    
    //getEventListeners() : Get an object indexed by event with
    // ... relevant values like 'once', 'useCapture' etc.
    
    //profile('label') and profileEnd('label')
    // ... See "Performance" tab
    
    //queryObjects(Object.prototype) : EVERY OBJECT EVER
    // ... it's sorta weird though
    // ... it returns undefined but logs an array to console
    // ... that you can access by Ctrl+click "store as global"
    // ... try it!: {answer: 42}
    // ... queryObjects(Object.prototype)
    // ... temp1.filter(v=>v.answer === 42)
}

function keyBoardShortcuts() {
    // Cmd + Opt + I : Open Devtools
    // Cmd + Shift + C : DOM Selector
    // Cmd + Shift + P : Command Menu (try "screenshot")
    //  ! to run snippet
    // Cmd + R : Reload
    // Cmd + Shift + R : Hard Reload

    //Code Editor:
    // Cmd + D : Select next occurrence
    // Ctrl + M : Jump to matching parenthesis / bracket 
}

function sourcesPanelStuff() {
    //Navigator Panels:
    //Workspace: Edit files right in DevTools!
    //Overrides: Enable on Network Panel
    //Snippets: This is a Snippet!

    //Debugger Panels:
    //Watch: kinda interesting if there's things you always need
    // ... but try "Live Expressions" instead 
    //Breakpoints: "Pause on uncaught exceptions"
    // ... console.assert() will pause on either _caught/uncaught_
    
    try {
        throw new Error('Pause on caught', {cause: 'Intentional'});
    }
    catch (err) {
        console.error(err);
    }

    //throw new Error('Pause on uncaught', {cause: 'Intentional'});

    //Conditional Breakpoints: Ctrl + Click on gutters
    let someThing = 41;
    //set breakpoint here: someThing !== 42
    someThing = 42;
    //set again here

    //Also: don't be embarassed if you don't know This
    //... or don't use it a lot, but you should use it all
    //... the time. It's great.

    debugger;
}

function performancePanel() {
    // This is its own talk and there are people much better
    // at this than me that should probably present it (Brad)...
    
    // I'll just say that knowing how to read and operate this 
    // is a critical skill to have as a FE Engineer. 
}

function toolsDrawers() {
    //Rendering: Great way to catch React being React
    //... Other method: Elements panel => Expand Recursively => Watch flicker on attributes
    //Layer Borders: Can sometimes highlight "Goldilocks" layer problems
    //Frame Rendering stats: Catch areas that lower your FPS
}

function nuclearReload() {
    //ONLY with DevTools OPEN:
    //... Hold Mouse button down for 2-3 seconds on reload button
    //... Select "Empty cache and reload"

    //Application tab:
    //... Storage => "Clear Site Data"
}

function otherWeirdStuff() {
    //chrome://chrome-urls
    //... //omnibox, //dino (a game), //accessibility, //flags (YOLO)

    //Opt + Cmd + I from Devtools (undocked) opens...
    //... Devtools-On-Devtools! You can send 
    //... CDP commands from there (we're not going into that today)
}
