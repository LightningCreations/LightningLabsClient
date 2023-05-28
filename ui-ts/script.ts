window.onload = () => {
    // This checks if the page is running in Electron or just in a web browser
    const electron_enabled_flag = document.getElementById("electron_enabled");
    if (electron_enabled_flag != null && !electron_enabled_flag.hidden) {
        console.log("Running in Electron");
    }

    for (const divider of document.getElementsByClassName("divider-vert")) {
        divider.addEventListener("mousedown", (e) => {
            const target = e.target as HTMLElement;
            const left = target.previousElementSibling as HTMLElement;
            const right = target.nextElementSibling as HTMLElement;
            const left_flex = parseFloat(getComputedStyle(left).flex.split(" ")[0]);
            const right_flex = parseFloat(getComputedStyle(right).flex.split(" ")[0]);
            const total_flex = left_flex + right_flex;
            const left_x = left.getBoundingClientRect().left;
            const right_x = right.getBoundingClientRect().right;
            const width = right_x - left_x;
            document.onmousemove = (e) => {
                const ratio = (e.clientX - left_x) / width;
                console.log(ratio);
                left.style.flex = "" + ratio * total_flex;
                right.style.flex = "" + (1 - ratio) * total_flex;
            };
            document.onmouseup = () => {
                document.onmouseup = null;
                document.onmousemove = null;
            };
        });
    }
};

let currentTheme = 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function nextTheme() { // Used directly in HTML as demonstration (for now)
    const colors: Array<Array<string>> = [
        ["255, 255, 255", "0, 0, 0"],
        ["0, 0, 0", "255, 255, 255"],
        ["20, 25, 30", "255, 255, 255"],
        ["30, 25, 20", "255, 255, 255"],
        ["170, 185, 200", "0, 0, 0"],
        ["200, 185, 170", "0, 0, 0"],
    ];

    currentTheme = (currentTheme + 1) % colors.length;
    const root = document.querySelector<HTMLInputElement>(':root');
    if (root === null) {
        console.error("critical error: root element is null");
    } else {
        root.style.setProperty("--background", colors[currentTheme][0]);
        root.style.setProperty("--main-color", colors[currentTheme][1]);
    }
}