/**
 * ───────────────────────────────────────────────────────────────────────────────────────
 * @summary			TMi Developing Bot Tool 1.0.0
 *
 * @description THANKS for using this script!
 * 
 * 							This tool connects on Twitch, joins the user's chat room and stores, as
 * 							an object, all data provided by the event handlers.  Data can be stored 
 * 							in a unique file or in separated files for each event.
 * 						
 * 							You can also use this as a starter for a Twitch bot, since it contains
 * 							all events triggered by TMi.  
 *
 * 							NOTE : due to the massive amount of data provied by the `raw_message`
 * 							event, this one is commented.  Just uncomment it to access the data.
 * 
 * 							PLEASE DO NOT REPORT you may find, other then the TMi librairy doesn't
 * 							exist anymore so I can update/remove the whole thing.  If you can't debug
 * 							this, creating a bot will be a hard task to accomplish.. not impossible,
 * 							but hard!
 * 
 * 							Thanks for using this script!  Feel free to share the repo with your
 * 							entourage : https://github.com/zaksoyer/tmidevbottool/
 * 
 * ───────────────────────────────────────────────────────────────────────────────────────
 * 
 * 	──────────
 * 	 SETTiNGS
 * 	──────────
 * 
 * 		dotenv settings
 * 		───────────────
 * 			LOG_ALL_iN_ONE_FiLE : log in separated files or all in one (true/false)
 * 			OAUTH_KEY						: Twitch iRC password (https://twitchapps.com/tmi/)
 * 			USERNAME						: Twitch username
 * 
 * ───────────────────────────────────────────────────────────────────────────────────────
 * 
 * 	Date created 		: 2020-03-28
 *  Date published	: 2020-03-29
 * 	Licence					: GNU - Feel free to share!
 * 	Author					: Zak Soyer
 * 	Version					: 1.0.0 
 * 
 * ───────────────────────────────────────────────────────────────────────────────────────
 */

 'use strict';

 require('dotenv').config()

const TMi = require('tmi.js');		// TMi librairy to handle Twitch
const FS 	= require('fs');				// FileSystem librairy to log datas

const ENV	= process.env;

// Initializing connection
// ** JUST CHANGE VALUES iN THE .env FiLE TO SETUP THIS PART **
const client = new TMi.Client({
	options: { 
		debug			: false 
	},
	connection: {
		reconnect	: true,
    secure		: true,
    port 			: 443
	},
	identity: {
		username	: ENV.USERNAME,
		password	: ENV.OAUTH_KEY
	},
	channels: [ 
		`#${ENV.USERNAME}`,
	]
});

// All existing events triggered by TMi
client.on('anongiftpaidupgrade',	onAnongiftpaidupgrade);
client.on('ban',									onBan);
client.on('chat',									onChat);
client.on('cheer',								onCheer);
client.on('clearchat',						onClearchat);
client.on('connected',						onConnected);
client.on('connecting',						onConnecting);
client.on('disconnected',					onDisconnected);
client.on('emoteonly',						onEmoteonly);
client.on("emotesets",						onEmotesets);
client.on("followersonly",				onFollowersonly);
client.on("giftpaidupgrade", 			onGiftpaidupgrade);
client.on('hosted',								onHosted);
client.on('hosting',							onHosting);
client.on('join',									onJoin);
client.on('logon',								onLogon);
client.on('message', 							onMessage);
client.on('messagedeleted', 			onMessagedeleted);
client.on('mod',									onMod);
client.on('mods',									onMods);
client.on('notice', 							onNotice);
client.on('part',									onPart);
client.on('ping',									onPing);
client.on('pong',									onPong);
client.on('r9kbeta',							onR9kbeta);
client.on('raided',								onRaided);
//client.on('raw_message',					onRaw_message);
client.on('reconnect',						onReconnect);
client.on('resub',        				onResub);
client.on('roomstate',						onRoomstate);
client.on('serverchange',					onServerchange);
client.on('slowmode',							onSlowmode);
client.on('subgift',							onSubgift);
client.on('submysterygift',				onSubmysterygift);
client.on('subscribers',					onSubscribers);
client.on('subscription', 				onSubscription);
client.on('timeout',							onTimeout);
client.on('unhost',								onUnhost);
client.on('unmod',								onUnmod);
client.on('vips',									onVips);
client.on('whisper',							onWhisper);

// Sending connection request
client.connect();

