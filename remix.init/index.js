const { execSync } = require("child_process")
const fs = require("fs/promises")
const path = require("path")
const inquirer = require("inquirer")
const crypto = require("crypto")

const sort = require("sort-package-json")

function getRandomString(length) {
    return crypto.randomBytes(length).toString("hex")
  }

function escapeRegExp(string) {
  // $& means the whole matched string
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

async function main({ rootDirectory }) {
  const README_PATH = path.join(rootDirectory, "README.md")
  const PACKAGE_JSON_PATH = path.join(rootDirectory, "package.json")

  const REPLACER = "remix-firebase-template"

  const DIR_NAME = path.basename(rootDirectory)
  const SUFFIX = getRandomString(2)

  const APP_NAME = (DIR_NAME + "-" + SUFFIX)
    // get rid of anything that's not allowed in an app name
    .replace(/[^a-zA-Z0-9-_]/g, "-")

  const [readme, packageJson] = await Promise.all([
    fs.readFile(README_PATH, "utf-8"),
    fs.readFile(PACKAGE_JSON_PATH, "utf-8"),
  ])

 
 
  const newReadme = readme.replace(new RegExp(escapeRegExp(REPLACER), "g"), APP_NAME)

  const newPackageJson = JSON.stringify(sort({ ...JSON.parse(packageJson), name: APP_NAME }), null, 2) + "\n"

  await Promise.all([
    fs.writeFile(README_PATH, newReadme),
    fs.writeFile(PACKAGE_JSON_PATH, newPackageJson),
  ])

  const answers = await inquirer.prompt([
    {
      name: "tailwind",
      type: "confirm",
      default: true,
      message: "Do you want to use Tailwind?",
    },
  ])

  if (answers.tailwind) {
    console.log(`Installing Tailwind`)
    execSync(`yarn add tailwindcss postcss autoprefixer`, { stdio: "inherit", cwd: rootDirectory })
    fs.copyFile(path.join(rootDirectory, "remix.init", "tailwind.config.js"), path.join(rootDirectory, "tailwind.config.js"))
  }
}

   

  console.log(
    `Setup is complete. You're now ready to rock and roll 🤘

Start development with \`yarn dev\`
    `.trim(),
  )



module.exports = main