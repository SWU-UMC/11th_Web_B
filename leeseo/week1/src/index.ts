type StudyMember = {
  id: number,
  name: string;
  role: "member" | "leader",
  githubId?: string;
};

const members: StudyMember[] = [
  { id: 1, name: "광수", role: "leader", githubId: "gwangsoo" },
  { id: 2, name: "지수", role: "member"},
];

const findMember = (id: number) => {
    const member = members.find((member) => member.id === id);
    if (member == null) {
      return "존재하지 않는 회원입니다.";
    }
    return "회원" + id + "의 이름은 " + member?.name + "이고, 역할은 " + member.role + "이고, github id는 " + (member?.githubId || "존재하지 않는") + "다.";
}

console.log(findMember(1));
console.log(findMember(2));
console.log(findMember(999));