// Subroutines handling the different events
/**
 * @description Username is continuing the Gift Sub they got from an anonymous user in
 * 							channel.
 * 
 * @param {string} channel 
 * @param {string} username 
 * @param {object} userstate 
 */
function onAnongiftpaidupgrade(channel, username, userstate) {
	let output = {};

	output.channel 		= channel;
	output.username		= username;
	output.userstate	= userstate;

	log(output, 'anongiftpaidupgrade.txt');
  console.log(JSON.stringify({a_g_p_u_Ev : output}));

}

/**
 * @description Username has been banned on a channel. To get the reason and other data,
 * 							use Twitch's PubSub topic "chat_moderator_actions".
 * 
 * @param {string} channel 
 * @param {string} username 
 * @param {string} reason 
 * @param {object} userstate 
 */
function onBan(channel, username, reason, userstate) {
	let output = {};

	output.channel		= channel;
	output.username 	= username;
	output.reason 		= reason;
	output.userstate 	= userstate;

	log(output, 'ban.txt');
  console.log(JSON.stringify({banEv : output}));

}

/**
 * @description Received a regular message on channel. Use the "message" event to get
 * 							regular messages, action messages, and whispers all together.
 * 
 * @param {string} 	channel 
 * @param {object} 	userstate 
 * @param {string} 	message 
 * @param {boolean}	self 
 */
function onChat(channel, userstate, message, self) {
	let output = {};

	output.channel 		= channel;
	output.userstate 	= userstate;
	output.message 		= message;
	output.self				=	self;

	log(output, 'chat.txt');
  console.log(JSON.stringify({chatEv : output}));
}

/**
 * @description Username has cheered to a channel.
 * 
 * @param {string} channel 
 * @param {object} userstate 
 * @param {string} message 
 */
function onCheer(channel, userstate, message) {
	let output = {};

	output.channel		= channel;
	output.userstate	= userstate;
	output.message		= message;

	log(output, 'cheer.txt');
  console.log(JSON.stringify({cheerEv : output}));
}

/**
 * @description Chat of a channel got cleared.
 * 
 * @param {string} channel 
 */
function onClearchat(channel) {
	
	let output = { channel: channel };

	log(output, 'clearchat.txt');
	console.log(JSON.stringify({clearchatEv : output}));

}

/**
 * @description Connected to iRC server.
 * 
 * @param {string} address 
 * @param {number} port 
 */
function onConnected(address, port) {
	let output = {};

	output.address 	= address;
	output.port			= port;

	log(output, 'connected.txt');
  console.log(JSON.stringify({connectedEv : output}));
}

/**
 * @description Connecting to a iRC server.
 * 
 * @param {string} address 
 * @param {number} port 
 */
function onConnecting(address, port) {
	let output = {};

	output.address 	= address;
	output.port			= port;

	log(output, 'connecting.txt');
  console.log(JSON.stringify({connectingEv : output}));
}

/**
 * @description Got disconnected from server.
 * 
 * @param {string} reason (not always provided)
 */
function onDisconnected(reason) {

	let output = {reason : reason};

	log(output, 'disconnected.txt');
  console.log(JSON.stringify({disconnectedrEv : output}));
}

/**
 * @description Channel enabled or disabled emote-only mode.
 * 
 * @param {string} 	channel 
 * @param {boolean} enabled 
 */
function onEmoteonly(channel, enabled) {
	let output ={ channel: channel, enabled: enabled};

	log(output, 'emoteonly.txt');
  console.log(JSON.stringify({emoteonlyrEv : output}));

}

/**
 * @description Received the emote-sets from Twitch.
 * 
 * @param {string} sets 
 * @param {object} obj 
 */
function onEmotesets(sets, obj) {
	let output = {sets: sets, obj: obj};

	log(output, 'emotesets.txt');
  console.log(JSON.stringify({emotesetsrEv : output}));

}

 /**
	* @description Channel enabled or disabled followers-only mode.
	* @param {string} 	channel 
	* @param {boolean}	enabled 
	* @param {number} 	length 
	*/
function onFollowersonly(channel, enabled, length) {
	let output = {};

	output.channel 	= channel;
	output.enabled 	= enabled;
	output.length		=	length;

	log(output, 'followersonly.txt');
  console.log(JSON.stringify({followersonlyEv : output}));

}

/**
 * @description Username is continuing the Gift Sub they got from sender in channel.
 * 
 * @param {string} 	channel 
 * @param {string} 	username 
 * @param {any} 		sender 			detailed as a number, should be a string
 * @param {nuumber} userstate 
 */
