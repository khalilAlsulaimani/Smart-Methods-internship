if ("serial" in navigator) {
    // Prompt user to select any serial port.
  const port = await navigator.serial.requestPort();

    // Wait for the serial port to open.
  await port.open({ baudRate: 9600 });
}


const texts = document.querySelector('.texts');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang= "ar-AR"
recognition.interimResults = true;

let p = document.createElement('p');

recognition.addEventListener('result', (e)=>{
  texts.appendChild(p);
  const text = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

  p.innerText = text;
  if(e.results[0].isFinal){
    if (text.includes('لف يمين')) {
      p = document.createElement('p');
      p.classList.add('replay');
      p.innerText = 'يمين';
      texts.appendChild(p)
      const writer = port.writable.getWriter();

      const data = new Uint8Array(["right"]);
      await writer.write(data);
      // Allow the serial port to be closed later.
      writer.releaseLock();
    }
    if (text.includes('لف يسار')) {
      p = document.createElement('p');
      p.classList.add('replay');
      p.innerText = 'يسار';
      texts.appendChild(p)
      const data = new Uint8Array(["left"]); 
      await writer.write(data);
      // Allow the serial port to be closed later.
      writer.releaseLock();
    }
   
    p = document.createElement('p');
  }
});
recognition.addEventListener('end', ()=>{
  recognition.start();
})

recognition.start();




