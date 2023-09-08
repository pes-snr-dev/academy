export default async function getCoachCourses(coachId) {
  const response = await fetch("/api/courses");
  const data = await response.json();
  return data;
}
