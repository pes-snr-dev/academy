

async function getCoachCourses(coachId) {
  const res = await fetch(`/api/courses/coach/${coachId}`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getCourses() {
  const ROOT_URL = process.env.NEXT_PUBLIC_ROOT_URL;
console.log(ROOT_URL, "LOOT URL");
  const res = await fetch(`${ROOT_URL}`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export { getCoachCourses, getCourses };
