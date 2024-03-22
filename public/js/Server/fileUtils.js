const fs = require("fs");

async function fileExistsAsync(filePath) {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

async function checkFilePath(filePath) {
    try {
        if (!filePath) {
            throw new Error("No file path provided");
        }
        const fileExists = await fileExistsAsync(filePath);
        if (!fileExists) {
            throw new Error("File does not exist");
        }
    } catch (error) {
        console.error("Error checking file path and existence:", error);
        return false;
    }
    return true;
}

module.exports = { checkFilePath };