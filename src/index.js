const { sources } = require("coc.nvim");
const path = require("path");
const fs = require("fs/promises");

let words = [];

exports.activate = async (context) => {
  const file = path.resolve(__dirname, "manga.txt");

  fs.readFile(file, "utf8", (err, content) => {
    if (err) {
      return;
    }
    words = content.split(/\n/);
  });

  context.subscriptions.push(sources.createSource({
    name: "manga",
    triggerCharacters: [],
    async doComplete(opt) {
      if (!opt.input) {
        return null;
      }

      if (!/^[A-Za-z]{1,}$/.test(opt.input)) {
        return null;
      }

      const first = opt.input[0];
      const list = words.filter((s) => s[0] === first.toLowerCase());

      const code = first.charCodeAt(0);

      const upperCase = code <= 90 && code >= 65;

      return {
        items: list.map((text) => {
          const word = upperCase ? text[0].toUpperCase() + text.slice(1) : text;
          return {
            word,
            menu: this.menu,
          };
        }),
      };
    },
  }));
};
