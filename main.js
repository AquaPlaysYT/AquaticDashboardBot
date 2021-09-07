const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

function codeGen() {
    var content = fs.readFileSync('codes.txt', 'utf8');
    myCode = content.split('\n');
    if (myCode[0] == "") {
        return "Please ask for a restock of codes";
    }
    return myCode[0];
}

function removeCode() {
    fs.readFile('codes.txt', function(err, data) { // read file to memory
        if (!err) {
            data = data.toString(); // stringify buffer
            var position = data.toString().indexOf('\n'); // find position of new line element
            if (position != -1) { // if new line element found
                data = data.substr(position + 1); // subtract string based on first line length
    
                fs.writeFile('codes.txt', data, function(err) { // write file
                    if (err) { // if error, report
                        console.log (err);
                    }
                });
            } else {
                
            }
        } else {
            console.log(err);
        }
    });
}

function removeUser(author) {
    fs.appendFile('alreadyDone.txt', "\n"+author, function (err) {
        if (err) throw err;
      });
}

function userCheck(author) {
    var content = fs.readFileSync('alreadyDone.txt', 'utf8');
    sUsers = content.split('\n');
    console.log(sUsers);
    if (sUsers.indexOf(author) > -1) {
        return true;
    } else {
        return false;
    }
}

client.on('ready', () => {
            console.log(`Logged in as ${client.user.tag}!`);

            client.user.setPresence({
                game: {
                    name: 'Fortnite Bot Dashboard | Created By @AquaPlaysYT On Twitter',
                    type: "PLAYING"
                }
            });
            
           
        })

client.on('message', msg => {
  if (msg.content === ',code') {
      if (userCheck(msg.author.id) == false) {
        let cmdCode = codeGen();
        console.log(cmdCode);
        msg.author.send("Your code is: ``" + cmdCode + "``");
        msg.channel.send("Check your DMs!");
        removeCode();
        removeUser(msg.author.id);
      }
      else {
          msg.author.send('You already have a code!');
      }
  }
});

client.login("discord-token");
