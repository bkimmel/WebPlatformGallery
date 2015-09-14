var sw = URL.createObjectURL(new Blob(['console.log(1)']));
var s = document.createElement('script');
s.setAttribute('src', sw);
document.body.appendChild(s); //Logs 1