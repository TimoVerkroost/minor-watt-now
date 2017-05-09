// Pushover authentication
const push = require( 'pushover-notifications' );
// Push messages function
function pushMessages (title, message, priority){
  // Pushover app api key (required)
  const p = new push( {
    token: process.env.PUSHOVER_API_KEY
  });

  // const users = [
  //   process.env.PUSHOVER_USER_KEY,
  //   process.env.PUSHOVER_USER_KEY_DIEGO,
  //   process.env.PUSHOVER_USER_KEY_COLIN
  // ];

  // User who receive the messages (min. 1 required)
  const users = [
    process.env.PUSHOVER_USER_KEY
  ];
  // All supported notification sounds
  const sounds = {
    pushover:     'pushover',
    bike:         'bike',
    bugle:        'bugle',
    cashregister: 'cashregister',
    classical:    'classical',
    cosmic:       'cosmic',
    falling:      'falling',
    gamelan:      'gamelan',
    incoming:     'incoming',
    intermission: 'intermission',
    magic:        'magic',
    mechanical:   'mechanical',
    pianobar:     'pianobar',
    siren:        'siren',
    spacealarm:   'spacealarm',
    tugboat:      'tugboat',
    alien:        'alien',
    climb:        'climb',
    persistent:   'persistent',
    echo:         'echo',
    updown:       'updown',
    none:         'none'
  };
  let notificationSound;
  switch (priority) {
    // Emergency Priority
    case 2:
      notificationSound = sounds.alien;
      break;
    // High Priority
    case 1:
      notificationSound = sounds.siren;
      break;
    // Normal Priority
    case 0:
      notificationSound = sounds.bugle;
      break;
    // Low Priority
    case -1:
      notificationSound = sounds.gamelan;
      break;
    // Lowest Priority
    case -2:
      notificationSound = sounds.gamelan;
  }
  // Message to receiver
  let msg = {
    title: title,             // Notification title
    message: message,	        // Message body (required)
    sound: notificationSound, // Notification sound
    priority: priority,       // Priority of notification
    retry: 60,                // Only used when priority = 2 (Emergency), if receiver didn't acknowledged the notification.
    expire: 3600              // Only used when priority = 2 (Emergency), expire time of retry
  };
  // Get all receivers and send message to them
  for ( let i = 0, l = users.length; i < l; i++ ) {
    // Receivers
    msg.user = users[i];
    // Message send
    p.send( msg, function( err, result ) {
      // error handle
      if ( err ) {
        throw err;
      }
      // Message send log
      console.log( result );
    });
  }
}
// Export module
module.exports = pushMessages;
