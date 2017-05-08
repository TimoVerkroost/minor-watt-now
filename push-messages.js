var push = require( 'pushover-notifications' );

function pushMessages (title, msg){

  var p = new push( {
    token: process.env.PUSHOVER_API_KEY,
    //user: process.env.PUSHOVER_USER_KEY,
    // httpOptions: {
    //        proxy: process.env['http_proxy'],
    //},
    // onerror: function(error) {},
    // update_sounds: true // update the list of sounds every day - will
    // prevent app from exiting.
  });

  var users = [
    process.env.PUSHOVER_USER_KEY,
    process.env.PUSHOVER_USER_KEY_ELTON,
    process.env.PUSHOVER_USER_KEY_COLIN
  ];

  var msg = {
    // These values correspond to the parameters detailed on https://pushover.net/api
    // 'message' is required. All other values are optional.
    title: 'Update for generator: ' + title,
    message: 'Description for generator ' + title + ': ' + msg,	// required
    sound: 'magic',
    priority: 1
  };

  // p.send( msg, function( err, result ) {
  //   if ( err ) {
  //     throw err;
  //   }
  //
  //   console.log( result );
  // });

  for ( var i = 0, l = users.length; i < l; i++ ) {

    msg.user = users[i];
    // token can be overwritten as well.

    p.send( msg, function( err, result ) {
      if ( err ) {
        throw err;
      }

      console.log( result );
    });
  }
}

module.exports = pushMessages;
