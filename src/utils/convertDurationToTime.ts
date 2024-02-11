const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits : 2
});

function convertDurationToTime(iso8601Duration: string): string {
    const durationRegex: RegExp = /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/;
    const match: RegExpMatchArray | null = iso8601Duration.match(durationRegex);

    if (!match) {
        return "Invalid duration format";
    }

    const hours: number = parseInt(match[5] || "0");
    const minutes: number = parseInt(match[6] || "0");
    const seconds: number = parseInt(match[7] || "0");

    const totalSeconds: number = hours * 3600 + minutes * 60 + seconds;

    const formattedTime: string = formatTime(totalSeconds);

    return formattedTime;
}

function formatTime(durationInSeconds: number): string {
    const hours: number = Math.floor(durationInSeconds / 3600);
    const remainingMinutes: number = Math.floor((durationInSeconds % 3600) / 60);
    const remainingSeconds: number = durationInSeconds % 60;

    if (hours > 0) {
        return `${hours}:${leadingZeroFormatter.format(remainingMinutes)}:${leadingZeroFormatter.format(remainingSeconds)}`;
    }

    return `${remainingMinutes}:${leadingZeroFormatter.format(remainingSeconds)}`;
}

export default convertDurationToTime;
