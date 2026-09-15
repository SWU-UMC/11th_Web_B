const message = document.querySelector("#message");
const cheerButton = document.querySelector("#cheer-button");
const messageA = "좋아요! 작은 코드부터 직접 바꾸어 봅시다. 🚀";
const messageB = "열심히 하면 좋은 결과가 있을거예요.";

cheerButton.addEventListener("click", function () {
    if (message.textContent == messageA) {
        message.textContent = messageB
        return;
    }
    message.textContent = messageA;
    return;
});