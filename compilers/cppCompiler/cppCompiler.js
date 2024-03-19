// const { exec } = require("child_process");
// const fs = require("fs");
// const path = require("path");

// const executeCpp = async (filepath) => {
//   try {
//     const jobId = path.basename(filepath).split(".")[0];
//     const codebasePath = path.join(__dirname, "../../codebase");
//     console.log("CodebasePath:", codebasePath);
//     const outFilePath = path.join(codebasePath, `${jobId}.out`);
//     console.log("OutFilePath:", outFilePath);
//     if (!fs.existsSync(codebasePath)) {
//       fs.mkdirSync(codebasePath, { recursive: true });
//     }

//     const compilationCommand = `g++ ${filepath} -o ${outFilePath}`;
//     console.log(filepath);
//     await execPromise(compilationCommand);

//     const executionCommand = `${outFilePath}`;
//     const { stdout, stderr } = await execPromise(executionCommand);
//     console.log(stdout);

//     return outFilePath;
//   } catch (error) {
//     throw new Error(`Compilation or execution error: ${error}`);
//   }
// };

// const execPromise = (command) => {
//   return new Promise((resolve, reject) => {
//     exec(command, (error, stdout, stderr) => {
//       if (error) {
//         console.error(error);
//         reject(error);
//         return;
//       }
//       resolve({ stdout, stderr });
//     });
//   });
// };

// module.exports = {
//   executeCpp
// };


const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const executeCpp = async (filepath) => {
  try {
    const jobId = path.basename(filepath).split(".")[0];
    const codebasePath = path.join(__dirname, "../../codebase");
    console.log("CodebasePath:", codebasePath);
    const outFilePath = path.join(codebasePath, `${jobId}.out`);
    console.log("OutFilePath:", outFilePath);
    if (!fs.existsSync(codebasePath)) {
      fs.mkdirSync(codebasePath, { recursive: true });
    }

    const compilationCommand = `g++ ${filepath} -o ${outFilePath}`;
    console.log(filepath);
    await execPromise(compilationCommand);

    const executionCommand = `${outFilePath}`;
    const { stdout, stderr } = await execPromise(executionCommand);
    console.log(stdout);

    return { outFilePath, stdout }; // Return both outFilePath and stdout
  } catch (error) {
    throw new Error(`Compilation or execution error: ${error}`);
  }
};

const execPromise = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(error);
        reject(error);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
};

module.exports = {
  executeCpp,
};
