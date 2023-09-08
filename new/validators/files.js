export default function validateImageFile(file, allowedTypes, allowedMaxSize) {
  const errors = [];
  console.log();
  if (file === null || !file || file === "undefined" || file === "null") {
    errors.push("No file provided");
    return { status: 400, message: errors };
  }

  const maxSize = allowedMaxSize * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.type)) {
    errors.push(
      `Invalid file type: ${file.originalname}. Accepted formats are images, text files, pdfs and word documents.`
    );
    return { status: 400, message: errors };
  }
  if (file.size > maxSize) {
    errors.push(`File too large: ${file.originalname}`);
    return { status: 400, message: errors };
  }
  // Handle validation errors

  if (errors.length > 0) {
    // Remove uploaded files
    // fs.unlinkSync(file.path);
    return { status: 400, message: errors };
  }
  return { status: 200, message: "OK" };
}
