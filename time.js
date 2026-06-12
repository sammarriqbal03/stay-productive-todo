function updateTime() {
    const el = document.getElementById("datetime");
    if (el) el.innerHTML = new Date().toLocaleString();
}
updateTime();
setInterval(updateTime, 1000);
