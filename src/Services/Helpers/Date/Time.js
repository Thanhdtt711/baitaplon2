export default class Time{
    getMins = (seconds) => {
        const mins = Math.floor(seconds/60);
        seconds = seconds - mins*60;
        seconds = Math.floor(seconds);

        return `${mins<10?'0'+mins:mins}:${seconds<10?'0'+seconds:seconds}`;
    }
}