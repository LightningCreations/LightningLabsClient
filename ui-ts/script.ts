window.onload = () => {
    // This checks if the page is running in Electron or just in a web browser
    const electron_enabled_flag = document.getElementById("electron_enabled");
    if (!electron_enabled_flag.hidden) {
        console.log("Running in Electron");
    }
};

let currentTheme = 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function nextTheme(){ // Used directly in HTML as demonstration (for now)
    const colors : Array<Array<string>> = [
        ["255, 255, 255", "0, 0, 0"],
        ["0, 0, 0", "255, 255, 255"],
        ["20, 25, 30", "255, 255, 255"],
        ["30, 25, 20", "255, 255, 255"],
        ["170, 185, 200", "0, 0, 0"],
        ["200, 185, 170", "0, 0, 0"],
    ];

    currentTheme = (currentTheme + 1) % colors.length;
    document.querySelector<HTMLInputElement>(':root').style.setProperty("--background", colors[currentTheme][0]);
    document.querySelector<HTMLInputElement>(':root').style.setProperty("--main-color", colors[currentTheme][1]);
}