function onGiftpaidupgrade(channel, username, sender, userstate) {
	let output = {};

	output.channel		=	channel;
	output.username		= username;
	output.sender			= sender;
	output.userstate	= userstate;

	log(output, 'giftpaidupgrade.txt');
  console.log(JSON.stringify({giftpaidupgradeEv : output}));
}

/**
 * @description Channel is now hosted by another broadcaster. This event is fired only if
 * 							you are logged in as the broadcaster.
 * 
 * @param {any} channel 
 * @param {any} username 
 * @param {any} viewers 
 * @param {any} autohost 
 */
function onHosted(channel, username, viewers, autohost) {
	let output = {};

	output.channel		= channel;
	output.username 	= username;
	output.viewers  	= viewers;
	output.autohost  	= autohost;

	log(output, 'hosted.txt');
  console.log(JSON.stringify({hostedrEv : output}));
}

/**
 * @description Channel is now hosting another channel.
 * 
 * @param {string} channel 
 * @param {string} target 
 * @param {integer} viewers 
 */
function onHosting(channel, target, viewers) {
	let output ={};

	output.channel	= channel;
	output.target	=	target;
	output.viewers	= viewers;

	log(output, 'hosting.txt');
  console.log(JSON.stringify({hostingrEv : output}));

}

/**
 * @description Username has joined a channel. Not available on large channels and is
 * 							also sent in batch every 30-60secs.
 * 
 * @param {string} 	channel 
 * @param {string} 	username 
 * @param {boolean} self 
 */
function onJoin(channel, username, self) {
	let output = {};

	output.channel	= channel;
	output.username = username;
	output.self			= self;

	log(output, 'join.txt');
  console.log(JSON.stringify({joinEv : output}));
}

/**
 * @description Connection established, sending informations to server.
 * 
 * DO NOT PROViDE any parameters.  This event alert that a connection is established BUT
 * still have to logon with username and oauth key on server.
 */
function onLogon() {
	
	log(JSON.stringify(`logon event triggered, no output provided`), 'join.txt');
  console.log(JSON.stringify({logonEv : `Logon event triggered, no output provided`}));

}

/**
 * @description Received a message. This event is fired whenever you receive a chat,
 * 							action or whisper message.
 * 
 * @param {string} 	channel 
 * @param {object} 	tags 
 * @param {string} 	message 
 * @param {boolean} self 
 */
function onMessage(channel, tags, message, self) {
	let output = {};

  output.channel  = channel;
  output.message  = message;
  output.tags     = tags;
  output.self     = self;

  log(output, 'message.txt');
  console.log(JSON.stringify({messageEv : output}));
}

/**
 * 
 * @param {string} channel 
 * @param {string} username 
 * @param {string} deletedMessage 
 * @param {object} userstate 
 */
function onMessagedeleted(channel, username, deletedMessage, userstate) {
	let output	= {};

	output.channel				=	channel;
	output.username				= username;
	output.deletedMessage	=	deletedMessage;
	output.userstate			= userstate;

  log(output, 'messagedeleted.txt');
  console.log(JSON.stringify({messagedeletedEv : output}));
}

/**
 * @description Someone got modded on a channel.
 * 
 * @param {string} channel 
 * @param {string} username 
 */
function onMod(channel, username) {
	let output = { channel: channel, username: username};

	log(output, 'mod.txt');
  console.log(JSON.stringify({modEv : output}));

}

/**
 * @description Received the list of moderators of a channel.
 * 
 * @param {string} 	channel 
 * @param {array} 	mods 
 */
function onMods(channel, mods) {
	let output = { channel: channel, mods: mods };

	log(output, 'mods.txt');
  console.log(JSON.stringify({modsEv : output}));

}

/**
 * @description Received a notice from server. The goal of these notices is to allow the
 * 							users to change their language settings and still be able to know 
 * 							programmatically what message was sent by the server. Use `msd-d` to
 * 							compare messages.
 * 
 * @param {string} channel 
 * @param {string} msgid 
 * @param {string} message 
 */
function onNotice(channel, msgid, message) {
	let output = {};

	output.channel	= channel;
	output.msgid		= msgid;
	output.message	= message;

	log(output, 'notice.txt');
  console.log(JSON.stringify({noticeEv : output}));
}

