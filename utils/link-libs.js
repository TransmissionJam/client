var fs = require("fs");
var chalk = require("chalk");
var path = require("path");

function linkFolder(src, dest)
{
  if(fs.existsSync(`./public/${dest}`))
  {
    if(!fs.lstatSync(`./public/${dest}`).isSymbolicLink())
    {
      console.log(`${chalk.red("Error: ")} please remove the following file/folder: ${chalk.yellow(`./public/${dest}`)}`);
  
      process.exit(1);
    }
  }
  
  try
  {
    fs.lstatSync(`./public/${dest}`).isSymbolicLink();
  
    try
    {
      if(process.platform.indexOf("win32") !== -1)
      {
        fs.unlinkSync(`./public/${dest}`);
      }
      else
      {
        fs.unlinkSync(`./public/${dest}`);
      }
    }
    catch(e)
    {
      console.log(`${chalk.red("Error: ")} couldn't unlink ${chalk.yellow(`./public/${dest}`)}`);
  
      process.exit(1);
    }
  }
  catch(e)
  {
    // don't need to do anything here, it's all clean
  }
  
  try
  {
    var source = path.resolve(src);
    var libs = path.resolve(`./public/${dest}`);
  
    if(process.platform.indexOf("win32") !== -1)
    {
      fs.symlinkSync(source, libs, "junction");
    }
    else
    {
      fs.symlinkSync(source, libs, "dir");
    }
  }
  catch(e)
  {
    console.log(`${chalk.red("Error: ")} couldn't link ${chalk.yellow(src)} as ${chalk.yellow(`./public/${dest}`)}`);
    console.log(e);
  
    process.exit(1);
  }
}

linkFolder('./node_modules/', 'lib');