let playlist = [ {
  'title': 'Chainsmoker/Coldplay - Something just like this',
  'audio': "assets/something.mp3",
}, {
  'title': 'Alan Walker - Lily',
  'audio': "assets/lily.mp3",
}, 
{
  'title': 'Louis Tomlison - Two of us',
  'audio': "assets/two of us.mp3",
}, 
{
  'title': 'Imagine Dragons - Thunder',
  'audio': "assets/thunder.mp3",
}, 
{
  'title': 'AVICII - Wake me up',
  'audio': "assets/wake.mp3",
}, 
{
  'title': 'Ed Sheeran - Shape of you',
  'audio': "assets/shape.mp3",
}, 
{
  'title': 'Charlie Puth - Cheating On You',
  'audio': "assets/cheating.mp3",
},
{
  'title': 'Maroon 5 - Girls like you',
  'audio': "assets/girls.mp3",
},
{
  'title': 'Alan Walker - Alone',
  'audio': "assets/alone.mp3",
},
{
  'title': 'Taylor Swift - Blank Space',
  'audio': "assets/blank space.mp3",
},
{
  'title': 'Luis Fonsi - Despacito',
  'audio': "assets/despacito.mp3",
},
{
  'title': 'Alan Walker - Faded',
  'audio': "assets/faded.mp3",
},
{
  'title': 'Louis Tomlinson - We made it',
  'audio': "assets/we made it.mp3",
},
{
  'title': 'Maroon 5 - Payphone',
  'audio': "assets/payphone.mp3",
},
{
  'title': 'Ed Sheeran - Galway Girl',
  'audio': "assets/galway.mp3",
},
{
  'title': 'Selena Gomez - Back to you',
  'audio': "assets/back to you.mp3",
},
{
  'title': 'Maroon 5 - animals',
  'audio': "assets/animals.mp3",
},
{
  'title': 'Owl City - Fireflies',
  'audio': "assets/fireflies.mp3",
},
 {
  'title': 'DJ Snake - Let Me Love You',
  'audio': "assets/let me love you.mp3",
},
{
  'title': 'Alan Walker,Sabrina Carpenter & Farruko - On My Way',
  'audio': "assets/on my way.mp3",
},
{
  'title': 'Selena Gomez,Cardi B,Ozuna - Taki Taki',
  'audio': "assets/taki taki.mp3",
},
{
  'title': 'Taylor Swift - Fearless',
  'audio': "assets/you belong with me.mp3",
},
{
  'title': 'Imagine Dragons - Believer',
  'audio': "assets/believer.mp3",
},
{
  'title': 'Ed Sheeran - Perfect',
  'audio': "assets/perfect.mp3",
},
{
  'title': 'Coldplay - Paradise',
  'audio': "assets/paradise.mp3",
},
{
  'title': 'Ed Sheeran - Photograph',
  'audio': "assets/photograph.mp3",
},
{
  'title': 'Katy Perry - Fireworks',
  'audio': "assets/firework.mp3",
}];
i = 0;
n = playlist.length;
let player = document.getElementById( 'player' );
let dur = document.getElementById( 'dur' );
playlist.forEach( function( i ) {
  console.log( i.audio )
  player.src = i.audio;
  $( '.title' ).html( i.title );
}, );

function calculateTotalValue( length ) {
  let minutes = Math.floor( length / 60 ),
    seconds_int = length - minutes * 60,
    seconds_str = seconds_int.toString( ),
    seconds = seconds_str.substr( 0, 2 ),
    time = minutes + ':' + seconds
  return time;
}

function calculateCurrentValue( currentTime ) {
  let current_hour = parseInt( currentTime / 3600 ) % 24,
    current_minute = parseInt( currentTime / 60 ) % 60,
    current_seconds_long = currentTime % 60,
    current_seconds = current_seconds_long.toFixed( ),
    current_time = ( current_minute < 10 ? "0" + current_minute : current_minute ) + ":" + ( current_seconds < 10 ? "0" + current_seconds : current_seconds );
  return current_time;
}

function initProgressBar( ) {
  let length = player.duration;
  let current_time = player.currentTime;
  let totalLength = calculateTotalValue( length )
  jQuery( ".end-time" ).html( totalLength );
  let currentTime = calculateCurrentValue( current_time );
  jQuery( ".start-time" ).html( currentTime );
  dur.value = player.currentTime;
  if ( player.currentTime == player.duration ) {
    $( "#play-btn" ).fadeIn( "slow", function( ) {
      $( this ).removeClass( "fa-pause" );
      $( this ).addClass( "fa-play" );
      dur.value = 0;
    } );
  }
};