/**
 * @description User has left a channel.
 * 
 * @param {string} 	channel 
 * @param {string} 	username 
 * @param {boolean} self 
 */
function onPart(channel, username, self) {
	let output = {};

	output.channel	= channel;
	output.username = username;
	output.self			= self;

	log(output, 'part.txt');
  console.log(JSON.stringify({partEv : output}));
}

/**
 * @description Ping received from iRC server.
 * 
 * DO NOT PROViDE any parameters.  This event alerts that the server is checking for an
 * active connection with you.  TMi is settled to answer automatically, but this event can
 * have its usage, like to troubleshoot a timeout issue.
 */
function onPing() {

	log(JSON.stringify(`ping event triggered, no output provided`), 'ping.txt');
  console.log(JSON.stringify({pingEv : `ping event triggered, no output provided`}));

}

/**
 * @description Ping sent, PONG received.
 * 
 * DO NOT PROViDE any parameters.  
 */
function onPong() {

	log(JSON.stringify(`pong event triggered, no output provided`), 'pong.txt');
  console.log(JSON.stringify({pongEv : `pong event triggered, no output provided`}));

}

/**
 * @description Channel is now being raided by another broadcaster.
 * 
 * @param {string} channel 
 * @param {string} username 
 * @param {number} viewers 
 */
function onRaided(channel, username, viewers) {
	let output = {};

	output.channel		= channel;
	output.username 	= username;
	output.viewers  	= viewers;

	log(output, 'raided.txt');
  console.log(JSON.stringify({raidedEv : output}));

}

/**
 * @description Channel enabled or disabled R9K mode.
 * 
 * @param {string} 	channel 
 * @param {boolean} enabled 
 */
function onR9kbeta(channel, enabled) {
	let output = { channel: channel, enabled: enabled };

	log(output, 'r9kbeta.txt');
  console.log(JSON.stringify({r9kbetaEv : output}));
}

/**
 * @description IRC data was received and parsed.
 * 
 * @param {object} messageCloned 
 * @param {string} message 
 */
function onRaw_message(messageCloned, message) {
	let output = {};

	output.messageCloned 	= messageCloned;
	output.message				= message;

	log(output, 'raw_message.txt');
  console.log(JSON.stringify({raw_messageEv : output}));

}

/**
 * @description Trying to reconnect to server.
 * 
 * DO NOT PROViDE any parameter.
 */
function onReconnect() {

	log(JSON.stringify(`reconnect event triggered, no output provided`), 'pong.txt');
  console.log(JSON.stringify({reconnectEv : `reconnect event triggered, no output provided`}));

}

/**
 * @description Username has resubbed on a channel.
 * 
 * @param {string} channel 
 * @param {string} username 
 * @param {number} streakMonths 
 * @param {string} message 
 * @param {object} userstate 
 * @param {object} methods 
 */
function onResub(channel, username, streakMonths, message, userstate, methods) {
	let output = {};

	output.channel 			= channel;
	output.username 		= username;
	output.streakMonths = streakMonths;
	output.message			= message;
	output.userstate		= userstate;
	output.methods			=	methods;

	log(output, 'resub.txt');
  console.log(JSON.stringify({resubEv : output}));
}

/**
 * @description Triggered upon joining a channel. Gives you the current state of the channel.
 * 
 * @param {string} channel 
 * @param {object} state 
 */
function onRoomstate(channel, state) {
	let output = {};

	output.channel 	= channel;
	output.state		= state;

	log(output, 'roomstate.txt');
  console.log(JSON.stringify({roomstateEv : output}));
}

/**
 * @description Channel is no longer located on this cluster.
 * 
 * @param {string} channel 
 */
function onServerchange(channel) {
	let output = { channel: channel }

	log(output, 'serverchanger.txt');
  console.log(JSON.stringify({serverchangeEv : output}));
}

/**
 * @description Channel enabled or disabled slow mode.
 * 
 * @param {string} 	channel 
 * @param {boolean} enabled 
 * @param {number} 	length 
 */
function onSlowmode(channel, enabled, length) {
	let output = {} ;

	output.channel 	= channel;
	output.enabled	= enabled;
	output.length		= length;

	log(output, 'slowmode.txt');
  console.log(JSON.stringify({slowmodeEv : output}));

}

/**
 * @description Username gifted a subscription to recipient in a channel.
 * 
 * @param {string} channel 
 * @param {string} username 
 * @param {number} streakMonths 
 * @param {string} recipient 
 * @param {object} methods 
 * @param {object} userstate 
 */
