//https://www.eclipse.org/paho/clients/js/

function LED1_On() {
	alert("led on");
	console.log("led on");
  
}
function LED1_Off(){	
	alert("led off");
	console.log("led off");
}






// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("maqiatto.com", 1883, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
   // useSSL: true,
    userName: "lfrenteriax@hotmail.com",
    password: "lfrenteriax",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
	
    client.subscribe("/cloudmqtt");
    message = new Paho.MQTT.Message("ll:Hello: CloudMQTT");
    message.destinationName = "/cloudmqtt";
    
	
  }

  function doFail(e){
    console.log(e);
	
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
	doAction(message.payloadString);
  }
  
