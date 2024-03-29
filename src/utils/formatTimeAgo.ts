export const VIEW_FORMATTER = Intl.NumberFormat(undefined, {notation: "compact"});

const formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: "always",
})

const DIVISIONS: { amount: number; name: Intl.RelativeTimeFormatUnit }[] = [
    { amount: 60, name: "seconds" },
    { amount: 60, name: "minutes" },
    { amount: 24, name: "hours" },
    { amount: 7, name: "days" },
    { amount: 4.34524, name: "weeks" },
    { amount: 12, name: "months" },
    { amount: Number.POSITIVE_INFINITY, name: "years" },
]

export function formatTimeAgo(date: string): string {
    const givenDate: Date = new Date(date);
    const currentTime: Date = new Date();
    let duration: number = (givenDate.getTime() - currentTime.getTime()) / 1000;

    for (let i = 0; i < DIVISIONS.length; i++) {
        const division = DIVISIONS[i];
        if (Math.abs(duration) < division.amount) {
            return formatter.format(Math.round(duration), division.name);
        }
        duration /= division.amount;
    }

    return formatter.format(Math.round(duration), DIVISIONS[DIVISIONS.length - 1].name);
}