function onSubgift(channel, username, streakMonths, recipient, methods, userstate) {
	let output = {};

	output.channel 			= channel;
	output.username 		= username;
	output.streakMonths = streakMonths;
	output.recipient 		= recipient;
	output.methods			= methods;
	output.userstate		=	userstate;

	log(output, 'subgift.txt');
  console.log(JSON.stringify({subgiftEv : output}));
	
}

/**
 * @description Username is gifting a subscription to someone in a channel.
 * 
 * @param {string} channel 
 * @param {string} username 
 * @param {number} numbOfSubs 
 * @param {object} methods 
 * @param {object} userstate 
 */
function onSubmysterygift(channel, username, numbOfSubs, methods, userstate) {
	let output = {};

	output.channel		=	channel;
	output.username		= username;
	output.numbOfSubs	= numbOfSubs;
	output.methods		= methods;
	output.userstate	= userstate;

	log(output, 'submysterygift.txt');
  console.log(JSON.stringify({submysterygiftEv : output}));
}

/**
 * @description Channel enabled or disabled subscribers-only mode.
 * 
 * @param {string} 	channel 
 * @param {boolean} enabled 
 */
function onSubscribers(channel, enabled) {
	let output = { channel: channel, enabled: enabled };

	log(output, 'subscribers.txt');
  console.log(JSON.stringify({subscribersEv : output}));

}

/**
 * @description Username has subscribed to a channel.
 * 
 * @param {any} channel 
 * @param {any} username 
 * @param {any} method 
 * @param {any} message 
 * @param {any} userstate 
 */
function onSubscription(channel, username, method, message, userstate) {
	let output = {};
	
	output.channel 		= channel;
	output.username 	= username;
	output.method 		= method;
	output.message		=	message;
	output.userstate	=	userstate;

	log(output, 'subscription.txt');
  console.log(JSON.stringify({subscriptiontEv : output}));

}

/**
 * @description Username has been timed out on a channel. To get the reason and other
 * 							data, use Twitch's PubSub topic "chat_moderator_actions".
 * 
 * @param {any} channel 
 * @param {any} username 
 * @param {any} reason 
 * @param {any} duration 
 * @param {any} userstate 
 */
function onTimeout(channel, username, reason, duration, userstate) {
	let output = {};
	
	output.channel 		= channel;
	output.username 	= username;
	output.reason 		= reason;
	output.duration 	= duration;
	output.userstate	= userstate;

	log(output, 'timeout.txt');
  console.log(JSON.stringify({timeoutEv : output}));

}

/**
 * @description Channel ended the current hosting.
 * 
 * @param {string} channel 
 * @param {number} viewers 
 */
function onUnhost(channel, viewers) {
	let output = { channel: channel, viewers: viewers };

	log(output, 'unhost.txt');
  console.log(JSON.stringify({unhostEv : output}));

}

/**
 * @description Someone got unmodded on a channel.
 * 
 * @param {string} channel 
 * @param {string} username 
 */
function onUnmod(channel, username) {

	let output = { channel: channel, username: username };

	log(output, 'unmod.txt');
  console.log(JSON.stringify({unmodEv : output}));

}

/**
 * @description Received the list of VIPs of a channel.
 * 
 * @param {string} channel 
 * @param {object} vips 
 */
function onVips(channel, vips) {

	let output = { channel: channel, vips: vips };

	log(output, 'vips.txt');
  console.log(JSON.stringify({vipsEv : output}));

}

/**
 * @description Received a whisper. You won't receive whispers from ignored users. Use the
 * 							"message" event to get regular messages, action messages, and whispers all
 * 							together.
 * 
 * @param {string} 	from 
 * @param {object} 	userstate 
 * @param {string} 	message 
 * @param {boolean} self 
 */
function onWhisper(from, userstate, message, self) {
	let output = {};

	output.from 			= from;
	output.userstate	=	userstate;
	output.message		=	message;
	output.self				= self;

	log(output, 'whisper.txt');
  console.log(JSON.stringify({whisperEv : output}));
}

/**
 * @description log into files
 * 
 * @param {object} output 
 * @param {string} file 
 */
function log(output, file) {
	if(ENV.LOG_ALL_iN_ONE_FiLE === 'true') file = 'allLogs.txt';

	FS.appendFile(`outputs/${file}`, JSON.stringify(output) + '\n', function (err) {
		if (err) throw err;
	});
}