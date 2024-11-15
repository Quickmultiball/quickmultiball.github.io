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
 * Created initially by rischko on 30.09.19.
 *
 *
 */

const version = '2021-01-01 | 00012031212 ';
const cacheName = 'krotatoe';
var prefetchedURLs = [
    '/3a29/',
    '/3a29/assets/css/main.css',
    '/3a29/assets/fonts/',
    '/3a29/offline/',
    '/3a29/imprint/',
    '/3a29/privacy/'

];

function updateStaticCache() {
    return caches.open( cacheName ).then( cache => {
        return cache.addAll( prefetchedURLs );
    } );
}

function updateStaticCacheWith( urlToCache ) {
    return caches.open( cacheName ).then( cache => {
        return cache.addAll( [urlToCache] );
    } );
}

function prefetchStaticCache() {
    caches.open(cacheName).then((cache) => {
        return Promise.all(prefetchedURLs.map((url) => {
            return fetch(url).then(res => {
                if(res.status >= 400) { throw Error('request failed')}
                console.log('UUU', url, 'res', res);
                return cache.put(url,res)
            })
        }))
    }).catch((err) => {
    })
}

function clearOldCache() {
    return caches.keys().then( keys => {
        // Remove caches whose name is no longer valid.
        return Promise.all( keys
            .filter( key => {
                return key !== cacheName;
            } )
            .map( key => {
                // console.log( 'Service Worker: removing cache ${key}' );
                return caches.delete( key );
            } )
        );
    } );
}

self.addEventListener( 'install', event => {
    event.waitUntil( updateStaticCache().then( ( result ) => {
        console.log( 'A Service Worker: cache updated to version: ${cacheName}' );
        console.log( 'caches', result );
    } ).catch( () => {
            //
            updateStaticCache().then( () => {
                console.log( 'B Service Worker: cache updated to version: ${cacheName}' );
            } ).catch( () => {

            } );
        }
    ) );
} );

self.addEventListener( 'activate', event => {
    // event.waitUntil( clearOldCache() );
    event.waitUntil( clearOldCache() );
    event.waitUntil( prefetchStaticCache());
} );

self.addEventListener( 'fetch', event => {
    let request = event.request;
    let url = new URL( request.url );

    // Only deal with requests from the same domain.
    if ( url.origin !== location.origin ) {
        return;
    }
    if ( request.url.match( /\.(mp4)$/ ) ) {
        return;
    }

    // Always fetch non-GET requests from the network.
    if ( request.method !== 'GET' ) {
        event.respondWith( fetch( request ) );
        return;
    }

    // For HTML requests, try the network first else fall back to the offline page.
    if ( request.headers.get( 'Accept' ).indexOf( 'text/html' ) !== -1 ) {
        console.log( 'Accept text/html' );
        event.respondWith(
            fetch( request ).catch( () => caches.match( '/3b29/offline/' ) )
        );
        return;
    }
    // For non-HTML requests, look in the cache first else fall back to the network.
    event.respondWith(
        caches.match( request )
            .then( response => {
                if ( response ) {
                    // console.log( 'C', event.request.url );
                    return response;
                }
                // console.log( 'F', event.request.url );
                updateStaticCacheWith( event.request.url );
                return fetch( request ).catch( () => caches.match( '/3b29/offline/' ))
            } ).catch( () => {
            return  '/3b29/offline/' ;
        } )
    );
} );
