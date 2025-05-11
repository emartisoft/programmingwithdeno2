import { blue, green, red } from "colors";
import yargs, { Argv } from "yargs";
const _argv = yargs(Deno.args)
  .command(
    "hello [name]",
    "Greet a user by name",
    (yargs: Argv) => {
      return yargs.positional("name", {
        describe: "Name to greet",
        default: "Deno",
      });
    },
    (args: { name: string }) => {
      console.log(green(`Hey! Hello, ${args.name}!`));
    },
  )
  .command(
    "colorize [message]",
    "Print a message in multiple colors",
    (yargs: Argv) => {
      return yargs.positional("message", {
        describe: "Message to colorize",
        default: "This is a colored message!",
      });
    },
    (args: { message: string }) => {
      console.log(red(args.message));
      console.log(green(args.message));
      console.log(blue(args.message));
    },
  )
  .help()
  .version("1.0.0")
  .parse();
