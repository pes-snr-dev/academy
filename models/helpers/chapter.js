import Chapter from "../ChapterModel";

// Function to update chapter numbers after deletion
export const updateChapterNumbers = async function (courseId) {
  const chapters = await Chapter.find({ course: courseId })
    .sort("chapter_number")
    .exec();
  const updatedChapters = [];

  for (let i = 0; i < chapters.length; i++) {
    const chapter = chapters[i];
    chapter.chapter_number = i + 1;
    updatedChapters.push(chapter.save());
  }

  await Promise.all(updatedChapters);
};
