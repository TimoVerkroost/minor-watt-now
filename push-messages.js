// Pushover authentication
const push = require( 'pushover-notifications' );

const messages = {
  peak: {
    message: 'Is peaking, attention is required',
    priority: 0
  },
  overheating: {
    message: 'Is overheating, immediate attention is required',
    priority: 2
  },
  efficientLow: {
    message: 'Is running low efficient, it can be turned off',
    priority: 1
  },
  broadbandLow: {
    message: 'The 2G broadband data bundle is running out of credits, data upgrade is required',
    priority: 0
  },
  additionalGenerator: {
    message: 'To much power is asked, an additional generator needs te be started',
    priority: 2
  },
  lostConnection: {
    message: 'The connection with this generator is lost',
    priority: 2
  }
};

// Push messages function
function pushMessages (generator, message, priority){
  // Pushover app api key (required)
  const p = new push( {
    token: process.env.PUSHOVER_API_KEY
  });
  // User who receive the messages (min. 1 required)
  const users = [
    // Default user most likely the administrator
    process.env.PUSHOVER_USER_KEY,
    //process.env.PUSHOVER_USER_KEY_DIEGO,
    //process.env.PUSHOVER_USER_KEY_COLIN
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
  // Notification sound based on priority number
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
    // HTML tags support b, i, u, font and a
    // html: 1,
    // Notification title
    title: 'Generator update: ' + generator,
    // Message body (required)
    // message: '<b>'+ generator +'</b>: ' + message,
    message: message,
    // Notification sound
    sound: notificationSound,
    // Priority of notification
    priority: priority,
    // Only used when priority = 2 (Emergency), if receiver didn't acknowledged the notification.
    retry: 60,
    // Only used when priority = 2 (Emergency), expire time of retry
    expire: 3600
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
