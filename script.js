    if (location.protocol !== 'https:') {
        location.replace(`https:${location.href.substring(location.protocol.length)}`);
      }
      
      document.getElementById('token').value = localStorage.getItem('token'); document.getElementById('status').value = localStorage.getItem('status'); document.getElementById('emote').value = localStorage.getItem('emote'); document.getElementById('emoteID').value = localStorage.getItem('emoteID');
      
      document.getElementById('remove').disabled = true;
      if (localStorage.getItem('token')||localStorage.getItem('status')!="") {
        document.getElementById('remove').disabled = false;
      }
    
    function stat() {
      var token = document.getElementById('token').value; var status = document.getElementById('status').value; emote = document.getElementById('emote').value; var emoteID = document.getElementById('emoteID').value;

      if (token==="") {
        alert('you must provide a token.');
        document.getElementById('token').focus();
      } else if (status==="") {
        alert('you must provide some text to use for the status.');
        document.getElementById('status').focus();
      }
      
      var url = "https://discord.com/api/v8/users/@me/settings";

      var stat = new XMLHttpRequest();
      stat.open("PATCH", url);
      
      stat.setRequestHeader('Content-type', 'application/json');
      stat.setRequestHeader('Authorization', token);
      
      if (emote==="") {
        emote = null;
      }

      if (emoteID==="") {
        emoteID = null;
      }

      var params = {
                  "custom_status":
                  {
                      "text": status,
                      "expires_at": null, // this will come, soon :)
                      "emoji_id": emoteID,
                      "emoji_name": emote
                  }
              };

      stat.send(JSON.stringify(params));
    }
    
    function save() {
      if (document.getElementById('token').value!=="") {
        localStorage.setItem('token', document.getElementById('token').value); localStorage.setItem('status', document.getElementById('status').value); localStorage.setItem('emote', document.getElementById('emote').value); localStorage.setItem('emoteID', document.getElementById('emoteID').value); document.getElementById('remove').disabled = false; alert('saved current config'); console.log('stored settings');
      } else {
        alert('you must provide a token first');
      }
    }
    
    function remove() {
      if (localStorage.getItem('token')||localStorage.getItem('status')!=="") {
        localStorage.setItem('token', ''); localStorage.setItem('status', ''); localStorage.setItem('emote', ''); localStorage.setItem('emoteID', ''); alert('saved config removed'); console.log('removed stored settings'); document.getElementById('remove').disabled = true;
      } // yes i know theres .removeItem, shut up loser
    }