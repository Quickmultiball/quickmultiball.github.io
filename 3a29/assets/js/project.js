/** This is a
 *
 *  ▄████▄   ██░ ██  ▄▄▄       ██▀███   ▄▄▄       ▄████▄  ▄▄▄█████▓▓█████  ██▀███
 * ▒██▀ ▀█  ▓██░ ██▒▒████▄    ▓██ ▒ ██▒▒████▄    ▒██▀ ▀█  ▓  ██▒ ▓▒▓█   ▀ ▓██ ▒ ██▒
 * ▒▓█    ▄ ▒██▀▀██░▒██  ▀█▄  ▓██ ░▄█ ▒▒██  ▀█▄  ▒▓█    ▄ ▒ ▓██░ ▒░▒███   ▓██ ░▄█ ▒
 * ▒▓▓▄ ▄██▒░▓█ ░██ ░██▄▄▄▄██ ▒██▀▀█▄  ░██▄▄▄▄██ ▒▓▓▄ ▄██▒░ ▓██▓ ░ ▒▓█  ▄ ▒██▀▀█▄
 * ▒ ▓███▀ ░░▓█▒░██▓ ▓█   ▓██▒░██▓ ▒██▒ ▓█   ▓██▒▒ ▓███▀ ░  ▒██▒ ░ ░▒████▒░██▓ ▒██▒
 * ░ ░▒ ▒  ░ ▒ ░░▒░▒ ▒▒   ▓▒█░░ ▒▓ ░▒▓░ ▒▒   ▓▒█░░ ░▒ ▒  ░  ▒ ░░   ░░ ▒░ ░░ ▒▓ ░▒▓░
 *   ░  ▒    ▒ ░▒░ ░  ▒   ▒▒ ░  ░▒ ░ ▒░  ▒   ▒▒ ░  ░  ▒       ░     ░ ░  ░  ░▒ ░ ▒░
 * ░         ░  ░░ ░  ░   ▒     ░░   ░   ░   ▒   ░          ░         ░     ░░   ░
 * ░ ░       ░  ░  ░      ░  ░   ░           ░  ░░ ░                  ░  ░   ░
 * ░                                             ░
 *
 * Created initially by rischko on 20.09.19.
 *
 * For Project Templates
 */

window.addEventListener( 'load', function () {

    // Video
    var btReadMore = document.getElementById( "button-readmore" );
    var moreText = document.getElementById( "moretext" );

    if ( btReadMore != undefined && moreText != undefined) {
        addClass( moreText, 'hidden-text' );

        btReadMore.addEventListener( "click", function () {
            if ( hasClass( moreText, 'hidden-text' ) ) {
                removeClass( moreText, 'hidden-text' );
                btReadMore.innerText = 'Hide details';
            } else {
                addClass( moreText, 'hidden-text' );
                btReadMore.innerText = 'Read more...';
            }
        } );

    }

} );