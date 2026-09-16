console.log("Hello, Web!");

const student = {
  name: "양지애",
  skills: ["Spring Boot", "React", "JavaScript", "Docker"]
};

function printSkills(skills) {
  for (const skill of skills) {
    if (skill === "JavaScript") {
      console.log(`${skill}: 화면에 동작을 더합니다.`);
    } else {
      console.log(skill);
    }
  }
}

console.log(student.name);
printSkills(student.skills);

const message = document.querySelector("#message");
const greetingButton = document.querySelector("#greeting-button");

greetingButton.addEventListener("click", function () {
  if (message.textContent === "버튼을 눌러 주세요.") {
    message.textContent = "웹 개발을 시작합니다!";
  } else {
    message.textContent = "버튼을 눌러 주세요.";
  }
});