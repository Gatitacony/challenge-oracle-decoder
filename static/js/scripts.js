const canvas = document.getElementById('matrix');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = Array(256).join(1).split('');

const draw = () => {
    context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#f82d97';
    context.font = '16pt monospace';

    letters.map((y_pos, index) => {
        const text = String.fromCharCode(65 + Math.random() * 33);
        const x_pos = index * 20;
        context.fillText(text, x_pos, y_pos);

        letters[index] = y_pos > canvas.height + Math.random() * 1e4 ? 0 : y_pos + 20;
    });
};

setInterval(draw, 33);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const validateInput = (text) => {
    return /^[a-z\s]*$/.test(text);
};

document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('backgroundMusic');
    const muteButton = document.getElementById('mute-button');
    const volumeControl = document.getElementById('volume-control');
    const errorMessage = document.getElementById('error-message');

    const playAudio = () => {
        audio.play().catch(error => {
            console.log('Audio no apto para reproducción automática, necesita interacción del usuario');
        });
        document.body.removeEventListener('click', playAudio);
    };

    document.body.addEventListener('click', playAudio);

    muteButton.addEventListener('click', () => {
        audio.muted = !audio.muted;
        const icon = audio.muted ? 'fa-volume-mute' : 'fa-volume-up';
        muteButton.innerHTML = `<i class="fas ${icon}"></i>`;
    });

    volumeControl.addEventListener('input', (event) => {
        audio.volume = event.target.value;
    });

    const textInput = document.getElementById('text-input');
    const textOutput = document.getElementById('text-output');
    const encryptButton = document.getElementById('encrypt-button');
    const decryptButton = document.getElementById('decrypt-button');
    const copyButton = document.getElementById('copy-button');

    const encrypt = (text) => {
        return text
            .replace(/e/g, 'enter')
            .replace(/i/g, 'imes')
            .replace(/a/g, 'ai')
            .replace(/o/g, 'ober')
            .replace(/u/g, 'ufat');
    };

    const decrypt = (text) => {
        return text
            .replace(/enter/g, 'e')
            .replace(/imes/g, 'i')
            .replace(/ai/g, 'a')
            .replace(/ober/g, 'o')
            .replace(/ufat/g, 'u');
    };

    const handleEncryption = () => {
        const inputText = textInput.value.trim();
        if (!validateInput(inputText)) {
            errorMessage.textContent = 'Solo se permiten letras minúsculas y sin acentos ni caracteres especiales.';
            errorMessage.style.display = 'block';
            return;
        }
        errorMessage.style.display = 'none';
        const encryptedText = encrypt(inputText);
        textOutput.value = encryptedText;
        updateOutputVisibility(true);
    };

    const handleDecryption = () => {
        const inputText = textInput.value.trim();
        if (!validateInput(inputText)) {
            errorMessage.textContent = 'Solo se permiten letras minúsculas y sin acentos ni caracteres especiales.';
            errorMessage.style.display = 'block';
            return;
        }
        errorMessage.style.display = 'none';
        const decryptedText = decrypt(inputText);
        textOutput.value = decryptedText;
        updateOutputVisibility(true);
    };

    const updateOutputVisibility = (showOutput) => {
        const mensajeDiv = document.getElementById('mensaje');
        if (showOutput) {
            mensajeDiv.style.display = 'none';
            textOutput.style.display = 'block';
            copyButton.style.display = 'block';
        } else {
            mensajeDiv.style.display = 'block';
            textOutput.style.display = 'none';
            copyButton.style.display = 'none';
        }
    };

    encryptButton.addEventListener('click', handleEncryption);
    decryptButton.addEventListener('click', handleDecryption);

    copyButton.addEventListener('click', () => {
        textOutput.select();
        document.execCommand('copy');
    });

    textInput.addEventListener('input', function() {
        const inputText = textInput.value.trim();
        if (!validateInput(inputText)) {
            errorMessage.textContent = 'Solo se permiten letras minúsculas y sin acentos ni caracteres especiales.';
            errorMessage.style.display = 'block';
            updateOutputVisibility(false);
        } else {
            errorMessage.style.display = 'none';
            updateOutputVisibility(false);
        }
    });
});
