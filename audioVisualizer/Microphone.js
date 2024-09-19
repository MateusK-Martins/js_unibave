export class Michrophone {
    constructor() {
        this.initialized = false;
        navigator.mediaDevices.getUserMedia({audio:true})
        .then((stream) => {
            this.audioCtx = new AudioContext();
            this.microphone = this.audioCtx.createMediaStreamSource(stream);
            this.analyser = this.audioCtx.createAnalyser();
            this.analyser.fftSize = 512;
            const bufferLength = this.analyser.frequencyBinCount;
            this.dataArray = new Uint8Array(bufferLength);
            this.microphone.connect(this.analyser);
            this.initialized = true;
        }).catch((err) => {
            alert(err);
        });
    }
    getSamples() {
        this.analyser.getByteTimeDomainData(this.dataArray);
        let normSample = [...this.dataArray].map(e => e/128 - 1);
        return normSample;
    }
    getVolume() {
        this.analyser.getByteTimeDomainData(this.dataArray);
        let normSample = [...this.dataArray].map(e => e/128 - 1);
        let sum = 0;
        for (let i = 0; i < normSample.length; i++) {
            sum += normSample[i] * normSample[i];
        }
        let volume = Math.sqrt(sum / normSample.length);
        return volume;
    }
}