function mSet( ) {
  player.currentTime = dur.value;
}

function mDur( ) {
  let length = player.duration;
  dur.max = length;
}

function initPlayers( num ) {
  for ( let i = 0; i < num; i++ ) {
    ( function( ) {
      let playerContainer = document.getElementById( 'player-container' ),
        player = document.getElementById( 'player' ),
        isPlaying = false,
        playBtn = document.getElementById( 'play-btn' );
      if ( playBtn != null ) {
        playBtn.addEventListener( 'click', function( ) {
          togglePlay( )
        } );
      }

      function togglePlay( ) {
        if ( player.paused === false ) {
          player.pause( );
          isPlaying = false;
          $( "#play-btn" ).fadeIn( "slow", function( ) {
            $( this ).removeClass( "fa-pause" );
            $( this ).addClass( "fa-play" );
          } );
        }
        else {
          player.play( );
          $( "#play-btn" ).fadeIn( "slow", function( ) {
            $( this ).removeClass( "fa-play" );
            $( this ).addClass( "fa-pause" );
          } );
          isPlaying = true;
        }
      }
    }( ) );
  }
}
$( "#next" ).data( 'dir', 1 );
$( "#prev" ).data( 'dir', -1 );
$( '#next, #prev' ).on( 'click', function( ) {
  i = ( i + $( this ).data( 'dir' ) + n ) % n;
  console.log( i );
  player.src = playlist[ i ].audio;
  $( '.title' ).html( playlist[ i ].title );
  $( '#play-btn' ).removeClass( "fa-play" );
  $( '#play-btn' ).addClass( "fa-pause" );
  player.play( );
} );
$( ".audio-player" )
  .toArray( )
  .forEach( function( player ) {
    let audio = $( player ).find( "audio" )[ 0 ];
    let volumeControl = $( player ).find( ".volumeControl .wrapper" );
    volumeControl.find( ".outer" ).on( "click", function( e ) {
      let volumePosition = e.pageX - $( this ).offset( ).left;
      let audioVolume = volumePosition / $( this ).width( );
      if ( audioVolume >= 0 && audioVolume <= 1 ) {
        audio.volume = audioVolume;
        $( this )
          .find( ".inner" )
          .css( "width", audioVolume * 100 + "%" );
      }
    } );
  } );
$( function( ) {
  // Dropdown toggle
  $( '.dropdown-toggle' ).click( function( ) {
    $( this ).next( '.dropdown' ).slideToggle( "fast" );
  } );
  $( document ).click( function( e ) {
    var target = e.target;
    if ( !$( target ).is( '.dropdown-toggle' ) && !$( target ).parents( ).is( '.dropdown-toggle' ) ) {
      $( '.dropdown' ).hide( );
    }
  } );
} );
$( '#darkButton' ).click( switchDark );
$( '#whiteButton' ).click( switchWhite );
$( '#blueButton' ).click( switchBlue );

function switchDark( ) {
  $( '#skin' ).attr( 'class', 'dark audio-player' );
  $( '.inner' ).css( 'background', '#fff' );
  $( '.title' ).css( 'color', '#fff' );
  $( '.time' ).css( 'color', '#fff' );
  $( '.fa-volume-up' ).css( {
    'color': '#fff'
  } );
  $( '.audio-player #play-btn' ).css( {
    'color': '#fff',
    'border-color': '#fff'
  } );
  $( '.ctrl_btn' ).css( {
    'color': '#fff',
    'border-color': '#fff'
  } );
}

function switchWhite( ) {
  $( '#skin' ).attr( 'class', 'white audio-player' );
  $( '.inner' ).css( 'background', '#555' );
  $( '.title' ).css( 'color', '#555' );
  $( '.time' ).css( 'color', '#555' );
  $( '.fa-volume-up' ).css( {
    'color': '#555'
  } );
  $( '.audio-player #play-btn' ).css( {
    'color': '#555',
    'border-color': '#555'
  } );
  $( '.ctrl_btn' ).css( {
    'color': '#555',
    'border-color': '#555'
  } );
}

function switchBlue( ) {
  $( '#skin' ).attr( 'class', 'blue audio-player' );
  $( '.inner' ).css( 'background', '#fff' );
  $( '.title' ).css( 'color', '#fff' );
  $( '.time' ).css( 'color', '#fff' );
  $( '.fa-volume-up' ).css( {
    'color': '#fff'
  } );
  $( '.audio-player #play-btn' ).css( {
    'color': '#fff',
    'border-color': '#fff'
  } );
  $( '.ctrl_btn' ).css( {
    'color': '#fff',
    'border-color': '#fff'
  } );
}
initPlayers( jQuery( '#player-container' ).length );
