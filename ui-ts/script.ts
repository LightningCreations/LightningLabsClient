window.onload = () => {
    const electron_enabled_flag = document.getElementById("electron_enabled");
    if (!electron_enabled_flag.hidden) {
        console.log("Electron detected");
    }
};
