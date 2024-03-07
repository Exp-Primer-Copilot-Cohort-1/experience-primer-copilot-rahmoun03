function skillsMember() {
  const member = new Member("John", "Doe");
  member.addSkill("JavaScript");
  member.addSkill("React");
  member.addSkill("Node.js");
  console.log(member.getSkills()); // ["JavaScript", "React", "Node.js"]
}