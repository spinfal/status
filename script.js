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
			
      if (status.length>=128) {
        alert('discord does not allow more than 128 characters in a status');
        document.getElementById('status').focus();
      }
      
      var url = "https://discord.com/api/v8/users/@me/settings";

      var stat = new XMLHttpRequest();
      stat.open("PATCH", url);
      
      stat.setRequestHeader('Content-type', 'application/json');
      stat.setRequestHeader('Authorization', token);
			stat.setRequestHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36 OPR/72.0.3815.473')
      
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
                      "expires_at": null, // this will come, never
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
